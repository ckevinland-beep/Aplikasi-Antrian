/* QueueApp — aturan antrean */

export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

const TRANSISI_SAH = Object.freeze({
  [STATUS.WAITING]: [STATUS.CALLED],
  [STATUS.CALLED]: [STATUS.COMPLETED],
  [STATUS.COMPLETED]: [],
});

const boleh = (dari, ke) => TRANSISI_SAH[dari].includes(ke);
const sekarang = () => new Date().toISOString();

const AWALAN = 'A';
const PANJANG_DIGIT = 3;

export function formatQueueNumber(angka) {
  return AWALAN + String(angka).padStart(PANJANG_DIGIT, '0');
}

export function emptyState() {
  return {
    lastNumber: 0,
    queues: [],
    myQueueId: null,
  };
}

/* Mendukung state object maupun array antrean */
function daftarAntrean(data) {
  return Array.isArray(data) ? data : data?.queues ?? [];
}

/* Membaca data antrean */
export function currentCalled(data) {
  return daftarAntrean(data).find(
    (queue) => queue.status === STATUS.CALLED,
  ) ?? null;
}

export function nextInLine(data) {
  return daftarAntrean(data).find(
    (queue) => queue.status === STATUS.WAITING,
  ) ?? null;
}

export function waitingQueues(data) {
  return daftarAntrean(data).filter(
    (queue) => queue.status === STATUS.WAITING,
  );
}

export function myQueue(state) {
  if (!state || state.myQueueId == null) return null;

  return daftarAntrean(state).find(
    (queue) => queue.id === state.myQueueId,
  ) ?? null;
}

export function findQueue(data, id) {
  return daftarAntrean(data).find(
    (queue) => queue.id === id,
  ) ?? null;
}

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

/* Membuat nomor antrean baru */
export function takeQueue(state) {
  const angka = state.lastNumber + 1;

  const queue = {
    id: angka,
    queueNumber: formatQueueNumber(angka),
    status: STATUS.WAITING,
    createdAt: sekarang(),
    calledAt: null,
    completedAt: null,
  };

  return {
    ok: true,
    queue,
    state: {
      ...state,
      lastNumber: angka,
      queues: [...state.queues, queue],
      myQueueId: queue.id,
    },
  };
}

/* Memanggil antrean tertua yang masih menunggu */
export function callNext(state) {
  const target = nextInLine(state);

  if (!target) {
    return {
      ok: false,
      code: 'NO_WAITING_QUEUE',
      message: 'Tidak ada antrean yang menunggu.',
    };
  }

  const waktu = sekarang();

  const queues = state.queues.map((queue) => {
    if (queue.status === STATUS.CALLED) {
      return {
        ...queue,
        status: STATUS.COMPLETED,
        completedAt: waktu,
      };
    }

    if (queue.id === target.id) {
      return {
        ...queue,
        status: STATUS.CALLED,
        calledAt: waktu,
      };
    }

    return queue;
  });

  return {
    ok: true,
    state: { ...state, queues },
    queue: queues.find((queue) => queue.id === target.id),
  };
}

/* Menyelesaikan antrean tertentu */
export function completeQueue(state, id) {
  const target = state.queues.find((queue) => queue.id === id);

  if (!target) {
    return {
      ok: false,
      code: 'QUEUE_NOT_FOUND',
      message: 'Antrean tidak ditemukan.',
    };
  }

  if (!boleh(target.status, STATUS.COMPLETED)) {
    return {
      ok: false,
      code: 'INVALID_TRANSITION',
      message: `Antrean berstatus ${target.status} tidak dapat diselesaikan.`,
    };
  }

  const waktu = sekarang();

  const queues = state.queues.map((queue) =>
    queue.id === id
      ? {
          ...queue,
          status: STATUS.COMPLETED,
          completedAt: waktu,
        }
      : queue,
  );

  return {
    ok: true,
    state: { ...state, queues },
    queue: queues.find((queue) => queue.id === id),
  };
}
