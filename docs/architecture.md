# QueueApp — Architecture Documentation

## 1. Gambaran Umum

QueueApp adalah aplikasi antrean sederhana yang dikembangkan sebagai proyek praktikum mata kuliah Web and Mobile Technology. Aplikasi ini membantu pengunjung mengambil nomor antrean dan melihat status antrean, sedangkan petugas dapat memantau, memanggil, dan menyelesaikan antrean.

Pengembangan QueueApp dilakukan secara bertahap, mulai dari persiapan lingkungan, perancangan kebutuhan, pembuatan antarmuka, pengembangan frontend menggunakan React, hingga pembangunan backend dan integrasi database.

Pada Week 09, backend mulai dikembangkan menggunakan Node.js dan Express. Pada Week 10, backend diintegrasikan dengan database MySQL. Selanjutnya, pada Week 11, frontend React dihubungkan dengan backend melalui REST API.

Arsitektur saat ini menggunakan tiga layanan utama yang dijalankan melalui Docker Compose:

- **Web:** frontend React dan Vite.
- **Server:** backend Node.js dan Express.
- **MySQL:** database untuk menyimpan data antrean.

Frontend berkomunikasi dengan backend melalui HTTP request. Backend memproses permintaan, menjalankan aturan bisnis, dan mengakses database MySQL untuk membaca maupun mengubah data antrean.

## 2. Tujuan Sistem

QueueApp dikembangkan untuk:

1. Memudahkan pengunjung mengambil nomor antrean.
2. Menampilkan antrean yang sedang dipanggil dan masih menunggu.
3. Membantu petugas mengelola antrean melalui dashboard.
4. Menyediakan antarmuka yang dapat digunakan pada berbagai ukuran layar.
5. Menerapkan pengembangan aplikasi secara bertahap dengan struktur kode yang terorganisasi.
6. Menyediakan backend REST API untuk komunikasi antara frontend dan database.
7. Menyimpan data antrean secara terpusat menggunakan MySQL.

## 3. Peran Pengguna

### 3.1 Pengunjung

Pengunjung dapat:

- Melihat antrean yang sedang dipanggil.
- Melihat daftar antrean yang menunggu.
- Mengambil nomor antrean baru.
- Melihat status nomor antrean yang diambil.

ID antrean milik pengunjung disimpan pada `localStorage` agar dapat dikenali kembali ketika halaman dimuat ulang pada browser yang sama.

### 3.2 Petugas

Petugas dapat:

- Membuka halaman login.
- Mengakses dashboard melalui simulasi login.
- Melihat ringkasan dan daftar antrean.
- Memanggil antrean berikutnya sesuai urutan.
- Menyelesaikan antrean yang sedang dipanggil.

Login pada tahap ini masih berupa simulasi validasi formulir dan navigasi. Autentikasi sungguhan, otorisasi pengguna, dan JWT belum diterapkan.

## 4. Perkembangan Arsitektur Week 01–11

### 4.1 Week 01 — Discovery & Environment

Tahap pertama berfokus pada persiapan lingkungan pengembangan. Docker Compose digunakan untuk menjalankan tiga layanan utama:

- **Web:** menyediakan antarmuka aplikasi.
- **Server:** disiapkan sebagai layanan backend.
- **MySQL:** disiapkan sebagai layanan database.

Pada tahap awal, aplikasi masih berupa placeholder. Tujuannya adalah memastikan lingkungan pengembangan berjalan sebelum fitur aplikasi dibangun.

### 4.2 Week 02 — Requirements & System Design

Tahap ini berfokus pada pendefinisian masalah, kebutuhan pengguna, ruang lingkup aplikasi, dan rancangan awal sistem.

Dokumentasi kebutuhan menjadi dasar untuk menentukan fitur, peran pengguna, batas MVP, serta fitur yang belum dikerjakan pada tahap awal.

### 4.3 Week 03 — UI/UX & HTML

Struktur antarmuka dibuat menggunakan HTML semantik dengan empat halaman awal:

- `index.html` — Antrean Saat Ini.
- `take-queue.html` — Ambil Nomor Antrean.
- `admin-login.html` — Login Petugas.
- `admin-dashboard.html` — Dashboard Petugas.

Tahap ini berfokus pada struktur konten, label formulir, tabel, navigasi, dan aksesibilitas dasar.

### 4.4 Week 04 — CSS & Responsive Design

CSS ditambahkan untuk membentuk tampilan aplikasi yang lebih teratur dan responsif.

Pendekatan mobile-first digunakan agar antarmuka dapat digunakan pada layar kecil maupun besar. Komponen seperti formulir, tombol, navigasi, dan tabel disesuaikan agar lebih mudah digunakan.

### 4.5 Week 05 — JavaScript

JavaScript ditambahkan untuk menangani perilaku interaktif aplikasi, termasuk pengambilan nomor, perubahan status antrean, validasi formulir, dan interaksi dashboard.

Logika antrean dipisahkan dari kode tampilan agar aturan bisnis dapat digunakan kembali dan lebih mudah dirawat.

### 4.6 Week 06 — React + Vite

Antarmuka mulai diintegrasikan menggunakan React dan Vite. Komponen dan halaman disusun menjadi bagian-bagian yang lebih mudah digunakan kembali.

Pengelolaan data antrean menggunakan fungsi dan hook agar perubahan data dapat ditampilkan kembali pada antarmuka.

### 4.7 Week 07 — React Integration & Routing

Aplikasi menggunakan satu dokumen HTML dan React Router untuk berpindah halaman tanpa memuat ulang seluruh dokumen.

`App.jsx` menjadi pemilik utama state antrean melalui `useQueue.js`. Lapisan data pada `api/queueApi.js` menyediakan operasi berbasis Promise, sedangkan `DataState.jsx` menangani keadaan memuat dan galat.

Pada tahap ini, operasi data masih menggunakan penyimpanan lokal dan belum memanggil REST API sungguhan.

### 4.8 Week 08 — UTS / Web MVP Checkpoint

Checkpoint Week 08 menyempurnakan alur utama Web MVP dan aturan pemanggilan antrean.

Pemanggilan antrean berikutnya tidak boleh otomatis menyelesaikan antrean yang sedang berstatus `CALLED`. Petugas harus menyelesaikan antrean tersebut terlebih dahulu sebelum memanggil antrean berikutnya.

Penanganan aksi juga dipisahkan dari proses penyegaran daftar agar kegagalan penyegaran tidak membuat aksi yang telah berhasil dilaporkan sebagai gagal.

Pada tahap ini, data antrean masih dikelola melalui penyimpanan lokal di browser.

### 4.9 Week 09 — Node.js + Express

Week 09 berfokus pada pembangunan backend menggunakan Node.js dan Express.

Struktur backend mulai dipisahkan menjadi beberapa lapisan:

- **Routes:** menentukan endpoint API dan menghubungkannya dengan controller.
- **Controllers:** menangani request dan menyusun response API.
- **Services:** menjalankan proses pengambilan dan pemfilteran data antrean.
- **Middleware:** menangani pencatatan request, validasi query, route yang tidak ditemukan, dan error handling.
- **ApiError:** menyediakan struktur galat API yang konsisten.

Backend menyediakan endpoint `GET /api/health` dan `GET /api/queues`. Pada tahap ini, data antrean masih menggunakan mock data yang disimpan di memori server.

Frontend dan backend belum terintegrasi, sehingga frontend masih menggunakan penyimpanan lokal untuk operasi antrean.

### 4.10 Week 10 — MySQL Database Integration

Week 10 melanjutkan pengembangan backend dengan mengintegrasikan database MySQL.

Penyimpanan data antrean dikembangkan dari mock data di memori server menjadi penyimpanan database terpusat. Struktur database disiapkan melalui berkas SQL pada folder `database`.

Dengan integrasi ini, data antrean tidak lagi hanya bergantung pada proses server yang sedang berjalan.

### 4.11 Week 11 — REST API

Week 11 berfokus pada penyelesaian REST API dan integrasi frontend dengan backend.

Backend dikembangkan untuk menyediakan operasi pengelolaan antrean yang lebih lengkap, meliputi:

- Membaca daftar antrean.
- Membuat antrean baru.
- Membaca detail antrean.
- Mengubah status antrean.
- Menghapus antrean.
- Memanggil antrean berikutnya.
- Menyelesaikan antrean.
- Memeriksa kondisi layanan melalui health check.

Koneksi database menggunakan MySQL connection pool dengan batas maksimum 10 koneksi. Validasi request diterapkan melalui middleware `validateQueue.js`, sedangkan aturan perpindahan status dikelola pada service.

Frontend menggunakan `queueApi.js` untuk mengirim HTTP request ke backend. Data antrean dibaca dan dikelola melalui REST API, sedangkan `localStorage` hanya digunakan untuk menyimpan ID antrean milik pengunjung.

Konfigurasi CORS diterapkan menggunakan variabel lingkungan `WEB_ORIGIN` agar backend hanya mengizinkan origin frontend yang telah dikonfigurasi.

## 5. Teknologi yang Digunakan

- **Docker Compose:** menjalankan lingkungan pengembangan dan layanan aplikasi.
- **Node.js:** menjalankan lingkungan backend JavaScript.
- **Express:** membangun server dan REST API.
- **MySQL:** menyimpan data antrean secara terpusat.
- **mysql2/promise:** menghubungkan backend dengan MySQL menggunakan Promise dan connection pool.
- **CORS:** mengatur origin frontend yang diizinkan mengakses API.
- **HTML:** menyusun struktur konten.
- **CSS:** mengatur tampilan dan desain responsif.
- **JavaScript:** mengelola interaksi dan aturan antrean.
- **React:** membangun antarmuka berbasis komponen.
- **Vite:** menjalankan server pengembangan dan proses build.
- **React Router:** mengelola navigasi sisi klien.
- **localStorage:** menyimpan ID antrean milik pengunjung pada browser.

## 6. Arsitektur Sistem

### 6.1 Arsitektur Keseluruhan Week 11

```text
                   Browser
                      |
                      v
               React + Vite
                      |
                      v
                  App.jsx
                      |
          +-----------+-----------+
          |                       |
          v                       v
       Pages                  useQueue.js
                                  |
                                  v
                              queueApi.js
                                  |
                                  | HTTP Request
                                  v
                         Express REST API
                                  |
                                  v
                              Middleware
                                  |
                                  v
                                Routes
                                  |
                                  v
                              Controllers
                                  |
                                  v
                               Services
                                  |
                                  v
                           MySQL Connection
                                  |
                                  v
                            MySQL Database
                                  |
                                  v
                               queues

localStorage:
  +-- ID antrean milik pengunjung
```

Frontend dan backend berkomunikasi melalui HTTP. Frontend tidak mengakses database secara langsung.

Backend menjadi perantara antara frontend dan MySQL. Setiap operasi antrean diproses oleh route, controller, dan service sebelum mengakses database.

### 6.2 Arsitektur Frontend

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
   +-- queueApi.js
   |      |
   |      +-- GET daftar antrean
   |      +-- POST pembuatan antrean
   |      +-- POST pemanggilan antrean berikutnya
   |      +-- POST penyelesaian antrean
   |             |
   |             v
   |        REST API Backend
   |
   +-- queue.js
   |      +-- Membaca antrean yang dipanggil
   |      +-- Membaca antrean berikutnya
   |      +-- Membaca antrean milik pengunjung
   |      +-- Menghitung ringkasan antrean
   |
   +-- storage.js
          +-- Membaca ID antrean pengunjung
          +-- Menyimpan ID antrean pengunjung
                 |
                 v
             localStorage
```

Komponen `Layout.jsx` digunakan bersama untuk menyediakan kerangka halaman dan navigasi. `DataState.jsx` digunakan untuk menampilkan status pemuatan data, pesan galat, atau konten halaman.

`useQueue.js` mengelola state antrean dan menghubungkan halaman React dengan fungsi pada `queueApi.js`.

`queueApi.js` menjadi pintu komunikasi frontend dengan REST API. Sementara itu, `queue.js` berisi helper untuk membaca dan mengolah data antrean yang diterima dari backend.

`storage.js` tidak lagi menyimpan seluruh daftar antrean. Berkas ini hanya menyimpan ID antrean milik pengunjung menggunakan `localStorage`.

### 6.3 Arsitektur Backend

```text
HTTP Client
    |
    v
Express Server
    |
    v
JSON Middleware
    |
    v
CORS Middleware
    |
    v
Request Logger
    |
    v
API Routes
    |
    +-- /health
    |
    +-- /queues
           |
           v
       Controllers
           |
           v
         Services
           |
           v
     MySQL Connection Pool
           |
           v
      MySQL Database

Penanganan Request:
    |
    +-- validateQueue.js
    +-- notFound.js
    +-- errorHandler.js
    +-- apiError.js
```

Backend menggunakan pemisahan tanggung jawab antara routes, controllers, services, dan middleware.

Request masuk melalui Express server. Middleware memproses JSON, mengatur CORS, dan mencatat request. Request kemudian diteruskan ke route yang sesuai.

Controller menangani request dan menyusun response. Service menjalankan aturan bisnis serta operasi database melalui MySQL connection pool.

Middleware validasi digunakan untuk memeriksa parameter dan data request sebelum operasi dijalankan. Jika terjadi kesalahan, error handler menangani galat secara terpusat.

### 6.4 Arsitektur Database

Backend menggunakan MySQL sebagai penyimpanan data antrean.

Koneksi database dikelola melalui `mysql2/promise` dan dibuat menggunakan connection pool.

Konfigurasi connection pool meliputi:

- Batas maksimum 10 koneksi.
- `waitForConnections` diaktifkan.
- `queueLimit` bernilai 0.
- Zona waktu koneksi menggunakan UTC.
- Koneksi diperiksa menggunakan `ping()` ketika database dihubungkan.

Service antrean mengakses database melalui fungsi `getPool()` dari `config/database.js`.

Data antrean dibaca dari tabel `queues`. Kolom yang digunakan service meliputi:

- `id`
- `queue_number`
- `status`
- `created_at`
- `called_at`
- `completed_at`

Nama kolom database dipetakan menjadi properti yang digunakan frontend, seperti `queueNumber`, `createdAt`, `calledAt`, dan `completedAt`.

### 6.5 Hubungan Frontend, Backend, dan Database

```text
Frontend React
      |
      | HTTP Request
      v
queueApi.js
      |
      v
Express REST API
      |
      v
Routes
      |
      v
Controllers
      |
      v
Queue Service
      |
      v
MySQL Connection Pool
      |
      v
MySQL Database
      |
      | Query Result
      v
Queue Service
      |
      v
Controller Response
      |
      v
Frontend React
```

Frontend mengirim permintaan melalui `fetch()` pada `queueApi.js`. Backend menerima request, memvalidasi data, menjalankan aturan bisnis, dan mengakses database.

Hasil operasi dikembalikan dalam response API. Frontend kemudian memperbarui state melalui `useQueue.js` agar tampilan mencerminkan data terbaru.

## 7. Routing Frontend

Aplikasi menggunakan empat path utama dan satu rute cadangan:

- `/` — melihat antrean saat ini.
- `/queue` — mengambil nomor antrean.
- `/admin/login` — masuk sebagai petugas.
- `/admin/dashboard` — mengelola antrean.
- `*` — menampilkan halaman Not Found untuk alamat yang tidak terdaftar.

Navigasi dikelola oleh React Router tanpa memuat ulang seluruh dokumen HTML.

## 8. REST API Backend

Base URL API pada lingkungan pengembangan:

```text
http://localhost:3001/api
```

Endpoint API dikelompokkan berdasarkan health check dan pengelolaan antrean.

### 8.1 Health Check

```http
GET /api/health
```

Digunakan untuk memeriksa kondisi layanan backend.

Respons sukses menggunakan properti `data` yang berisi informasi layanan, status, lingkungan, uptime, dan timestamp.

### 8.2 Daftar Antrean

```http
GET /api/queues
```

Mengambil daftar antrean dari database MySQL.

Endpoint mendukung filter status menggunakan query parameter:

```http
GET /api/queues?status=WAITING
GET /api/queues?status=CALLED
GET /api/queues?status=COMPLETED
```

Status yang didukung adalah `WAITING`, `CALLED`, dan `COMPLETED`.

### 8.3 Membuat Antrean

```http
POST /api/queues
```

Membuat antrean baru dengan status awal `WAITING`.

Nomor antrean dibentuk menggunakan awalan `A` dan tiga digit angka berdasarkan ID antrean.

### 8.4 Detail Antrean

```http
GET /api/queues/:id
```

Mengambil satu antrean berdasarkan ID.

ID antrean divalidasi melalui middleware sebelum controller menjalankan operasi.

### 8.5 Mengubah Status Antrean

```http
PATCH /api/queues/:id
```

Mengubah status antrean berdasarkan ID dan request body yang dikirim.

Perubahan status diperiksa oleh middleware dan service agar hanya transisi yang diperbolehkan yang dapat dijalankan.

### 8.6 Menghapus Antrean

```http
DELETE /api/queues/:id
```

Menghapus data antrean berdasarkan ID.

### 8.7 Memanggil Antrean Berikutnya

```http
POST /api/queues/next
```

Memanggil antrean berstatus `WAITING` yang paling awal.

Jika masih ada antrean berstatus `CALLED`, pemanggilan baru ditolak. Jika tidak ada antrean yang menunggu, API mengembalikan galat yang sesuai.

### 8.8 Menyelesaikan Antrean

```http
POST /api/queues/:id/complete
```

Menyelesaikan antrean berdasarkan ID. Operasi ini hanya mengizinkan perubahan status `CALLED` menjadi `COMPLETED`.

### 8.9 Format Respons API

Respons sukses menggunakan properti `data`:

```json
{
  "data": {
    "id": 1,
    "queueNumber": "A001",
    "status": "WAITING"
  }
}
```

Contoh tersebut menggambarkan struktur dasar respons data antrean; properti aktual mengikuti hasil operasi API.

Respons galat menggunakan properti `error`:

```json
{
  "error": {
    "code": "INVALID_STATUS",
    "message": "Status tidak dikenal."
  }
}
```

Format tersebut memisahkan kode galat dan pesan agar klien dapat memahami kesalahan yang terjadi.

## 9. Pengelolaan Data Frontend

### 9.1 queueApi.js

`web/src/api/queueApi.js` menjadi lapisan komunikasi frontend dengan REST API.

Berkas ini menggunakan `fetch()` untuk mengirim permintaan HTTP ke backend.

Alamat dasar API menggunakan variabel:

```javascript
const API_URL =
  import.meta.env.VITE_API_URL ?? 'http://localhost:3001/api';
```

Fungsi yang digunakan frontend saat ini:

- `ambilDaftarAntrean()` — mengambil daftar antrean.
- `buatAntrean()` — membuat antrean baru.
- `panggilAntreanBerikutnya()` — memanggil antrean berikutnya.
- `selesaikanAntrean(id)` — menyelesaikan antrean berdasarkan ID.

Jika request gagal karena masalah jaringan atau response API menunjukkan kesalahan, `GalatApi` digunakan untuk menyampaikan kode dan pesan galat kepada frontend.

### 9.2 useQueue.js

`useQueue.js` mengelola state antrean menggunakan React Hooks.

Tanggung jawab utamanya meliputi:

1. Menyimpan status pemuatan, data antrean, dan galat.
2. Mengambil daftar antrean dari backend ketika hook digunakan.
3. Menyegarkan daftar antrean setelah operasi.
4. Mengelola pesan kesalahan.
5. Mengelola status sibuk ketika aksi sedang dijalankan.
6. Menyimpan ID antrean milik pengunjung ke `localStorage`.

Setelah operasi berhasil, hook mencoba mengambil daftar terbaru dari backend. Kegagalan penyegaran tidak otomatis membatalkan hasil operasi sebelumnya yang sudah berhasil.

### 9.3 queue.js

`queue.js` berisi helper untuk membaca dan mengolah data antrean.

Fungsi yang tersedia meliputi:

- `currentCalled()` — membaca antrean yang sedang dipanggil.
- `nextInLine()` — membaca antrean berikutnya.
- `waitingQueues()` — membaca antrean yang menunggu.
- `myQueue()` — membaca antrean milik pengunjung.
- `findQueue()` — mencari antrean berdasarkan ID.
- `summary()` — menghitung ringkasan jumlah antrean berdasarkan status.

Pada implementasi Week 11, berkas ini berfungsi sebagai kumpulan helper pembacaan data, bukan sebagai tempat penyimpanan utama atau pengelola perubahan data antrean.

### 9.4 storage.js

`storage.js` hanya menangani penyimpanan ID antrean milik pengunjung.

Kunci penyimpanan yang digunakan:

```text
queueapp.nomor-saya.v2
```

Fungsi yang tersedia:

- `muatNomorSaya()` — membaca ID antrean dari `localStorage`.
- `simpanNomorSaya(id)` — menyimpan ID antrean ke `localStorage`.

Daftar antrean utama tetap disimpan pada database MySQL melalui backend.

## 10. Status Antrean dan Aturan Bisnis

Antrean memiliki tiga status utama:

- `WAITING`: antrean sedang menunggu giliran.
- `CALLED`: antrean sedang dipanggil.
- `COMPLETED`: antrean telah selesai.

### 10.1 Transisi Status

Perpindahan status yang diperbolehkan:

```text
WAITING
   |
   v
CALLED
   |
   v
COMPLETED
```

Transisi yang diterapkan pada backend:

- `WAITING` dapat berubah menjadi `CALLED`.
- `CALLED` dapat berubah menjadi `COMPLETED`.
- `COMPLETED` tidak memiliki transisi lanjutan.

Service menggunakan konfigurasi transisi status untuk memeriksa apakah perubahan yang diminta diperbolehkan.

### 10.2 Aturan Memanggil Antrean

Pemanggilan antrean harus mengikuti aturan berikut:

1. Sistem memeriksa apakah masih ada antrean berstatus `CALLED`.
2. Jika masih ada antrean yang sedang dipanggil, pemanggilan baru ditolak.
3. Jika tidak ada antrean yang sedang dipanggil, sistem mencari antrean `WAITING` paling awal.
4. Jika tidak ada antrean `WAITING`, sistem mengembalikan informasi bahwa tidak ada antrean yang menunggu.
5. Jika ditemukan antrean yang menunggu, satu antrean tersebut diubah menjadi `CALLED`.
6. Petugas harus menyelesaikan antrean yang sedang dipanggil sebelum memanggil antrean berikutnya.

Dengan demikian, satu aksi pemanggilan hanya ditujukan untuk satu antrean.

### 10.3 Aturan Menyelesaikan Antrean

1. Petugas memilih aksi **Selesaikan** pada antrean yang sedang dipanggil.
2. Backend memeriksa apakah antrean tersedia.
3. Backend memeriksa apakah transisi `CALLED` menjadi `COMPLETED` diperbolehkan.
4. Jika valid, status antrean diperbarui di database.
5. Setelah penyelesaian berhasil, petugas dapat memanggil antrean berikutnya jika masih ada antrean menunggu.

## 11. Middleware dan Penanganan Error

### 11.1 Middleware Backend

Backend Express menggunakan beberapa middleware dengan tanggung jawab berbeda:

- **CORS:** mengizinkan origin frontend yang telah dikonfigurasi.
- **JSON Middleware:** membaca request body berformat JSON.
- **Request Logger:** mencatat method, URL, status response, dan durasi request.
- **Validate Queue:** memvalidasi ID antrean, query status, dan request body.
- **Not Found:** menangani request ke route yang tidak tersedia.
- **Error Handler:** menangani galat secara terpusat dan mengembalikan format response yang konsisten.

Urutan middleware penting agar request diproses dan kesalahan ditangani dengan benar.

### 11.2 Validasi Request

`validateQueue.js` menyediakan validasi untuk:

- ID antrean pada parameter URL.
- Query status pada endpoint daftar antrean.
- Request body untuk perubahan status antrean.

Validasi dilakukan sebelum controller menjalankan operasi service.

### 11.3 Error Handling

`apiError.js` menyediakan struktur galat API, sedangkan `errorHandler.js` menangani galat secara terpusat.

Response galat menggunakan struktur:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Pesan kesalahan."
  }
}
```

Untuk request ke route yang tidak tersedia, middleware `notFound.js` mengembalikan response HTTP 404.

## 12. Konfigurasi CORS

Backend menggunakan package `cors` untuk mengatur origin yang diizinkan mengakses API.

Konfigurasi origin dibaca dari variabel lingkungan:

```text
WEB_ORIGIN=http://localhost:5173
```

Konfigurasi juga mendukung lebih dari satu origin yang dipisahkan dengan koma.

Pada `server/src/config/index.js`, nilai `WEB_ORIGIN` diolah menjadi daftar origin melalui proses pemisahan dan penghapusan spasi.

Selanjutnya, `server/src/app.js` menggunakan daftar tersebut pada middleware CORS:

```javascript
app.use(cors({
  origin: config.webOrigins,
}));
```

Dengan konfigurasi ini, backend tidak menggunakan origin frontend secara sembarang, melainkan mengikuti daftar yang disediakan melalui lingkungan aplikasi.

## 13. Lingkungan Pengembangan dan Docker Compose

Docker Compose menjalankan tiga layanan utama:

| Layanan | Teknologi | Port Host |
|---|---|---|
| MySQL | MySQL 8.0 | 3307 |
| Server | Node.js 20 + Express | 3001 |
| Web | Node.js 20 + React + Vite | 5173 |

Ketiga layanan berada dalam jaringan Docker Compose bernama `queueapp`.

### 13.1 MySQL

Layanan MySQL menggunakan volume `mysql_data` agar data database tetap tersimpan pada volume Docker ketika container dihentikan atau dibuat ulang.

Folder `database` dipasang ke direktori inisialisasi MySQL:

```text
/docker-entrypoint-initdb.d
```

### 13.2 Server

Backend berjalan pada container Node.js 20.

Source code backend berada pada folder:

```text
server/
```

Server menggunakan konfigurasi lingkungan untuk membaca port, kredensial database, dan origin frontend.

Backend menunggu layanan MySQL berada dalam kondisi sehat sebelum dijalankan.

### 13.3 Web

Frontend berjalan pada container Node.js 20 dan menggunakan Vite sebagai development server.

Source code frontend berada pada folder:

```text
web/
```

Frontend menggunakan port host `5173` untuk diakses melalui browser.

## 14. Struktur Folder Backend Week 11

Struktur utama backend saat ini:

```text
server/
|
+-- package.json
+-- package-lock.json
|
+-- src/
    |
    +-- apiError.js
    +-- app.js
    +-- server.js
    |
    +-- config/
    |   +-- index.js
    |   +-- database.js
    |
    +-- controllers/
    |   +-- healthController.js
    |   +-- queueController.js
    |
    +-- middleware/
    |   +-- errorHandler.js
    |   +-- notFound.js
    |   +-- requestLogger.js
    |   +-- validateQueue.js
    |
    +-- routes/
    |   +-- healthRoutes.js
    |   +-- index.js
    |   +-- queueRoutes.js
    |
    +-- services/
        +-- queueService.js
```

Setiap folder memiliki tanggung jawab tersendiri agar kode backend lebih mudah dipahami, diuji, dan dikembangkan.

## 15. Batasan Sistem Week 11

Beberapa batasan implementasi saat ini:

- Autentikasi petugas belum diterapkan.
- JWT belum diterapkan.
- Formulir login masih berupa simulasi validasi dan navigasi.
- Otorisasi berdasarkan peran pengguna belum diterapkan.
- Frontend saat ini menggunakan operasi daftar, pembuatan, pemanggilan, dan penyelesaian antrean melalui REST API.
- Endpoint detail antrean, perubahan status melalui PATCH, dan penghapusan antrean tersedia pada backend, tetapi belum menjadi operasi utama yang digunakan antarmuka frontend.
- ID antrean pengunjung disimpan secara lokal pada browser. Jika data penyimpanan browser dihapus atau pengunjung menggunakan browser lain, ID tersebut tidak otomatis tersedia di browser tersebut.
- Pengujian seluruh endpoint dan alur lengkap melalui browser tetap perlu dilakukan sebagai bagian dari verifikasi checkpoint.

## 16. Kesimpulan

Arsitektur QueueApp berkembang dari aplikasi frontend sederhana menjadi aplikasi yang menggunakan frontend React, backend Express, dan database MySQL.

Pada Week 09, backend mulai dibangun menggunakan Express dengan data mock di memori server. Pada Week 10, penyimpanan antrean diintegrasikan dengan database MySQL. Pada Week 11, frontend dan backend dihubungkan melalui REST API.

Arsitektur saat ini memisahkan tanggung jawab frontend, backend, dan database. Frontend mengelola tampilan dan state melalui React, backend memproses request serta aturan bisnis melalui Express, sedangkan MySQL menyimpan data antrean secara terpusat.

Pemisahan tersebut menjadi dasar pengembangan QueueApp selanjutnya, termasuk penerapan autentikasi petugas, otorisasi, dan penyempurnaan pengujian sistem.