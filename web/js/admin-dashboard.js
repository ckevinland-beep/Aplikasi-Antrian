import {
  STATUS,
  allQueues,
  currentCalled,
  nextInLine,
  summary,
  callNext,
  completeQueue,
} from './queue.js';

import {
  formatJam,
  isoUntukAtribut,
} from './format.js';

const el = (id) => document.getElementById(id);

function selUntuk(status) {
  const sel = document.createElement('td');

  if (status === STATUS.WAITING) {
    sel.textContent = 'Menunggu';
  } else if (status === STATUS.CALLED) {
    sel.textContent = 'Dipanggil';
  } else if (status === STATUS.COMPLETED) {
    sel.textContent = 'Selesai';
  }

  sel.dataset.status = status;
  return sel;
}

function selWaktu(iso) {
  const sel = document.createElement('td');
  const waktu = document.createElement('time');

  waktu.textContent = formatJam(iso);
  waktu.dateTime = isoUntukAtribut(iso);

  sel.append(waktu);
  return sel;
}

function barisUntuk(antrean) {
  const baris = document.createElement('tr');

  /* Nomor antrean adalah kepala baris. */
  const nomor = document.createElement('th');
  nomor.scope = 'row';
  nomor.textContent = antrean.queueNumber;
  baris.append(nomor);

  const status = selUntuk(antrean.status);
  baris.append(status);

  baris.append(selWaktu(antrean.createdAt));
  baris.append(selWaktu(antrean.calledAt));
  baris.append(selWaktu(antrean.completedAt));

  const aksi = document.createElement('td');

  if (antrean.status === STATUS.CALLED) {
    const tombol = document.createElement('button');

    tombol.type = 'button';
    tombol.textContent =
      `Selesaikan ${antrean.queueNumber}`;

    tombol.dataset.selesaikan = String(antrean.id);

    aksi.append(tombol);
  } else {
    aksi.textContent = '—';
  }

  baris.append(aksi);

  return baris;
}

function tampilkanRingkasan() {
  const data = summary();
  const dipanggil = currentCalled();

  el('ringkas-dipanggil').textContent =
    dipanggil ? dipanggil.queueNumber : '—';

  el('ringkas-menunggu').textContent = data.waiting;
  el('ringkas-selesai').textContent = data.completed;
}

function tampilkanAksi() {
  const berikutnya = nextInLine();

  el('berikutnya').textContent = berikutnya
    ? `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`
    : 'Belum ada antrean yang menunggu.';

  /*
  Tombol dimatikan jika tidak ada antrean
  yang bisa dipanggil.
  */
  el('tombol-panggil').disabled = berikutnya === null;
}

function tampilkanTabel() {
  const daftar = allQueues();
  const tbody = el('isi-antrean');

  tbody.replaceChildren();

  if (daftar.length === 0) {
    const baris = document.createElement('tr');
    const sel = document.createElement('td');

    sel.colSpan = 6;
    sel.textContent = 'Belum ada antrean.';

    baris.append(sel);
    tbody.append(baris);

    return;
  }

  for (const antrean of daftar) {
    tbody.append(barisUntuk(antrean));
  }
}

function pesan(teks) {
  el('pesan-aksi').textContent = teks;
}

function render() {
  tampilkanRingkasan();
  tampilkanAksi();
  tampilkanTabel();
}

/* ---- Aksi panggil antrean ---- */

el('form-panggil').addEventListener('submit', (event) => {
  event.preventDefault();

  const hasil = callNext();

  pesan(hasil.ok ? '' : hasil.message);

  render();
});

/*
Satu event listener di tbody, bukan satu per tombol.
Ini disebut event delegation.
*/
el('isi-antrean').addEventListener('click', (event) => {
  const tombol = event.target.closest('[data-selesaikan]');

  if (!tombol) return;

  const hasil = completeQueue(
    Number(tombol.dataset.selesaikan)
  );

  pesan(hasil.ok ? '' : hasil.message);

  render();
});

render();