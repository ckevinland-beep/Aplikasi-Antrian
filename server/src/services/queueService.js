import { getConnection } from '../config/database.js';

/* Status yang sah, sesuai FR-03. */
export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

export const DAFTAR_STATUS = Object.freeze(Object.values(STATUS));

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
  const db = getConnection();

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
  const db = getConnection();

  const [baris] = await db.execute(
    `SELECT ${KOLOM} FROM queues WHERE id = ?`,
    [id]
  );

  return baris[0] ?? null;
}

/* CREATE: membuat antrean baru. */
export async function createQueue() {
  const db = getConnection();

  const [hasil] = await db.execute(
    'INSERT INTO queues (status) VALUES (?)',
    [STATUS.WAITING]
  );

  const nomor = formatQueueNumber(hasil.insertId);

  await db.execute(
    'UPDATE queues SET queue_number = ? WHERE id = ?',
    [nomor, hasil.insertId]
  );

  return findQueue(hasil.insertId);
}

/* UPDATE: mengubah status antrean. */
const KOLOM_WAKTU = Object.freeze({
  [STATUS.CALLED]: 'called_at',
  [STATUS.COMPLETED]: 'completed_at',
  [STATUS.WAITING]: null,
});

export async function updateQueueStatus(id, status) {
  const db = getConnection();
  const kolomWaktu = KOLOM_WAKTU[status];

  const sql = kolomWaktu
    ? `UPDATE queues SET status = ?, ${kolomWaktu} = NOW() WHERE id = ?`
    : 'UPDATE queues SET status = ? WHERE id = ?';

  const [hasil] = await db.execute(sql, [status, id]);

  if (hasil.affectedRows === 0) {
    return null;
  }

  return findQueue(id);
}

/* DELETE: menghapus antrean berdasarkan ID. */
export async function deleteQueue(id) {
  const db = getConnection();

  const [hasil] = await db.execute(
    'DELETE FROM queues WHERE id = ?',
    [id]
  );

  return hasil.affectedRows > 0;
}
