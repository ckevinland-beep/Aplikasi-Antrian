/* QueueApp - helper pembacaan data antrean */

export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

/* Mendukung state object maupun array antrean */
function daftarAntrean(data) {
  return Array.isArray(data) ? data : data?.queues ?? [];
}

/* Membaca antrean yang sedang dipanggil */
export function currentCalled(data) {
  return daftarAntrean(data).find(
    (queue) => queue.status === STATUS.CALLED,
  ) ?? null;
}

/* Membaca antrean berikutnya */
export function nextInLine(data) {
  return daftarAntrean(data).find(
    (queue) => queue.status === STATUS.WAITING,
  ) ?? null;
}

/* Membaca seluruh antrean yang menunggu */
export function waitingQueues(data) {
  return daftarAntrean(data).filter(
    (queue) => queue.status === STATUS.WAITING,
  );
}

/* Membaca antrean milik pengunjung */
export function myQueue(state) {
  if (!state || state.myQueueId == null) return null;

  return daftarAntrean(state).find(
    (queue) => queue.id === state.myQueueId,
  ) ?? null;
}

/* Mencari antrean berdasarkan ID */
export function findQueue(data, id) {
  return daftarAntrean(data).find(
    (queue) => queue.id === id,
  ) ?? null;
}

/* Menghitung ringkasan antrean */
export function summary(data) {
  const queues = daftarAntrean(data);

  const hitung = (status) =>
    queues.filter((queue) => queue.status === status).length;

  return {
    waiting: hitung(STATUS.WAITING),
    called: hitung(STATUS.CALLED),
    completed: hitung(STATUS.COMPLETED),
    total: queues.length,
  };
}