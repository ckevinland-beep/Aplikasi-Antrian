/* =============================================================================
   storage.js — penyimpanan lokal untuk ID antrean milik pengunjung
   ============================================================================= */

export const KUNCI_NOMOR_SAYA = 'queueapp.nomor-saya.v2';

/* Mengambil ID antrean milik pengunjung dari localStorage. */
export function muatNomorSaya() {
  try {
    const teks = localStorage.getItem(KUNCI_NOMOR_SAYA);

    if (!teks) return null;

    const id = JSON.parse(teks);

    return Number.isInteger(id) ? id : null;
  } catch {
    return null;
  }
}

/* Menyimpan ID antrean milik pengunjung ke localStorage. */
export function simpanNomorSaya(id) {
  try {
    localStorage.setItem(KUNCI_NOMOR_SAYA, JSON.stringify(id));
  } catch {
    // Nomor tetap tersedia selama state React masih aktif.
  }
}