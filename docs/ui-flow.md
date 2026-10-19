# QueueApp — UI Flow Documentation

## 1. Gambaran Umum

Dokumen ini menjelaskan alur antarmuka dan interaksi pengguna pada QueueApp sejak rancangan awal hingga integrasi React Router pada Minggu 07.

Aplikasi memiliki dua peran utama, yaitu pengunjung dan petugas. Pengunjung menggunakan aplikasi untuk melihat serta mengambil nomor antrean, sedangkan petugas mengelola antrean melalui dashboard.

## 2. Perkembangan Antarmuka Minggu 01–07

### Minggu 01 — Discovery & Environment

Tahap awal berfokus pada persiapan lingkungan pengembangan dan pengujian halaman placeholder. Alur pengguna belum diimplementasikan.

### Minggu 02 — Requirements & System Design

Kebutuhan pengguna dan fitur utama ditetapkan sebagai dasar pembuatan halaman. Dua peran yang digunakan adalah pengunjung dan petugas.

### Minggu 03 — UI/UX & HTML

Empat halaman awal disusun menggunakan HTML semantik:

1. Antrean Saat Ini.
2. Ambil Nomor Antrean.
3. Masuk sebagai Petugas.
4. Dashboard Petugas.

Pada tahap ini, struktur antarmuka sudah dibuat, tetapi belum memiliki CSS dan perilaku JavaScript.

### Minggu 04 — CSS & Responsive Design

Tampilan keempat halaman ditata menggunakan CSS dengan pendekatan mobile-first. Navigasi, formulir, tombol, dan tabel disesuaikan agar lebih nyaman digunakan pada ukuran layar berbeda.

### Minggu 05 — JavaScript

Interaksi mulai diterapkan. Pengunjung dapat mengambil nomor antrean, sedangkan petugas dapat memanggil dan menyelesaikan antrean. Validasi formulir dan perubahan tampilan berdasarkan status antrean juga ditambahkan.

### Minggu 06 — React + Vite

Antarmuka mulai disusun menggunakan React. Komponen dan halaman dipisahkan agar lebih mudah digunakan kembali dan dirawat.

### Minggu 07 — React Integration & Routing

Navigasi dipindahkan ke React Router. Aplikasi menggunakan satu dokumen HTML dengan empat path utama dan satu halaman NotFound. Data antrean dikelola melalui satu pemilik state dan lapisan data berbasis Promise.

## 3. Alur Pengunjung — Melihat Antrean

1. Pengunjung membuka halaman utama (`/`).
2. Sistem memuat data antrean.
3. Sistem menampilkan nomor yang sedang dipanggil dan antrean yang masih menunggu.
4. Jika data gagal dimuat, sistem menampilkan pesan kesalahan dan tombol untuk mencoba kembali.
5. Pengunjung dapat berpindah ke halaman pengambilan nomor melalui navigasi.

## 4. Alur Pengunjung — Mengambil Nomor

1. Pengunjung membuka halaman `/queue`.
2. Sistem menampilkan data antrean dan formulir pengambilan nomor.
3. Pengunjung menekan tombol **Ambil Nomor Antrean**.
4. Sistem memproses permintaan melalui lapisan data berbasis Promise.
5. Jika berhasil, nomor antrean baru ditambahkan ke daftar dan status nomor milik pengunjung ditampilkan.
6. Tombol dinonaktifkan sementara ketika permintaan sedang diproses.
7. Jika terjadi kesalahan, sistem menampilkan pesan kesalahan agar pengguna mengetahui bahwa permintaan belum berhasil.

## 5. Alur Petugas — Login

1. Petugas membuka halaman `/admin/login`.
2. Petugas memasukkan email dan kata sandi.
3. Sistem memeriksa apakah kolom wajib telah diisi.
4. Jika kolom belum lengkap, pesan validasi ditampilkan.
5. Jika input memenuhi pemeriksaan dasar, sistem mengarahkan pengguna ke `/admin/dashboard`.

**Catatan:** Login masih berupa simulasi. Pengisian email dan kata sandi belum memverifikasi identitas melalui server.

## 6. Alur Petugas — Dashboard

1. Petugas membuka dashboard melalui halaman login atau navigasi.
2. Sistem memuat data antrean.
3. Dashboard menampilkan ringkasan jumlah antrean menunggu, sedang dipanggil, selesai, dan total antrean.
4. Dashboard menampilkan antrean yang sedang dipanggil serta antrean berikutnya.
5. Petugas dapat memilih aksi panggil berikutnya atau menyelesaikan antrean yang sedang dipanggil.
6. Sistem memperbarui data dan menampilkan hasil perubahan pada dashboard.
7. Jika data gagal dimuat, sistem menampilkan pesan kesalahan dan tombol coba lagi.

## 7. Alur Memanggil Antrean Berikutnya

1. Petugas membuka dashboard.
2. Sistem mencari antrean berstatus `WAITING` yang berada paling awal dalam urutan antrean.
3. Petugas menekan tombol **Panggil Antrean Berikutnya**.
4. Sistem mengubah status antrean tersebut menjadi `CALLED`.
5. Jika terdapat antrean lain yang sebelumnya berstatus `CALLED`, antrean tersebut diselesaikan sesuai aturan bisnis yang diterapkan.
6. Dashboard memperbarui ringkasan dan daftar antrean.

Jika tidak ada antrean yang menunggu, sistem tidak melakukan perubahan dan menampilkan pesan bahwa tidak ada antrean yang menunggu.

## 8. Alur Menyelesaikan Antrean

1. Petugas melihat daftar antrean aktif pada dashboard.
2. Petugas menekan tombol **Selesaikan** pada antrean yang sedang dipanggil.
3. Sistem memeriksa apakah perubahan status diperbolehkan.
4. Jika valid, status antrean berubah menjadi `COMPLETED`.
5. Data diperbarui dan dashboard menampilkan kondisi terbaru.

Antrean yang telah selesai tidak lagi ditampilkan sebagai antrean aktif pada tabel petugas.

## 9. Status Antrean

QueueApp menggunakan tiga status utama:

- `WAITING` — antrean menunggu giliran.
- `CALLED` — antrean sedang dipanggil.
- `COMPLETED` — antrean telah selesai.

Perubahan status mengikuti aturan bisnis pada modul antrean, bukan ditentukan secara bebas oleh halaman.

## 10. Navigasi Minggu 07

Aplikasi memiliki path berikut:

- `/` — Antrean Saat Ini.
- `/queue` — Ambil Nomor Antrean.
- `/admin/login` — Masuk sebagai Petugas.
- `/admin/dashboard` — Dashboard Petugas.
- `*` — NotFound untuk alamat yang tidak terdaftar.

Perpindahan halaman dilakukan menggunakan React Router sehingga dokumen HTML tidak perlu dimuat ulang setiap kali pengguna berpindah halaman.

Navigasi menggunakan layout bersama agar identitas aplikasi, menu, judul halaman, dan bagian footer tetap konsisten.

## 11. Kondisi Antarmuka

Saat mengambil data, aplikasi menampilkan salah satu kondisi berikut:

- **Memuat:** sistem sedang mengambil data.
- **Siap:** data berhasil dimuat dan konten ditampilkan.
- **Galat:** data gagal dimuat, disertai pesan kesalahan dan tombol coba lagi.

Ketika aksi sedang diproses, tombol terkait dapat dinonaktifkan untuk mengurangi risiko pengiriman aksi berulang.

## 12. Responsivitas dan Aksesibilitas

Antarmuka dikembangkan dengan pendekatan mobile-first. Navigasi dapat membungkus ke baris berikutnya, tabel antrean dapat digulir secara horizontal ketika ruang layar terbatas, dan formulir menggunakan label yang terhubung dengan input.

Struktur halaman menggunakan elemen HTML semantik, judul yang jelas, serta indikator fokus untuk membantu navigasi menggunakan papan ketik.

## 13. Batasan Alur Saat Ini

- Data antrean masih dikelola melalui lapisan data simulasi di sisi klien.
- Perubahan data belum tersinkronisasi secara terpusat antarperangkat.
- Login belum menggunakan autentikasi sungguhan.
- Belum ada API server aktif yang menangani operasi antrean.
- Halaman NotFound hanya menangani alamat yang tidak terdaftar dalam konfigurasi routing aplikasi.

Dokumentasi ini menggambarkan alur QueueApp hingga Minggu 07. Fitur tambahan akan mengikuti kebutuhan pada modul praktikum berikutnya.