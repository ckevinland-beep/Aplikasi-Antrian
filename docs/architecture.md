# QueueApp — Architecture Documentation

## 1. Gambaran Umum

QueueApp adalah aplikasi antrean sederhana yang dikembangkan sebagai proyek praktikum mata kuliah Web and Mobile Technology. Aplikasi ini membantu pengunjung mengambil nomor antrean dan melihat status antrean, sedangkan petugas dapat memantau, memanggil, dan menyelesaikan antrean.

Pengembangan QueueApp dilakukan secara bertahap. Minggu 01 berfokus pada persiapan lingkungan, kemudian dilanjutkan dengan perancangan kebutuhan, struktur HTML, CSS responsif, JavaScript, React + Vite, serta integrasi React Router dan lapisan data pada Minggu 07.

Pada tahap Minggu 07, aplikasi masih menggunakan simulasi data di sisi klien. Integrasi dengan API server sungguhan dan database terpusat belum menjadi bagian dari implementasi saat ini.

## 2. Tujuan Sistem

QueueApp dikembangkan untuk:

1. Memudahkan pengunjung mengambil nomor antrean.
2. Menampilkan status antrean yang sedang dipanggil dan masih menunggu.
3. Membantu petugas mengelola antrean melalui dashboard.
4. Menyediakan antarmuka yang dapat digunakan pada berbagai ukuran layar.
5. Menerapkan pengembangan aplikasi secara bertahap dengan struktur kode yang terorganisasi.

## 3. Peran Pengguna

### 3.1 Pengunjung

Pengunjung dapat:
- Melihat antrean yang sedang dipanggil.
- Melihat daftar antrean yang menunggu.
- Mengambil nomor antrean baru.
- Melihat status nomor antrean yang diambil.

### 3.2 Petugas

Petugas dapat:
- Membuka halaman login.
- Mengakses dashboard melalui simulasi login.
- Melihat ringkasan dan daftar antrean.
- Memanggil antrean berikutnya sesuai urutan.
- Menyelesaikan antrean yang sedang dipanggil.

Login pada tahap ini masih berupa simulasi dan belum menggunakan autentikasi sungguhan.

## 4. Perkembangan Arsitektur Minggu 01–07

### Minggu 01 — Discovery & Environment

Tahap pertama berfokus pada persiapan lingkungan pengembangan. Docker Compose digunakan untuk menjalankan tiga layanan utama:

- **Web:** menyediakan antarmuka aplikasi.
- **Server:** disiapkan sebagai layanan backend.
- **MySQL:** disiapkan sebagai layanan basis data.

Pada tahap awal, aplikasi masih berupa placeholder. Tujuannya adalah memastikan lingkungan pengembangan berjalan sebelum fitur aplikasi dibangun.

### Minggu 02 — Requirements & System Design

Tahap ini berfokus pada pendefinisian masalah, kebutuhan pengguna, ruang lingkup aplikasi, dan rancangan awal sistem.

Dokumentasi kebutuhan menjadi dasar untuk menentukan fitur yang akan dikembangkan, peran pengguna, batas MVP, serta fitur yang belum dikerjakan pada tahap awal.

### Minggu 03 — UI/UX & HTML

Struktur antarmuka dibuat menggunakan HTML semantik dengan empat halaman awal:

- `index.html` — Antrean Saat Ini.
- `take-queue.html` — Ambil Nomor Antrean.
- `admin-login.html` — Login Petugas.
- `admin-dashboard.html` — Dashboard Petugas.

Tahap ini berfokus pada struktur konten, label formulir, tabel, navigasi, dan aksesibilitas dasar. CSS dan JavaScript belum menjadi bagian implementasi minggu ini.

### Minggu 04 — CSS & Responsive Design

CSS ditambahkan untuk membentuk tampilan aplikasi yang lebih teratur dan responsif.

Pendekatan mobile-first digunakan agar antarmuka dapat digunakan pada layar kecil maupun besar. Komponen seperti formulir, tombol, navigasi, dan tabel disesuaikan agar lebih mudah digunakan.

### Minggu 05 — JavaScript

JavaScript ditambahkan untuk menangani perilaku interaktif aplikasi, termasuk pengambilan nomor, perubahan status antrean, validasi formulir, dan interaksi dashboard.

Logika antrean dipisahkan dari kode tampilan agar aturan bisnis dapat digunakan kembali dan lebih mudah dirawat.

### Minggu 06 — React + Vite

Antarmuka mulai diintegrasikan menggunakan React dan Vite. Komponen dan halaman disusun menjadi bagian-bagian yang lebih mudah digunakan kembali.

Pengelolaan data antrean menggunakan fungsi dan hook agar perubahan data dapat ditampilkan kembali pada antarmuka.

### Minggu 07 — React Integration & Routing

Pada tahap ini, aplikasi menggunakan satu dokumen HTML dan React Router untuk berpindah halaman tanpa memuat ulang seluruh dokumen.

`App.jsx` menjadi pemilik utama state antrean melalui `useQueue.js`. Lapisan data pada `api/queueApi.js` menyediakan operasi berbasis Promise, sedangkan `DataState.jsx` menangani keadaan memuat dan galat.

Lapisan tersebut masih menggunakan data lokal dan belum memanggil API server sungguhan.

## 5. Teknologi yang Digunakan

- **Docker Compose:** menjalankan lingkungan pengembangan.
- **MySQL:** layanan basis data yang disiapkan untuk pengembangan berikutnya.
- **HTML:** menyusun struktur konten.
- **CSS:** mengatur tampilan dan desain responsif.
- **JavaScript:** mengelola interaksi dan aturan antrean.
- **React:** membangun antarmuka berbasis komponen.
- **Vite:** menjalankan server pengembangan dan proses build.
- **React Router:** mengelola navigasi sisi klien.
- **localStorage:** digunakan oleh lapisan penyimpanan lokal untuk mempertahankan data pada peramban.

## 6. Struktur Arsitektur Saat Minggu 07

```text
Browser
  |
  v
web/index.html
  |
  v
src/main.jsx
  |
  v
BrowserRouter
  |
  v
App.jsx
  |
  +-- HomePage
  +-- TakeQueuePage
  +-- AdminLoginPage
  +-- AdminDashboardPage
  +-- NotFoundPage
  |
  v
useQueue.js
  |
  v
api/queueApi.js
  |
  +-- queue.js
  |     +-- Aturan bisnis antrean
  |
  +-- storage.js
        +-- Penyimpanan lokal
```

Komponen `Layout.jsx` digunakan bersama untuk menyediakan kerangka halaman dan navigasi. `DataState.jsx` digunakan untuk menampilkan status pemuatan data, pesan galat, atau konten halaman.

## 7. Routing

Aplikasi menggunakan empat path utama dan satu rute cadangan:

- `/` — melihat antrean saat ini.
- `/queue` — mengambil nomor antrean.
- `/admin/login` — masuk sebagai petugas.
- `/admin/dashboard` — mengelola antrean.
- `*` — menampilkan halaman NotFound untuk alamat yang tidak terdaftar.

Navigasi dikelola oleh React Router tanpa memuat ulang seluruh dokumen HTML.

## 8. Pengelolaan Data dan Aturan Bisnis

`App.jsx` memanggil `useQueue.js` sebagai pemilik state antrean. Halaman menerima data dan fungsi aksi melalui props sehingga setiap halaman tidak membuat salinan state antrean sendiri.

`queueApi.js` menyediakan operasi untuk:
- Membaca daftar antrean.
- Membuat antrean baru.
- Memanggil antrean berikutnya.
- Menyelesaikan antrean.

Operasi tersebut menggunakan Promise untuk menyimulasikan proses permintaan data.

`queue.js` berisi aturan bisnis, termasuk pembuatan nomor antrean dan perubahan status. `storage.js` menangani pembacaan serta penyimpanan data lokal.

## 9. Status Antrean

Antrean memiliki tiga status utama:

- `WAITING`: antrean sedang menunggu giliran.
- `CALLED`: antrean sedang dipanggil.
- `COMPLETED`: antrean telah selesai.

Sistem memanggil antrean berdasarkan urutan antrean yang menunggu. Petugas tidak memilih antrean secara sembarangan melalui fitur panggil berikutnya.

## 10. Penanganan Kondisi Antarmuka

Pada Minggu 07, antarmuka memiliki tiga kondisi data:

1. **Memuat:** ditampilkan saat data sedang diminta.
2. **Siap:** data berhasil diperoleh dan konten dapat ditampilkan.
3. **Galat:** data gagal dimuat sehingga pesan kesalahan dan tombol coba lagi ditampilkan.

Aksi yang sedang diproses juga menggunakan status sibuk agar tombol terkait tidak mudah ditekan berulang kali.

## 11. Lingkungan Pengembangan

Docker Compose menjalankan layanan web, server, dan MySQL. Layanan web menggunakan Vite untuk pengembangan antarmuka React.

Pada tahap Minggu 07, layanan server dan MySQL sudah disiapkan dalam lingkungan pengembangan, tetapi operasi antrean yang dibahas pada dokumentasi ini masih menggunakan lapisan data lokal. Keduanya belum menjadi backend aktif untuk operasi antrean.

## 12. Batasan Sistem Saat Minggu 07

- Belum menggunakan API server sungguhan untuk operasi antrean.
- Data antrean belum disimpan dalam database terpusat.
- Data lokal tidak otomatis tersinkronisasi antarperangkat.
- Login petugas masih berupa simulasi.
- Belum tersedia autentikasi dan otorisasi pengguna sungguhan.

Batasan tersebut menjadi bagian dari ruang lingkup pengembangan bertahap QueueApp.