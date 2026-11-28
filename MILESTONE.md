# QueueApp Milestone Tracker

Dokumen ini mencatat perkembangan QueueApp berdasarkan tahapan praktikum Minggu 01 sampai Minggu 11. Status setiap milestone disesuaikan dengan implementasi, pengujian, dan hasil verifikasi yang telah dilakukan.

## Week 01 — Discovery & Environment

### Status

- [x] Repository Git disiapkan.
- [x] File `.gitignore` dibuat.
- [x] File `.env.example` dibuat.
- [x] File `docker-compose.yml` dibuat.
- [x] Layanan MySQL dikonfigurasi.
- [x] Server placeholder disiapkan.
- [x] Web placeholder disiapkan.
- [x] `docs/requirements.md` dibuat.
- [x] `PRD.md` dibuat.
- [x] `MILESTONE.md` dibuat.
- [x] Lingkungan Docker Compose diuji.

### Verifikasi

- Web: `http://localhost:5173/`
- Server: `http://localhost:3001/`
- MySQL: port host `3307`

### Hasil

Lingkungan pengembangan awal berhasil dijalankan menggunakan Docker Compose.

## Week 02 — Requirements & Perancangan

### Status

- [ ] Kebutuhan aplikasi diperinci sesuai modul Minggu 02.
- [ ] User story dan kebutuhan fungsional diperiksa.
- [ ] Arsitektur sistem diperinci.
- [ ] Hasil pekerjaan dibandingkan dengan checkpoint modul.
- [ ] Tag `week-02` diverifikasi.

### Verifikasi

Periksa `docs/requirements.md`, `PRD.md`, serta berkas perancangan yang diwajibkan modul Minggu 02.

### Hasil

Bagian ini masih memerlukan pemeriksaan terhadap berkas dan checkpoint Week 02 yang tersedia di repository.

## Week 03 — UI/UX + HTML

### Status

- [x] Struktur halaman antrean dibuat.
- [x] Halaman pengambilan nomor dibuat.
- [x] Halaman login petugas dibuat.
- [x] Dashboard petugas dibuat.
- [x] Alur pengguna pengunjung dan petugas dirancang.
- [x] Struktur HTML dasar disiapkan.
- [x] Hasil pekerjaan disimpan dalam Git.

### Berkas Utama

- `web/index.html`
- `web/take-queue.html`
- `web/admin-login.html`
- `web/admin-dashboard.html`
- `docs/ui-flow.md`

### Hasil

Empat halaman dasar aplikasi tersedia untuk dilanjutkan ke tahap styling.

## Week 04 — CSS & Responsive Design

### Status

- [x] Stylesheet utama dibuat.
- [x] Tampilan halaman pengunjung diperbaiki.
- [x] Tampilan formulir login diperbaiki.
- [x] Tampilan dashboard petugas diperbaiki.
- [x] Layout responsif diterapkan.
- [x] Tampilan diuji pada ukuran layar yang berbeda.
- [x] Perubahan disimpan dan digabungkan melalui Pull Request.

### Berkas Utama

- `web/src/styles/style.css`
- `web/src/pages/`
- `web/src/components/`
- `docs/ui-flow.md`

### Hasil

Halaman aplikasi memiliki styling dan layout responsif sebagai dasar penambahan interaksi.

## Week 05 — JavaScript Foundation

### Status

- [x] Logika antrean dibuat.
- [x] Pengambilan nomor antrean diterapkan.
- [x] Pemanggilan antrean diterapkan.
- [x] Penyelesaian antrean diterapkan.
- [x] Data antrean disimpan di `localStorage`.
- [x] Halaman pengunjung dan petugas dihubungkan dengan logika JavaScript.
- [x] Alur antrean dasar diuji.
- [x] Perubahan disimpan melalui Git dan Pull Request.

### Berkas Utama

- `web/js/queue.js`
- `web/js/format.js`
- `web/js/home.js`
- `web/js/take-queue.js`
- `web/js/admin-login.js`
- `web/js/admin-dashboard.js`

### Hasil

Prototipe antrean interaktif dapat digunakan dan data antrean dapat bertahan setelah halaman dimuat ulang melalui `localStorage`.

## Week 06 — React + Vite

### Status

- [x] React dan Vite dikonfigurasi.
- [x] Dependency dan `package-lock.json` dibuat.
- [x] Logika antrean dipisahkan ke `src/queue.js`.
- [x] Penyimpanan data dipisahkan ke `src/storage.js`.
- [x] Hook antrean disiapkan di `src/useQueue.js`.
- [x] Komponen dan halaman React dibuat.
- [x] Stylesheet dipindahkan ke `src/styles/style.css`.
- [x] Entry point React disiapkan.
- [x] Konfigurasi Docker Compose diperbarui untuk Vite.
- [x] Build produksi berhasil pada tahap Week 06.
- [x] Halaman dan alur antrean dasar diuji melalui Docker.
- [x] Struktur frontend dikembangkan lebih lanjut pada Week 07 menggunakan React Router.

### Berkas Utama

- `web/package.json`
- `web/package-lock.json`
- `web/vite.config.js`
- `web/src/`
- `web/index.html`
- `docker-compose.yml`

### Verifikasi

- [x] `npm.cmd run build` berhasil pada tahap Week 06.
- [x] Halaman dan alur antrean dasar diuji pada tahap Week 06.

### Hasil

Frontend QueueApp telah dimigrasikan ke React dan Vite. Pada tahap Week 06, aplikasi menggunakan beberapa entry HTML. Struktur tersebut kemudian dikembangkan pada Week 07 menjadi satu `index.html` dengan React Router.

## Week 07 — React Integration & Routing

### Status Implementasi

- [x] React Router ditambahkan sebagai dependency.
- [x] Aplikasi menggunakan satu dokumen HTML sebagai entry point.
- [x] Routing sisi klien disiapkan untuk halaman utama.
- [x] Routing halaman pengambilan nomor antrean disiapkan.
- [x] Routing halaman login petugas disiapkan.
- [x] Routing dashboard petugas disiapkan.
- [x] Halaman Not Found disiapkan untuk alamat yang tidak terdaftar.
- [x] Pengelolaan state antrean dipusatkan melalui `App.jsx` dan `useQueue.js`.
- [x] Lapisan data berbasis Promise disiapkan melalui `queueApi.js`.
- [x] Komponen loading dan error disiapkan melalui `DataState.jsx`.

### Berkas Utama

- `web/index.html`
- `web/vite.config.js`
- `web/src/main.jsx`
- `web/src/App.jsx`
- `web/src/useQueue.js`
- `web/src/api/queueApi.js`
- `web/src/components/`
- `web/src/pages/`
- `web/src/styles/style.css`
- `docker-compose.yml`

### Verifikasi Lanjutan

- [x] Path routing diperiksa melalui browser.
- [x] Navigasi antarhalaman diperiksa.
- [x] Keadaan loading dan error diperiksa.
- [x] Pengambilan, pemanggilan, dan penyelesaian antrean diperiksa.
- [x] Data antrean diperiksa setelah halaman dimuat ulang.

### Hasil

QueueApp menggunakan React Router untuk mengelola perpindahan halaman melalui satu dokumen HTML. Pengelolaan state antrean dipusatkan di React, sedangkan lapisan data menggunakan Promise untuk mengelola operasi data. Data masih dikelola secara lokal dan belum menggunakan API server sungguhan maupun database terpusat.

## Week 08 — UTS / Web MVP

### Status Implementasi

- [x] Perbaikan aturan pemanggilan antrean diterapkan pada logika antrean.
- [x] Satu tindakan pemanggilan hanya memanggil satu antrean.
- [x] Antarmuka petugas disesuaikan agar pemanggilan berikutnya tidak tersedia ketika masih ada antrean berstatus `CALLED`.
- [x] Penanganan penyegaran data diperbaiki agar kegagalan mengambil daftar terbaru tidak otomatis membuat tindakan sebelumnya dilaporkan gagal.
- [x] Versi aplikasi frontend diperbarui menjadi `0.8.0`.
- [x] Dokumentasi alur antarmuka diperbarui.
- [x] Dokumentasi arsitektur diperbarui.
- [x] README diperbarui.
- [x] Milestone tracker diperbarui.

### Verifikasi Pengujian

- [x] Pengunjung dapat membuka halaman utama dan halaman antrean.
- [x] Nomor antrean dapat diambil dan statusnya dapat dilihat.
- [x] Formulir login memeriksa kelengkapan isian.
- [x] Formulir login menolak format email yang tidak valid.
- [x] Formulir login dengan isian yang valid dapat melanjutkan ke dashboard; autentikasi sungguhan belum diterapkan.
- [x] Petugas dapat memanggil antrean berikutnya.
- [x] Pemanggilan berikutnya dinonaktifkan ketika antrean masih berstatus `CALLED`.
- [x] Antrean dapat diselesaikan.
- [x] Navigasi kembali dan halaman Not Found diperiksa.
- [x] Data antrean tetap tersedia setelah halaman dimuat ulang.
- [x] Simulasi kegagalan pemuatan data menampilkan pesan galat dan tombol coba lagi.
- [x] Flag simulasi kegagalan dikembalikan ke `false` setelah pengujian.

### Fokus Pemeriksaan

- Aturan FR-06: pemanggilan antrean berikutnya tidak boleh dilakukan selama masih ada antrean yang berstatus dipanggil.
- Satu tindakan pemanggilan hanya boleh mengubah satu antrean.
- Kegagalan penyegaran daftar tidak boleh mengubah hasil tindakan sebelumnya yang sudah berhasil.
- Navigasi, keadaan loading, galat, dan data antrean diperiksa melalui skenario demo.
- Data antrean masih disimpan pada `localStorage` di browser.

### Verifikasi Akhir

- [x] Build produksi diperiksa kembali setelah seluruh perubahan Week 08.
- [x] Perubahan Week 08 disimpan dalam Git.
- [x] Tag `week-08` berhasil dibuat dan di-push ke repository.
- [x] Pengembangan berikutnya dimulai dari branch baru berdasarkan `main`.

### Hasil

Pengujian demo Week 08 telah diselesaikan. Implementasi Web MVP dan dokumentasi telah diperbarui. Tag `week-08` telah dibuat dan di-push sebagai penanda checkpoint UTS.

## Week 09 — Node.js + Express

### Status Implementasi

- [x] Project backend Node.js disiapkan pada folder `server`.
- [x] Express ditambahkan sebagai dependency backend.
- [x] Konfigurasi server disiapkan melalui `server/src/config/index.js`.
- [x] Aplikasi Express disiapkan melalui `server/src/app.js`.
- [x] Server dijalankan melalui `server/src/server.js`.
- [x] Lapisan routes, controllers, dan services dipisahkan.
- [x] Middleware request logger ditambahkan.
- [x] Middleware validasi query antrean ditambahkan.
- [x] Middleware not found ditambahkan.
- [x] Error handler terpusat ditambahkan.
- [x] Format galat API diseragamkan melalui `apiError.js`.
- [x] Endpoint `GET /api/health` dibuat.
- [x] Endpoint `GET /api/queues` dibuat.
- [x] Filter antrean berdasarkan status `WAITING`, `CALLED`, dan `COMPLETED` diterapkan.
- [x] Data mock antrean disiapkan di memori server.
- [x] Server berhasil dijalankan melalui Docker Compose.

### Berkas Utama

- `server/package.json`
- `server/package-lock.json`
- `server/src/apiError.js`
- `server/src/app.js`
- `server/src/server.js`
- `server/src/config/index.js`
- `server/src/controllers/healthController.js`
- `server/src/controllers/queueController.js`
- `server/src/middleware/errorHandler.js`
- `server/src/middleware/notFound.js`
- `server/src/middleware/requestLogger.js`
- `server/src/middleware/validateQueueQuery.js`
- `server/src/routes/healthRoutes.js`
- `server/src/routes/index.js`
- `server/src/routes/queueRoutes.js`
- `server/src/services/queueService.js`
- `docker-compose.yml`

### Hasil

Backend QueueApp berhasil dikembangkan menggunakan Node.js dan Express. Server menyediakan endpoint health check dan daftar antrean dengan dukungan filter status. Middleware dan error handler diterapkan untuk menjaga konsistensi penanganan request dan respons API.

Pada tahap ini, data antrean backend masih menggunakan data mock di memori server dan frontend masih menggunakan penyimpanan lokal. Tahap berikutnya melanjutkan pengembangan dengan integrasi database MySQL.

Implementasi Week 09 telah diselesaikan dan digabungkan ke jalur pengembangan utama sebelum pengerjaan Week 10.

## Week 10 — MySQL Database Integration

### Status Implementasi

- [x] Integrasi database MySQL dikembangkan pada backend QueueApp.
- [x] Struktur database antrean disiapkan.
- [x] Backend dikembangkan agar menggunakan database MySQL untuk penyimpanan data antrean.
- [x] Implementasi Week 10 diselesaikan.
- [x] Perubahan Week 10 digabungkan melalui Pull Request #9.
- [x] Tag `week-10` dibuat sebagai penanda checkpoint.

### Hasil

Week 10 melanjutkan backend Express dari Week 09 dengan integrasi database MySQL. Penyimpanan data antrean dikembangkan dari data mock di memori server menjadi penyimpanan database terpusat.

Perubahan Week 10 telah digabungkan melalui Pull Request #9 dan tag `week-10` telah dibuat.

## Week 11 — REST API

### Status Implementasi Backend

- [x] Koneksi database dikembangkan menggunakan MySQL connection pool.
- [x] Middleware validasi antrean dibuat melalui `validateQueue.js`.
- [x] Validasi ID antrean diterapkan.
- [x] Validasi query status diterapkan.
- [x] Validasi request body untuk perubahan status diterapkan.
- [x] Aturan perpindahan status antrean diterapkan pada service.
- [x] Controller antrean dihubungkan dengan service database.
- [x] Endpoint GET daftar antrean diterapkan.
- [x] Endpoint POST pembuatan antrean diterapkan.
- [x] Endpoint GET detail antrean diterapkan.
- [x] Endpoint PATCH perubahan status diterapkan.
- [x] Endpoint DELETE penghapusan antrean diterapkan.
- [x] Endpoint POST pemanggilan antrean berikutnya diterapkan.
- [x] Endpoint POST penyelesaian antrean diterapkan.
- [x] Endpoint GET health check tetap tersedia.
- [x] Format respons sukses dan error diseragamkan.
- [x] Konfigurasi CORS diterapkan menggunakan variabel `WEB_ORIGIN`.

### Status Implementasi Frontend

- [x] `queueApi.js` dihubungkan dengan REST API backend.
- [x] Operasi pengambilan daftar antrean menggunakan API.
- [x] Operasi pembuatan antrean menggunakan API.
- [x] Operasi pemanggilan antrean berikutnya menggunakan API.
- [x] Operasi penyelesaian antrean menggunakan API.
- [x] Penyimpanan daftar antrean lokal di browser tidak lagi digunakan sebagai sumber data utama.
- [x] `localStorage` digunakan untuk menyimpan ID antrean milik pengunjung.
- [x] `queue.js` disesuaikan menjadi kumpulan helper untuk membaca dan mengolah data antrean.
- [x] Catatan footer lima halaman diperbarui menjadi Minggu 11.

### Dokumentasi

- [x] `docs/api.md` dibuat dan disimpan.
- [x] README diperbarui untuk menjelaskan implementasi Week 11.
- [x] `docs/architecture.md` diperbarui sesuai arsitektur Week 11.
- [x] `MILESTONE.md` diperiksa kembali setelah seluruh pekerjaan dokumentasi selesai.

### Verifikasi Pengujian

- [x] Konfigurasi Docker Compose berhasil diperiksa menggunakan `docker compose config --quiet`.
- [x] Konfigurasi `WEB_ORIGIN` berhasil dibaca oleh backend.
- [x] Endpoint health check berhasil diakses.
- [x] Endpoint daftar antrean berhasil mengembalikan data dari backend.
- [x] Respons CORS untuk origin `http://localhost:5173` berhasil diperiksa.
- [x] Pemeriksaan sintaks seluruh file JavaScript pada `server/src` berhasil.
- [x] Pemeriksaan sintaks `web/src/api/queueApi.js` berhasil.
- [x] Build frontend berhasil dijalankan menggunakan `npm run build`.
- [x] `git diff --check` tidak menemukan kesalahan whitespace.
- [x] Endpoint diperiksa melalui skenario sukses dan gagal yang relevan, termasuk health check, daftar, pembuatan, detail, perubahan status, penyelesaian, penghapusan, dan penolakan pemanggilan berikutnya ketika masih ada antrean `CALLED`.
- [x] Halaman utama, pengambilan antrean, login petugas, dan dashboard diperiksa melalui browser.

### Batasan Implementasi

- Autentikasi petugas belum diterapkan.
- JWT belum diterapkan.
- Formulir login masih berupa simulasi validasi dan navigasi.
- Frontend menggunakan REST API untuk operasi antrean yang tersedia pada antarmuka saat ini.
- Endpoint detail, PATCH, dan DELETE tersedia pada backend meskipun belum menjadi operasi utama yang digunakan antarmuka frontend.
- Jalur sukses endpoint pemanggilan antrean berikutnya belum diuji secara terpisah untuk menghindari perubahan data antrean lain selama pengujian.

### Hasil

Pada Week 11, QueueApp telah dikembangkan menjadi aplikasi dengan frontend React yang terhubung ke backend REST API menggunakan database MySQL.

Backend menyediakan delapan endpoint yang mencakup health check dan pengelolaan antrean. Koneksi database menggunakan MySQL connection pool, validasi request diterapkan melalui middleware, dan aturan perubahan status dikelola pada service.

Konfigurasi CORS membatasi origin frontend melalui variabel lingkungan `WEB_ORIGIN`. Frontend menggunakan REST API untuk membaca, membuat, memanggil, dan menyelesaikan antrean. `localStorage` hanya digunakan untuk menyimpan ID antrean milik pengunjung, bukan sebagai penyimpanan utama daftar antrean.

Dokumentasi kontrak API, README, dokumentasi arsitektur, dan milestone telah diperbarui. Pengujian API dan pemeriksaan halaman frontend telah dilakukan. Jalur sukses endpoint pemanggilan antrean berikutnya belum diuji secara terpisah untuk menghindari perubahan data antrean lain selama pengujian.

## Ringkasan Week 01–11

| Minggu | Materi | Status |
|---|---|---|
| Week 01 | Discovery & Environment | Selesai |
| Week 02 | Requirements & Perancangan | Perlu verifikasi |
| Week 03 | UI/UX + HTML | Selesai |
| Week 04 | CSS & Responsive Design | Selesai |
| Week 05 | JavaScript Foundation | Selesai |
| Week 06 | React + Vite | Implementasi dan pengujian selesai |
| Week 07 | React Integration & Routing | Implementasi dan pengujian demo selesai |
| Week 08 | UTS / Web MVP | Implementasi dan pengujian selesai; tag berhasil di-push |
| Week 09 | Node.js + Express | Implementasi selesai dan digabungkan |
| Week 10 | MySQL Database Integration | Selesai; PR #9 digabungkan dan tag `week-10` dibuat |
| Week 11 | REST API | Implementasi, dokumentasi, dan pengujian utama selesai |

## Catatan

Checklist implementasi, pengujian, dan verifikasi Git dibedakan agar dokumentasi tidak menyatakan checkpoint selesai sebelum seluruh pemeriksaan akhir dilakukan.

Week 02 dan keberadaan tag `week-02` masih perlu diperiksa pada repository.

Pada Week 08, QueueApp masih merupakan Web MVP berbasis frontend. Data antrean belum terhubung dengan API backend maupun database terpusat. Formulir login petugas belum menerapkan autentikasi sungguhan.

Pada Week 09, backend Express dikembangkan dengan data mock di memori server. Pada Week 10, penyimpanan antrean dilanjutkan menggunakan database MySQL.

Pada Week 11, frontend dan backend telah dihubungkan melalui REST API. Data antrean disimpan pada MySQL, sedangkan ID antrean pengunjung disimpan secara lokal menggunakan `localStorage`.

Autentikasi petugas dan JWT belum diterapkan. Jalur sukses pemanggilan antrean berikutnya belum diuji secara terpisah. Pemeriksaan akhir Git, commit, push, dan Pull Request Week 11 masih perlu diselesaikan.