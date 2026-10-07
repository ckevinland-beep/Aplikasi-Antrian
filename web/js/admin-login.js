const form = document.getElementById('form-masuk');
const email = document.getElementById('email');
const password = document.getElementById('password');
const pesan = form.querySelector('.pesan-galat');

/*
Aturan ditulis sebagai daftar.
Menambah aturan baru berarti menambah satu entri.
*/
const ATURAN = [
  {
    kolom: () => email,
    salah: (nilai) => nilai.trim() === '',
    pesan: 'Email wajib diisi.',
  },
  {
    kolom: () => email,

    /*
    Bentuk email diperiksa oleh browser melalui
    type="email", kemudian dibaca dari validity.typeMismatch.
    */
    salah: (nilai, kolom) =>
      nilai.trim() !== '' && kolom.validity.typeMismatch,

    pesan: 'Format email tidak valid. Contoh: petugas@queueapp.test',
  },
  {
    kolom: () => password,
    salah: (nilai) => nilai === '',
    pesan: 'Password wajib diisi.',
  },
];

function bersihkanTanda() {
  email.removeAttribute('aria-invalid');
  password.removeAttribute('aria-invalid');
  pesan.textContent = '';
}

function periksa() {
  for (const aturan of ATURAN) {
    const kolom = aturan.kolom();
    const nilai = kolom.value;

    if (aturan.salah(nilai, kolom)) {
      return {
        kolom,
        pesan: aturan.pesan,
      };
    }
  }

  return null;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  bersihkanTanda();

  const galat = periksa();

  if (galat) {
    /*
    Memberi tahu pembaca layar bahwa kolom
    sedang bermasalah.
    */
    galat.kolom.setAttribute('aria-invalid', 'true');

    pesan.textContent = galat.pesan;

    /*
    Fokus dipindahkan ke kolom pertama yang
    bermasalah.
    */
    galat.kolom.focus();

    return;
  }

  /*
  Minggu 05 belum memeriksa kredensial.
  Jika isian lengkap dan format email benar,
  langsung menuju halaman dashboard.
  */
  window.location.assign(
    form.getAttribute('action')
  );
});