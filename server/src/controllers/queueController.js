import { ApiError } from '../apiError.js';

import {
  listQueues,
  findQueue,
  createQueue,
  updateQueueStatus,
  deleteQueue,
  callNext,
  completeQueue,
} from '../services/queueService.js';

/* Pemetaan kode penolakan service ke HTTP status. */
const STATUS_HTTP = Object.freeze({
  QUEUE_NOT_FOUND: 404,
  NO_WAITING_QUEUE: 409,
  QUEUE_ALREADY_CALLED: 409,
  INVALID_TRANSITION: 409,
});

/* Mengirim hasil service atau meneruskan galat ke errorHandler. */
function kirim(res, hasil, statusSukses = 200) {
  if (!hasil.ok) {
    throw new ApiError(
      STATUS_HTTP[hasil.code] ?? 500,
      hasil.code,
      hasil.message
    );
  }

  res.status(statusSukses).json({ data: hasil.queue });
}

/* GET /api/queues - daftar antrean. */
export async function getQueues(req, res) {
  const queues = await listQueues({
    status: req.query.status,
  });

  res.status(200).json({ data: queues });
}

/* GET /api/queues/:id - detail satu antrean. */
export async function getQueue(req, res) {
  const queue = await findQueue(req.params.id);

  if (!queue) {
    throw new ApiError(
      404,
      'QUEUE_NOT_FOUND',
      'Antrean tidak ditemukan.'
    );
  }

  res.status(200).json({ data: queue });
}

/* POST /api/queues - membuat antrean baru. */
export async function postQueue(req, res) {
  kirim(res, await createQueue(), 201);
}

/* PATCH /api/queues/:id - mengubah status antrean. */
export async function patchQueue(req, res) {
  kirim(
    res,
    await updateQueueStatus(req.params.id, req.body.status)
  );
}

/* DELETE /api/queues/:id - menghapus antrean. */
export async function deleteQueueById(req, res) {
  const berhasil = await deleteQueue(req.params.id);

  if (!berhasil) {
    throw new ApiError(
      404,
      'QUEUE_NOT_FOUND',
      'Antrean tidak ditemukan.'
    );
  }

  res.status(204).end();
}

/* POST /api/queues/next - memanggil antrean berikutnya. */
export async function postCallNext(req, res) {
  kirim(res, await callNext());
}

/* POST /api/queues/:id/complete - menyelesaikan antrean. */
export async function postComplete(req, res) {
  kirim(res, await completeQueue(req.params.id));
}
