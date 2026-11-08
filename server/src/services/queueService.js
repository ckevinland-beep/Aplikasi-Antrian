/* Status yang sah, sesuai FR-03. */
export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

export const DAFTAR_STATUS = Object.freeze(Object.values(STATUS));

/* Data tiruan antrean untuk Minggu 09. */
const MOCK_QUEUES = Object.freeze([
  {
    id: 1,
    queueNumber: 'A001',
    status: STATUS.COMPLETED,
    createdAt: '2026-09-04T01:02:00.000Z',
    calledAt: '2026-09-04T01:05:00.000Z',
    completedAt: '2026-09-04T01:11:00.000Z',
  },
  {
    id: 2,
    queueNumber: 'A002',
    status: STATUS.COMPLETED,
    createdAt: '2026-09-04T01:04:00.000Z',
    calledAt: '2026-09-04T01:12:00.000Z',
    completedAt: '2026-09-04T01:19:00.000Z',
  },
  {
    id: 3,
    queueNumber: 'A003',
    status: STATUS.CALLED,
    createdAt: '2026-09-04T01:07:00.000Z',
    calledAt: '2026-09-04T01:20:00.000Z',
    completedAt: null,
  },
  {
    id: 4,
    queueNumber: 'A004',
    status: STATUS.WAITING,
    createdAt: '2026-09-04T01:15:00.000Z',
    calledAt: null,
    completedAt: null,
  },
  {
    id: 5,
    queueNumber: 'A005',
    status: STATUS.WAITING,
    createdAt: '2026-09-04T01:21:00.000Z',
    calledAt: null,
    completedAt: null,
  },
]);

/* Membaca daftar antrean dengan filter status opsional. */
export function listQueues({ status } = {}) {
  if (!status) {
    return [...MOCK_QUEUES];
  }

  return MOCK_QUEUES.filter((queue) => queue.status === status);
}