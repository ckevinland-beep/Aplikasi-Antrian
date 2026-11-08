import { listQueues } from '../services/queueService.js';

/* GET /api/queues — daftar antrean hari ini. */
export function getQueues(req, res) {
  const queues = listQueues({ status: req.query.status });

  res.status(200).json({ data: queues });
}