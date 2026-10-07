javascript
/* --------------------------------------------------------------------------
   QueueApp — Queue State
   Minggu 05: JavaScript Foundation

   Berkas ini hanya mengatur data dan aturan antrean.
   Tidak boleh menyentuh DOM.
-------------------------------------------------------------------------- */

export const STATUS = Object.freeze({
  WAITING: 'WAITING',
  CALLED: 'CALLED',
  COMPLETED: 'COMPLETED',
});

/*
  Transisi status yang diizinkan:

  WAITING → CALLED → COMPLETED

  COMPLETED tidak mempunyai tujuan sehingga antrean yang sudah selesai
  tidak dapat dikembalikan ke status sebelumnya.
*/
const TRANSISI_SAH = Object.freeze({
  [STATUS.WAITING]: [STATUS.CALLED],
  [STATUS.CALLED]: [STATUS.COMPLETED],
  [STATUS.COMPLETED]: [],
});


/* --------------------------------------------------------------------------
   Konstanta nomor antrean
-------------------------------------------------------------------------- */

const AWALAN = 'A';
const PANJANG_DIGIT = 3;


/*
  Mengubah angka menjadi nomor antrean yang mudah dibaca.

  1    → A001
  42   → A042
  1234 → A1234

  Setelah 999 nomor, jumlah digit boleh bertambah.
  Nomor tidak boleh kembali ke A001.
*/
export function formatQueueNumber(angka) {
  return AWALAN + String(angka).padStart(PANJANG_DIGIT, '0');
}


/* --------------------------------------------------------------------------
   State
-------------------------------------------------------------------------- */

function stateKosong() {
  return {
    /*
      Nomor terakhir yang pernah dikeluarkan.
      Disimpan terpisah dari daftar antrean agar nomor tidak digunakan ulang.
    */
    lastNumber: 0,

    queues: [],

    /*
      ID antrean milik perangkat ini.
      Digunakan untuk mengetahui "nomor saya".
    */
    myQueueId: null,
  };
}

let state = stateKosong();


/* --------------------------------------------------------------------------
   Persistensi localStorage
-------------------------------------------------------------------------- */

const KUNCI = 'queueapp.prototype.v1';


function simpan() {
  try {
    localStorage.setItem(KUNCI, JSON.stringify(state));
  } catch {
    /*
      Penyimpanan dapat gagal, misalnya karena mode penyamaran
      atau kapasitas penyimpanan penuh.

      Aplikasi tetap berjalan walaupun data tidak bertahan
      setelah halaman dimuat ulang.
    */
  }
}


function bentuknyaBenar(data) {
  return (
    data !== null &&
    typeof data === 'object' &&
    Number.isInteger(data.lastNumber) &&
    Array.isArray(data.queues) &&
    data.queues.every(
      (queue) =>
        Number.isInteger(queue.id) &&
        typeof queue.queueNumber === 'string' &&
        Object.hasOwn(STATUS, queue.status)
    )
  );
}


function muat() {
  try {
    const teks = localStorage.getItem(KUNCI);

    if (!teks) {
      return;
    }

    const data = JSON.parse(teks);

    /*
      Data dari localStorage tidak langsung dipercaya.
      Bentuknya diperiksa terlebih dahulu.
    */
    if (!bentuknyaBenar(data)) {
      return;
    }

    state = {
      lastNumber: data.lastNumber,
      queues: data.queues,
      myQueueId: Number.isInteger(data.myQueueId)
        ? data.myQueueId
        : null,
    };
  } catch {
    /*
      JSON rusak atau localStorage tidak dapat dibaca.
      State tetap menggunakan keadaan kosong.
    */
  }
}


/*
  Muat state saat modul pertama kali dijalankan.
*/
muat();


/* --------------------------------------------------------------------------
   Fungsi baca state
-------------------------------------------------------------------------- */

/*
  Mengembalikan salinan daftar antrean.
  Kode tampilan tidak boleh mengubah state secara langsung.
*/
export function allQueues() {
  return state.queues.map((queue) => ({ ...queue }));
}


export function findQueue(id) {
  const found = state.queues.find((queue) => queue.id === id);

  return found ? { ...found } : null;
}


/*
  Antrean yang sedang dipanggil.
  Hanya boleh ada satu antrean CALLED.
*/
export function currentCalled() {
  const found = state.queues.find(
    (queue) => queue.status === STATUS.CALLED
  );

  return found ? { ...found } : null;
}


/*
  Antrean WAITING tertua yang akan dipanggil berikutnya.
*/
export function nextInLine() {
  const found = state.queues.find(
    (queue) => queue.status === STATUS.WAITING
  );

  return found ? { ...found } : null;
}


export function waitingQueues() {
  return state.queues
    .filter((queue) => queue.status === STATUS.WAITING)
    .map((queue) => ({ ...queue }));
}


export function myQueue() {
  return state.myQueueId === null
    ? null
    : findQueue(state.myQueueId);
}


export function summary() {
  const hitung = (status) =>
    state.queues.filter((queue) => queue.status === status).length;

  return {
    waiting: hitung(STATUS.WAITING),
    called: hitung(STATUS.CALLED),
    completed: hitung(STATUS.COMPLETED),
    total: state.queues.length,
  };
}


/* --------------------------------------------------------------------------
   Penjaga transisi
-------------------------------------------------------------------------- */

function boleh(dari, ke) {
  return TRANSISI_SAH[dari].includes(ke);
}


/* --------------------------------------------------------------------------
   Mengubah state
-------------------------------------------------------------------------- */

/*
  Mengambil nomor antrean baru.

  Nomor dibuat di queue.js, bukan di halaman.
  Dengan begitu aturan penomoran hanya mempunyai satu sumber.
*/
export function takeQueue() {
  state.lastNumber += 1;

  const queue = {
    id: state.lastNumber,
    queueNumber: formatQueueNumber(state.lastNumber),
    status: STATUS.WAITING,
    createdAt: new Date().toISOString(),
    calledAt: null,
    completedAt: null,
  };

  /*
    Antrean selalu ditambahkan di akhir.
    Karena itu urutan array sama dengan urutan pembuatan.
  */
  state.queues.push(queue);

  /*
    Simpan nomor antrean milik perangkat ini.
  */
  state.myQueueId = queue.id;

  simpan();

  return {
    ok: true,
    queue: { ...queue },
  };
}


/*
  Memanggil antrean WAITING tertua.

  Jika masih ada antrean CALLED, antrean tersebut otomatis dianggap
  selesai sebelum antrean WAITING berikutnya dipanggil.
*/
export function callNext() {
  const target = state.queues.find(
    (queue) => queue.status === STATUS.WAITING
  );

  if (!target) {
    return {
      ok: false,
      code: 'NO_WAITING_QUEUE',
      message: 'Tidak ada antrean yang menunggu.',
    };
  }

  /*
    Hanya boleh ada satu antrean CALLED.
    Jika petugas memanggil berikutnya ketika masih ada yang dipanggil,
    antrean lama otomatis menjadi COMPLETED.
  */
  const sedangDipanggil = state.queues.find(
    (queue) => queue.status === STATUS.CALLED
  );

  if (sedangDipanggil) {
    sedangDipanggil.status = STATUS.COMPLETED;
    sedangDipanggil.completedAt = new Date().toISOString();
  }

  /*
    Pastikan transisi WAITING → CALLED memang sah.
  */
  if (!boleh(target.status, STATUS.CALLED)) {
    return {
      ok: false,
      code: 'INVALID_TRANSITION',
      message: `Antrean berstatus ${target.status} tidak dapat dipanggil.`,
    };
  }

  target.status = STATUS.CALLED;
  target.calledAt = new Date().toISOString();

  simpan();

  return {
    ok: true,
    queue: { ...target },
  };
}


/*
  Menyelesaikan antrean tertentu.
*/
export function completeQueue(id) {
  const target = state.queues.find(
    (queue) => queue.id === id
  );

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

  target.status = STATUS.COMPLETED;
  target.completedAt = new Date().toISOString();

  simpan();

  return {
    ok: true,
    queue: { ...target },
  };
}

