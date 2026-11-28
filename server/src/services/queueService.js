import { getPool } from '../config/database.js';

/* Status yang sah, sesuai FR-03. */
export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

export const DAFTAR_STATUS = Object.freeze(Object.values(STATUS));

/* Aturan perpindahan status yang diperbolehkan. */
const TRANSISI_SAH = Object.freeze({
  [STATUS.WAITING]: [STATUS.CALLED],
  [STATUS.CALLED]: [STATUS.COMPLETED],
  [STATUS.COMPLETED]: [],
});

const boleh = (dari, ke) => TRANSISI_SAH[dari]?.includes(ke) ?? false;

/* Format hasil service. */
function berhasil(queue) {
  return { ok: true, queue };
}

function ditolak(code, message) {
  return { ok: false, code, message };
}

/* Kolom yang dikirim ke klien. */
const KOLOM = `
  id,
  queue_number AS queueNumber,
  status,
  created_at AS createdAt,
  called_at AS calledAt,
  completed_at AS completedAt
`;

/* Nomor antrean. */
const AWALAN = 'A';
const PANJANG_DIGIT = 3;

export function formatQueueNumber(angka) {
  return AWALAN + String(angka).padStart(PANJANG_DIGIT, '0');
}

/* READ: membaca seluruh antrean. */
export async function listQueues({ status } = {}) {
  const db = getPool();

  if (status) {
    const [baris] = await db.execute(
      `SELECT ${KOLOM} FROM queues WHERE status = ? ORDER BY created_at ASC`,
      [status]
    );

    return baris;
  }

  const [baris] = await db.execute(
    `SELECT ${KOLOM} FROM queues ORDER BY created_at ASC`
  );

  return baris;
}

/* READ: mencari satu antrean berdasarkan ID. */
export async function findQueue(id) {
  const db = getPool();

  const [baris] = await db.execute(
    `SELECT ${KOLOM} FROM queues WHERE id = ?`,
    [id]
  );

  return baris[0] ?? null;
}

/* CREATE: membuat antrean baru. */
export async function createQueue() {
  const db = getPool();

  const [hasil] = await db.execute(
    'INSERT INTO queues (status) VALUES (?)',
    [STATUS.WAITING]
  );

  const nomor = formatQueueNumber(hasil.insertId);

  await db.execute(
    'UPDATE queues SET queue_number = ? WHERE id = ?',
    [nomor, hasil.insertId]
  );

  const queue = await findQueue(hasil.insertId);

  return berhasil(queue);
}

/* UPDATE: mengubah status antrean dengan memeriksa transisi. */
const KOLOM_WAKTU = Object.freeze({
  [STATUS.CALLED]: 'called_at',
  [STATUS.COMPLETED]: 'completed_at',
  [STATUS.WAITING]: null,
});

export async function updateQueueStatus(id, status) {
  const db = getPool();

  const target = await findQueue(id);

  if (!target) {
    return ditolak(
      'QUEUE_NOT_FOUND',
      'Antrean tidak ditemukan.'
    );
  }

  if (!boleh(target.status, status)) {
    return ditolak(
      'INVALID_TRANSITION',
      `Antrean berstatus ${target.status} tidak dapat diubah menjadi ${status}.`
    );
  }

  const kolomWaktu = KOLOM_WAKTU[status];

  const sql = kolomWaktu
    ? `UPDATE queues SET status = ?, ${kolomWaktu} = NOW() WHERE id = ?`
    : 'UPDATE queues SET status = ? WHERE id = ?';

  await db.execute(sql, [status, id]);

  const queue = await findQueue(id);

  return berhasil(queue);
}

/* Memanggil antrean WAITING paling lama. */
export async function callNext() {
  const db = getPool();

  const [sedangDipanggil] = await db.execute(
    `SELECT ${KOLOM} FROM queues WHERE status = ? LIMIT 1`,
    [STATUS.CALLED]
  );

  if (sedangDipanggil.length > 0) {
    return ditolak(
      'QUEUE_ALREADY_CALLED',
      `Antrean ${sedangDipanggil[0].queueNumber} masih dipanggil. Selesaikan lebih dulu.`
    );
  }

  const [berikutnya] = await db.execute(
    `SELECT ${KOLOM} FROM queues WHERE status = ? ORDER BY created_at ASC LIMIT 1`,
    [STATUS.WAITING]
  );

  if (berikutnya.length === 0) {
    return ditolak(
      'NO_WAITING_QUEUE',
      'Tidak ada antrean yang menunggu.'
    );
  }

  return updateQueueStatus(berikutnya[0].id, STATUS.CALLED);
}

/* Menyelesaikan antrean: hanya CALLED → COMPLETED. */
export async function completeQueue(id) {
  return updateQueueStatus(id, STATUS.COMPLETED);
}

/* DELETE: menghapus antrean berdasarkan ID. */
export async function deleteQueue(id) {
  const db = getPool();

  const [hasil] = await db.execute(
    'DELETE FROM queues WHERE id = ?',
    [id]
  );

  return hasil.affectedRows > 0;
}
