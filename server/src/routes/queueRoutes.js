import { Router } from 'express';

import {
  getQueues,
  getQueue,
  postQueue,
  patchQueue,
  deleteQueueById,
  postCallNext,
  postComplete,
} from '../controllers/queueController.js';

import {
  validateQueueQuery,
  validateQueueId,
  validateQueueBody,
} from '../middleware/validateQueue.js';

export const queueRoutes = Router();

/* Aksi petugas: panggil antrean berikutnya. */
queueRoutes.post('/next', postCallNext);

/* Daftar dan pembuatan antrean. */
queueRoutes.get('/', validateQueueQuery, getQueues);
queueRoutes.post('/', postQueue);

/* Operasi berdasarkan ID antrean. */
queueRoutes.get('/:id', validateQueueId, getQueue);
queueRoutes.patch('/:id', validateQueueId, validateQueueBody, patchQueue);
queueRoutes.delete('/:id', validateQueueId, deleteQueueById);

/* Menyelesaikan antrean yang sedang dipanggil. */
queueRoutes.post('/:id/complete', validateQueueId, postComplete);
