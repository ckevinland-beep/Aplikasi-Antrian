
import { STATUS, emptyState } from './queue.js';

/* Kunci dipertahankan dari prototipe Minggu 05. */
export const KUNCI = 'queueapp.prototype.v1';

/* Memastikan data yang dibaca memiliki bentuk dasar yang benar. */
function bentuknyaBenar(data) {
  return (
    data !== null &&
    typeof data === 'object' &&
    Number.isInteger(data.lastNumber) &&
    Array.isArray(data.queues) &&
    data.queues.every(
      (queue) =>
        queue !== null &&
        typeof queue === 'object' &&
        Number.isInteger(queue.id) &&
        typeof queue.queueNumber === 'string' &&
        Object.hasOwn(STATUS, queue.status)
    )
  );
}

/* Membaca data antrean dari localStorage. */
export function muat() {
  try {
    const teks = localStorage.getItem(KUNCI);

    if (!teks) {
      return emptyState();
    }

    const data = JSON.parse(teks);

    if (!bentuknyaBenar(data)) {
      return emptyState();
    }

    return {
      lastNumber: data.lastNumber,
      queues: data.queues,
      myQueueId: Number.isInteger(data.myQueueId)
        ? data.myQueueId
        : null,
    };
  } catch {
    /* Data rusak atau localStorage tidak dapat diakses. */
    return emptyState();
  }
}

/* Menyimpan state antrean ke localStorage. */
export function simpan(state) {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(state));
  } catch {
    /*
     * Aplikasi tetap dapat berjalan jika penyimpanan tidak tersedia
     * atau kapasitas penyimpanan sudah penuh.
     */
  }
}
