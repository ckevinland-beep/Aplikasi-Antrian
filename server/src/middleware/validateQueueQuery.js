import { ApiError } from '../apiError.js';
import { DAFTAR_STATUS } from '../services/queueService.js';

export function validateQueueQuery(req, res, next) {
  const { status } = req.query;

  /* Filter status bersifat opsional. */
  if (status === undefined) {
    return next();
  }

  /* Satu permintaan hanya boleh memiliki satu status. */
  if (typeof status !== 'string') {
    return next(
      new ApiError(
        400,
        'INVALID_QUERY',
        'Parameter status hanya boleh ditulis satu kali.'
      )
    );
  }

  if (!DAFTAR_STATUS.includes(status)) {
    return next(
      new ApiError(
        400,
        'INVALID_STATUS',
        `Status "${status}" tidak dikenal. Pilih salah satu: ${DAFTAR_STATUS.join(', ')}.`
      )
    );
  }

  next();
}