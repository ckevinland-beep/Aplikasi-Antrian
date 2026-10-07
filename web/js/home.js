import {
  currentCalled,
  waitingQueues,
} from './queue.js';

import {
  formatJam,
  isoUntukAtribut,
} from './format.js';

const el = (id) => document.getElementById(id);

function tampilkanYangDipanggil() {
  const dipanggil = currentCalled();

  el('nomor-dipanggil').textContent = dipanggil
    ? dipanggil.queueNumber
    : '—';

  el('keterangan-dipanggil').textContent = dipanggil
    ? `Antrean ${dipanggil.queueNumber} sedang dipanggil.`
    : 'Belum ada antrean yang dipanggil.';

  const waktu = el('waktu-dipanggil');

  if (waktu) {
    waktu.textContent = dipanggil
      ? formatJam(dipanggil.calledAt)
      : '—';

    waktu.dateTime = dipanggil
      ? isoUntukAtribut(dipanggil.calledAt)
      : '';
  }
}

function tampilkanYangMenunggu() {
  const daftar = waitingQueues();
  const wadah = el('daftar-menunggu');

  /* Dikosongkan dulu, lalu diisi ulang. */
  wadah.replaceChildren();

  if (daftar.length === 0) {
    el('jumlah-menunggu').textContent =
      'Belum ada antrean yang menunggu.';
    return;
  }

  el('jumlah-menunggu').textContent =
    `${daftar.length} antrean masih menunggu.`;

  for (const antrean of daftar) {
    const item = document.createElement('li');

    /* textContent, bukan innerHTML. */
    item.textContent = antrean.queueNumber;

    wadah.append(item);
  }
}

function render() {
  tampilkanYangDipanggil();
  tampilkanYangMenunggu();
}

render();