# QueueApp

QueueApp adalah aplikasi antrean sederhana yang dikembangkan secara bertahap dalam praktikum Web and Mobile Technology. Aplikasi ini membantu pengunjung mengambil dan memantau nomor antrean serta membantu petugas mengelola proses pemanggilan dan penyelesaian antrean.

## Tujuan Proyek

Proyek ini dikembangkan untuk menerapkan proses pengembangan aplikasi secara bertahap, mulai dari identifikasi kebutuhan, perancangan antarmuka, pembuatan fitur, hingga migrasi frontend menggunakan React, Vite, dan React Router serta pengembangan backend menggunakan Node.js dan Express.

## Fitur Utama

- Menampilkan daftar antrean dan status antrean.
- Mengambil nomor antrean baru.
- Melihat posisi dan status antrean.
- Memanggil antrean berikutnya melalui halaman petugas.
- Menyelesaikan antrean yang sedang dipanggil.
- Mencegah pemanggilan antrean berikutnya ketika masih ada antrean berstatus `CALLED`.
- Menampilkan keadaan memuat, galat, dan data kosong pada antarmuka.
- Menyimpan data antrean pada browser menggunakan `localStorage`.
- Menyediakan halaman pengunjung dan petugas melalui React Router.
- Menyediakan REST API backend untuk pemeriksaan kesehatan server dan pengambilan daftar antrean.

**Catatan:** Pada checkpoint Week 08, aplikasi masih berupa Web MVP berbasis frontend. Pada Week 09, backend REST API menggunakan Node.js dan Express mulai dikembangkan dengan data mock di memori server. Frontend masih menggunakan `localStorage` dan belum terintegrasi dengan REST API. Database MySQL juga belum digunakan oleh backend untuk menyimpan data antrean. Formulir login belum menggunakan autentikasi sungguhan.

## Teknologi yang Digunakan

- **HTML:** menyusun struktur dokumen aplikasi.
- **CSS:** mengatur tampilan dan desain responsif.
- **JavaScript:** menangani logika dan interaksi aplikasi.
- **Node.js:** menjalankan lingkungan backend JavaScript.
- **Express:** membangun REST API dan mengelola routing serta middleware backend.
- **React:** membangun antarmuka berbasis komponen.
- **Vite:** menyediakan development server dan proses build frontend.
- **React Router:** mengelola navigasi antarhalaman.
- **localStorage:** menyimpan data antrean secara lokal pada browser.
- **Docker Compose:** menjalankan lingkungan pengembangan.
- **MySQL:** layanan database yang disiapkan dalam lingkungan proyek.
- **Git dan GitHub:** mengelola versi dan riwayat pengembangan proyek.

## Perjalanan Pengembangan

### Week 01 — Discovery & Environment

Menyiapkan repository, kebutuhan awal proyek, konfigurasi environment, dan layanan Docker Compose. Pada tahap ini, layanan MySQL, server placeholder, dan web placeholder digunakan untuk menyiapkan lingkungan pengembangan.

Checkpoint: `week-01`

### Week 02 — Requirements & Perancangan

Memperjelas kebutuhan aplikasi, pengguna, ruang lingkup, dan rancangan sistem sebagai dasar pengembangan fitur pada minggu berikutnya.

Checkpoint: `week-02` — ketersediaan tag perlu diverifikasi pada repository.

### Week 03 — UI/UX + HTML

Membuat struktur dasar halaman aplikasi untuk menampilkan antrean, mengambil nomor antrean, login petugas, dan dashboard petugas. Tahap ini berfokus pada struktur halaman dan alur penggunaan.

Checkpoint: `week-03`

### Week 04 — CSS & Responsive Design

Menambahkan stylesheet untuk memperbaiki tampilan, formulir, tabel antrean, serta responsivitas halaman pada berbagai ukuran layar. Pendekatan yang digunakan adalah mobile-first dengan CSS biasa.

Checkpoint: `week-04`

### Week 05 — JavaScript Foundation

Menambahkan interaksi pada aplikasi, termasuk pengambilan nomor, pemanggilan antrean, penyelesaian antrean, dan penyimpanan data menggunakan `localStorage`.

Checkpoint: `week-05`

### Week 06 — React + Vite

Memigrasikan frontend dari JavaScript biasa ke React menggunakan Vite. Logika antrean, penyimpanan, komponen, halaman, dan entry point ditata ke dalam folder `src`. Struktur aplikasi kemudian dikembangkan menggunakan komponen React.

Checkpoint: `week-06`

### Week 07 — React Integration & Routing

Mengintegrasikan React Router agar pengguna dapat berpindah halaman melalui navigasi sisi klien. Aplikasi menggunakan satu dokumen HTML utama dengan empat path utama:

- `/` — halaman utama.
- `/queue` — halaman pengambilan dan pemantauan antrean.
- `/admin/login` — halaman login petugas.
- `/admin/dashboard` — dashboard petugas.

Pengelolaan state antrean dipusatkan melalui `useQueue.js`. Lapisan `queueApi.js` menyediakan operasi data berbasis Promise, sedangkan `DataState.jsx` menangani keadaan memuat dan galat.

Pada tahap ini, data antrean masih dikelola secara lokal dan belum terhubung dengan REST API sungguhan maupun database terpusat.

Checkpoint: `week-07`

### Week 08 — UTS / Web MVP

Checkpoint Week 08 menjadi titik pemeriksaan Web MVP sebelum pengembangan dilanjutkan ke tahap berikutnya. Tag `week-08` digunakan sebagai penanda checkpoint UTS.

Perbaikan utama pada tahap ini meliputi:

- Memastikan satu tindakan pemanggilan hanya memanggil satu antrean.
- Mencegah pemanggilan antrean baru ketika masih ada antrean berstatus `CALLED`.
- Memisahkan tindakan antrean dari proses penyegaran daftar agar kegagalan penyegaran tidak membuat tindakan yang sudah berhasil dilaporkan sebagai gagal.
- Menyesuaikan halaman dan navigasi dengan struktur React Router.
- Memperbarui dokumentasi alur antarmuka, arsitektur, dan checkpoint UTS.

Checkpoint `week-08` telah digunakan sebagai penanda checkpoint UTS dan menjadi dasar pengembangan pada Week 09.

### Week 09 — Node.js + Express

Mengembangkan backend QueueApp menggunakan Node.js dan Express sebagai dasar penyediaan REST API.

Implementasi pada tahap ini meliputi:

- Menyiapkan project Express pada folder `server`.
- Memisahkan kode backend ke dalam lapisan routes, controllers, dan services.
- Menambahkan middleware untuk mencatat request, memvalidasi query, dan menangani route yang tidak ditemukan.
- Menyediakan format respons sukses melalui properti `data`.
- Menyediakan penanganan galat terpusat dengan format `error` yang konsisten.
- Menambahkan endpoint `GET /api/health` untuk memeriksa kondisi server.
- Menambahkan endpoint `GET /api/queues` untuk mengambil daftar antrean dari data mock.
- Mendukung filter antrean berdasarkan status `WAITING`, `CALLED`, dan `COMPLETED`.

Pada tahap ini, backend belum menggunakan database. Data antrean masih disimpan sementara di memori server dan frontend belum terhubung ke API Express.

Checkpoint: `week-09` — akan ditetapkan setelah pemeriksaan akhir dan proses Git selesai.

## Menjalankan Proyek

### Prasyarat

Pastikan perangkat telah memiliki:

- Git.
- Docker Desktop.
- Docker Compose.

Untuk menjalankan frontend secara langsung di luar Docker, gunakan Node.js dan npm yang sesuai dengan kebutuhan proyek.

### Langkah Menjalankan

Clone repository dan masuk ke direktori proyek:

```bash
git clone https://github.com/ckevinland-beep/Aplikasi-Antrian.git
cd Aplikasi-Antrian
```

Salin `.env.example` menjadi `.env` apabila file tersebut digunakan oleh konfigurasi lokal. Pada Windows, file dapat disalin melalui File Explorer.

Jalankan layanan menggunakan Docker Compose:

```bash
docker compose up -d
docker compose ps
```

Untuk melihat log layanan:

```bash
docker compose logs -f
```

Untuk menghentikan layanan:

```bash
docker compose down
```

Jangan memasukkan file `.env` ke repository karena dapat berisi konfigurasi lokal atau informasi sensitif.

### Alamat Demo

Setelah layanan web berjalan, buka alamat berikut:

- Halaman utama: http://localhost:5173/
- Halaman antrean: http://localhost:5173/queue
- Login petugas: http://localhost:5173/admin/login
- Dashboard petugas: http://localhost:5173/admin/dashboard

### Endpoint Backend

- Health check: http://localhost:3001/api/health
- Daftar antrean: http://localhost:3001/api/queues
- Filter antrean: http://localhost:3001/api/queues?status=WAITING

Status yang dapat digunakan untuk filter adalah `WAITING`, `CALLED`, dan `COMPLETED`.

**Catatan:** Backend berjalan secara terpisah dari frontend. Data antrean backend masih berupa data mock di memori server dan belum terhubung dengan MySQL maupun frontend.

Alamat di atas merupakan alamat lokal pengembangan. Keberhasilan akses bergantung pada layanan Docker atau development server yang sedang berjalan.

## Struktur Repository

Struktur utama proyek setelah pengembangan React, routing, dan backend Express mencakup:

```text
Aplikasi-Antrian/
├── docs/
│   ├── architecture.md
│   ├── requirements.md
│   ├── ui-flow.md
│   └── uts-checkpoint.md
├── server/
│   ├── package.json
│   ├── package-lock.json
│   └── src/
│       ├── config/
│       │   └── index.js
│       ├── controllers/
│       │   ├── healthController.js
│       │   └── queueController.js
│       ├── middleware/
│       │   ├── errorHandler.js
│       │   ├── notFound.js
│       │   ├── requestLogger.js
│       │   └── validateQueueQuery.js
│       ├── routes/
│       │   ├── healthRoutes.js
│       │   ├── index.js
│       │   └── queueRoutes.js
│       ├── services/
│       │   └── queueService.js
│       ├── apiError.js
│       ├── app.js
│       └── server.js
├── web/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── src/
│       ├── api/
│       │   └── queueApi.js
│       ├── components/
│       ├── pages/
│       ├── styles/
│       ├── App.jsx
│       ├── main.jsx
│       ├── queue.js
│       ├── storage.js
│       └── useQueue.js
├── .env.example
├── .gitignore
├── docker-compose.yml
├── MILESTONE.md
├── PRD.md
└── README.md
```

Struktur tersebut merupakan gambaran file utama proyek. Isi folder dapat bertambah atau berubah sesuai implementasi dan modul praktikum.

## Pengelolaan Versi

Pengembangan dilakukan menggunakan Git dengan cabang kerja mingguan, pesan commit yang menjelaskan perubahan, dan Pull Request untuk menggabungkan pekerjaan ke `main`.

Checkpoint yang telah digunakan pada tahapan pengembangan meliputi `week-01`, `week-03`, `week-04`, `week-05`, `week-06`, dan `week-07`. Ketersediaan tag `week-02` perlu diperiksa pada repository.

Checkpoint `week-08` menjadi titik pemeriksaan Web MVP. Pengembangan backend dilanjutkan pada branch `week/09-express`. Tag `week-09` akan ditetapkan setelah perubahan, dokumentasi, dan pemeriksaan akhir selesai dilakukan.

## Status Pengembangan

Pada Week 09, QueueApp telah memiliki backend REST API menggunakan Node.js dan Express. Backend menyediakan endpoint health check dan daftar antrean dengan dukungan filter berdasarkan status.

Struktur backend telah dipisahkan ke dalam lapisan routes, controllers, dan services. Middleware digunakan untuk mencatat request, memvalidasi query, serta menangani galat dengan format respons yang konsisten.

Data antrean pada backend masih menggunakan data mock di memori server dan belum terhubung dengan database MySQL. Frontend masih mengelola data antrean menggunakan `localStorage` dan belum terintegrasi dengan backend Express.

Pengembangan berikutnya akan mengikuti modul praktikum, dengan menjaga konsistensi implementasi, dokumentasi, dan pengelolaan versi proyek.