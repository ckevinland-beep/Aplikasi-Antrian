
# QueueApp Milestone Tracker

Dokumen ini mencatat perkembangan QueueApp berdasarkan modul praktikum Minggu 01 sampai Minggu 06.

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

- Web: http://localhost:5173/
- Server: http://localhost:3001/
- MySQL: port host 3307

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

Periksa `docs/requirements.md`, `PRD.md`, dan berkas perancangan yang diwajibkan modul Minggu 02.

### Hasil

Bagian ini harus diperbarui berdasarkan berkas dan checkpoint Week 02 yang benar-benar tersedia di repository.

## Week 03 — UI/UX + HTML

### Status

- [x] Struktur halaman antrean dibuat.
- [x] Halaman pengambilan nomor dibuat.
- [x] Halaman login petugas dibuat.
- [x] Dashboard petugas dibuat.
- [x] Alur pengguna pelanggan dan petugas dirancang.
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
- [x] Tampilan halaman pelanggan diperbaiki.
- [x] Tampilan formulir login diperbaiki.
- [x] Tampilan dashboard petugas diperbaiki.
- [x] Layout responsif diterapkan.
- [x] Tampilan diuji pada ukuran layar yang berbeda.
- [x] Perubahan disimpan dan digabungkan melalui Pull Request.

### Berkas Utama

- `web/css/style.css`
- Empat halaman HTML di dalam folder `web/`
- `docs/ui-flow.md`

### Hasil

Halaman aplikasi memiliki styling dan layout responsif sebagai dasar penambahan interaksi.

## Week 05 — JavaScript Foundation

### Status

- [x] Logika antrean dibuat.
- [x] Pengambilan nomor antrean diterapkan.
- [x] Pemanggilan antrean diterapkan.
- [x] Penyelesaian antrean diterapkan.
- [x] Data antrean disimpan di LocalStorage.
- [x] Halaman pelanggan dan petugas dihubungkan dengan logika JavaScript.
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

Prototipe antrean interaktif dapat digunakan dan data antrean dapat bertahan setelah halaman dimuat ulang melalui LocalStorage.

## Week 06 — React + Vite

### Status

- [x] React dan Vite dikonfigurasi.
- [x] Dependency dan `package-lock.json` dibuat.
- [x] Empat halaman HTML menggunakan entry React.
- [x] Logika antrean dipisahkan ke `src/queue.js`.
- [x] Penyimpanan data dipisahkan ke `src/storage.js`.
- [x] Hook antrean disiapkan di `src/useQueue.js`.
- [x] Komponen dan halaman React dibuat.
- [x] Stylesheet dipindahkan ke `src/styles/style.css`.
- [x] Entry point React dibuat untuk empat halaman.
- [x] Konfigurasi Docker Compose diperbarui untuk Vite.
- [x] Build produksi berhasil.
- [x] Empat halaman diuji melalui browser.
- [x] Alur antrean dasar diuji melalui Docker.

### Berkas Utama

- `web/package.json`
- `web/package-lock.json`
- `web/vite.config.js`
- `web/src/`
- `web/index.html`
- `web/take-queue.html`
- `web/admin-login.html`
- `web/admin-dashboard.html`
- `docker-compose.yml`

### Verifikasi

- [x] `npm.cmd run build` berhasil.
- [x] Halaman antrean dapat dibuka.
- [x] Halaman pengambilan nomor dapat dibuka.
- [x] Halaman login petugas dapat dibuka.
- [x] Dashboard petugas dapat dibuka.
- [x] Alur antrean dasar diuji melalui Docker.

### Hasil

Frontend QueueApp telah dimigrasikan ke React dan Vite. Empat halaman tetap tersedia, sementara data antrean masih menggunakan LocalStorage dan belum terhubung ke API atau database.

## Ringkasan Week 01–06

| Minggu | Materi | Status |
|---|---|---|
| Week 01 | Discovery & Environment | Selesai |
| Week 02 | Requirements & Perancangan | Perlu verifikasi |
| Week 03 | UI/UX + HTML | Selesai |
| Week 04 | CSS & Responsive Design | Selesai |
| Week 05 | JavaScript Foundation | Selesai |
| Week 06 | React + Vite | Selesai |

## Catatan

Status di atas mencerminkan pekerjaan yang diketahui telah dilakukan. Bagian Week 02 dan keberadaan tag `week-02` perlu diperiksa sebelum tracker dianggap final. Jangan menandai checkpoint atau pengujian yang belum benar-benar dilakukan.
