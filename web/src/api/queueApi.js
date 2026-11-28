/* =============================================================================
   queueApi.js — satu-satunya pintu ke data antrean

   Seluruh operasi antrean sekarang dikirim ke REST API.
   ============================================================================= */

const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';

/* Bentuk galat yang konsisten untuk seluruh operasi API. */
export class GalatApi extends Error {
  constructor(code, message) {
    super(message);
    this.name = 'GalatApi';
    this.code = code;
  }
}

/* Mengirim permintaan ke server dan membaca respons API. */
async function permintaan(alamat, opsi = {}) {
  let response;

  try {
    response = await fetch(API_URL + alamat, {
      headers: { 'Content-Type': 'application/json' },
      ...opsi,
    });
  } catch {
    throw new GalatApi(
      'NETWORK_ERROR',
      'Tidak dapat menghubungi server antrean. Periksa koneksi Anda, lalu coba lagi.',
    );
  }

  const isi =
    response.status === 204
      ? null
      : await response.json().catch(() => null);

  if (!response.ok) {
    throw new GalatApi(
      isi?.error?.code ?? 'UNKNOWN_ERROR',
      isi?.error?.message ?? `Permintaan gagal (${response.status}).`,
    );
  }

  return isi?.data;
}

/* GET /api/queues — mengambil seluruh daftar antrean. */
export function ambilDaftarAntrean() {
  return permintaan('/queues');
}

/* POST /api/queues — membuat nomor antrean baru. */
export function buatAntrean() {
  return permintaan('/queues', { method: 'POST' });
}

/* POST /api/queues/next — memanggil antrean berikutnya. */
export function panggilAntreanBerikutnya() {
  return permintaan('/queues/next', { method: 'POST' });
}

/* POST /api/queues/:id/complete — menyelesaikan antrean. */
export function selesaikanAntrean(id) {
  return permintaan(`/queues/${id}/complete`, { method: 'POST' });
}
