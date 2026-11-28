import { ApiError } from '../apiError.js';
import { DAFTAR_STATUS } from '../services/queueService.js';

const daftarStatus = DAFTAR_STATUS.join(', ');

/* ---- Query string: GET /api/queues?status=... ----------------------------
   Penyaringan bersifat opsional; bila diisi, harus salah satu status yang sah. */
export function validateQueueQuery(req, res, next) {
  const { status } = req.query;

  if (status === undefined) {
    return next();
  }

  /* Satu permintaan hanya boleh menyaring satu status. */
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
        `Status "${status}" tidak dikenal. Pilih salah satu: ${daftarStatus}.`
      )
    );
  }

  next();
}

/* ---- Parameter alamat: /api/queues/:id -----------------------------------
   ID harus berupa bilangan bulat positif. */
export function validateQueueId(req, res, next) {
  const { id } = req.params;

  if (!/^[1-9]\d*$/.test(id)) {
    return next(
      new ApiError(
        400,
        'INVALID_ID',
        `Id antrean harus berupa angka. Diterima: "${id}".`
      )
    );
  }

  req.params.id = Number(id);

  next();
}

/* ---- Body: PATCH /api/queues/:id -----------------------------------------
   Satu-satunya kolom yang boleh diubah melalui API adalah status. */
export function validateQueueBody(req, res, next) {
  const { status } = req.body ?? {};

  if (status === undefined) {
    return next(
      new ApiError(
        400,
        'VALIDATION_ERROR',
        `Field status wajib diisi. Pilih salah satu: ${daftarStatus}.`
      )
    );
  }

  if (!DAFTAR_STATUS.includes(status)) {
    return next(
      new ApiError(
        400,
        'INVALID_STATUS',
        `Status "${status}" tidak dikenal. Pilih salah satu: ${daftarStatus}.`
      )
    );
  }

  next();
}
