import {
  takeQueue,
  myQueue,
  currentCalled,
  waitingQueues,
} from './queue.js';

const el = (id) => document.getElementById(id);

function tampilkanRingkasan() {
  const dipanggil = currentCalled();
  const menunggu = waitingQueues().length;

  el('ringkas-antrean').textContent = dipanggil
    ? `Antrean saat ini sudah sampai ${dipanggil.queueNumber}, dengan ${menunggu} antrean menunggu.`
    : 'Belum ada antrean yang sedang dipanggil.';
}

function tampilkanNomorSaya() {
  const antrean = myQueue();
  const nomor = el('nomor-saya');

  if (!antrean) {
    nomor.textContent =
      'Belum ada nomor yang diambil dari perangkat ini.';
    nomor.classList.add('nomor-antrean--kosong');
    return;
  }

  nomor.textContent = antrean.queueNumber;
  nomor.classList.remove('nomor-antrean--kosong');

  const status = el('status-saya');

  if (status) {
    status.textContent =
      antrean.status === 'WAITING'
        ? 'Menunggu dipanggil.'
        : antrean.status === 'CALLED'
          ? 'Sedang dipanggil.'
          : 'Antrean selesai.';
  }
}

el('form-ambil').addEventListener('submit', (event) => {
  /*
  Tanpa preventDefault(), browser akan mengirim form
  dan memuat ulang halaman sehingga hasil JavaScript hilang.
  */
  event.preventDefault();

  const hasil = takeQueue();

  if (!hasil.ok) return;

  tampilkanNomorSaya();
  tampilkanRingkasan();
});

tampilkanRingkasan();
tampilkanNomorSaya();