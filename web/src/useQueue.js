
import { useEffect, useState } from 'react';

import {
  callNext,
  completeQueue,
  takeQueue,
} from './queue.js';

import { muat, simpan } from './storage.js';

export function useQueue() {
  /*
   * Data antrean dan pesan disimpan dalam satu state.
   * muat dijalankan saat inisialisasi, bukan setiap render.
   */
  const [app, setApp] = useState(() => ({
    data: muat(),
    pesan: '',
  }));

  /*
   * Simpan data setiap kali state antrean berubah.
   */
  useEffect(() => {
    simpan(app.data);
  }, [app.data]);

  /*
   * Semua aksi menghitung state baru berdasarkan state sebelumnya.
   * Cara ini mencegah klik beruntun memakai state lama yang sama.
   */
  function jalankan(aksi) {
    setApp((sebelum) => {
      const hasil = aksi(sebelum.data);

      if (!hasil.ok) {
        return {
          data: sebelum.data,
          pesan: hasil.message,
        };
      }

      return {
        data: hasil.state,
        pesan: '',
      };
    });
  }

  return {
    state: app.data,
    pesan: app.pesan,

    ambilNomor: () =>
      jalankan((data) => takeQueue(data)),

    panggilBerikutnya: () =>
      jalankan((data) => callNext(data)),

    selesaikan: (id) =>
      jalankan((data) => completeQueue(data, id)),
  };
}
