# QueueApp — Aplikasi Sistem Antrean

QueueApp merupakan aplikasi sistem antrean berbasis web yang dikembangkan secara bertahap menggunakan React, Node.js, Express, dan MySQL. Aplikasi ini dirancang untuk membantu pengunjung mengambil nomor antrean serta membantu petugas mengelola proses pelayanan.

## Fitur Utama

- Menampilkan daftar dan status antrean.
- Mengambil nomor antrean secara otomatis.
- Menampilkan nomor antrean milik pengunjung.
- Memanggil antrean berikutnya.
- Menyelesaikan antrean yang sedang dilayani.
- Mengelola data antrean melalui REST API.
- Menyimpan data antrean secara terpusat pada database MySQL.
- Menyimpan ID antrean milik pengunjung secara lokal menggunakan `localStorage`.
- Menerapkan validasi request dan penanganan error pada backend.
- Mengatur akses lintas origin menggunakan CORS.

**Catatan:** Week 08 merupakan checkpoint Web MVP berbasis frontend. Pada Week 09, backend mulai dikembangkan menggunakan Node.js dan Express. Week 10 melanjutkan pengembangan dengan integrasi database MySQL. Pada Week 11, REST API diselesaikan dan frontend React dihubungkan dengan backend. Data antrean disimpan pada MySQL, sedangkan `localStorage` hanya digunakan untuk menyimpan ID antrean milik pengunjung. Formulir login petugas masih berupa simulasi dan belum menggunakan autentikasi sungguhan.

## Teknologi yang Digunakan

### Frontend
- React
- Vite
- JavaScript
- HTML
- CSS
- React Router
- localStorage

### Backend
- Node.js
- Express
- MySQL2
- CORS

### Database dan Lingkungan Pengembangan
- MySQL
- Docker
- Docker Compose
- Git dan GitHub

## Endpoint Backend

Base URL API:

`http://localhost:3001/api`

Daftar endpoint:

| Method | Endpoint | Fungsi |
|---|---|---|
| GET | `/api/health` | Memeriksa kondisi server. |
| GET | `/api/queues` | Mengambil daftar antrean. |
| POST | `/api/queues` | Membuat antrean baru. |
| GET | `/api/queues/:id` | Mengambil detail antrean. |
| PATCH | `/api/queues/:id` | Memperbarui status antrean. |
| DELETE | `/api/queues/:id` | Menghapus antrean. |
| POST | `/api/queues/next` | Memanggil antrean berikutnya. |
| POST | `/api/queues/:id/complete` | Menyelesaikan antrean. |

Filter daftar antrean dapat menggunakan query parameter:

`GET /api/queues?status=WAITING`

Status antrean yang didukung:
- `WAITING`
- `CALLED`
- `COMPLETED`

Dokumentasi lengkap mengenai request, response, validasi, dan kode error tersedia pada `docs/api.md`.

**Catatan:** Backend menggunakan MySQL untuk menyimpan data antrean. Frontend berkomunikasi dengan backend melalui REST API. Login petugas masih berupa simulasi dan autentikasi JWT belum diterapkan.

## Struktur Repository

```text
queueapp/
├── database/
│   ├── schema.sql
│   └── seed.sql
├── docs/
│   ├── api.md
│   ├── architecture.md
│   └── ui-flow.md
├── server/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── package-lock.json
├── web/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── queue.js
│   │   └── storage.js
│   ├── dist/
│   └── package.json
├── .env.example
├── .gitignore
├── docker-compose.yml
├── docker-compose.local.yml
├── MILESTONE.md
└── README.md
```

## Menjalankan Proyek

### 1. Persiapan

Pastikan perangkat telah memiliki:
- Git
- Docker
- Docker Compose

### 2. Clone Repository

```bash
git clone https://github.com/ckevinland-beep/Aplikasi-Antrian.git
cd Aplikasi-Antrian
```

### 3. Konfigurasi Environment

Buat file `.env` berdasarkan `.env.example`, kemudian sesuaikan konfigurasi database dan origin frontend.

Contoh konfigurasi origin frontend:

```env
WEB_ORIGIN=http://localhost:5173
```

Jangan mengunggah file `.env` yang berisi konfigurasi rahasia ke repository.

### 4. Menjalankan Docker Compose

```bash
docker compose up -d --build
```

### 5. Memeriksa Container

```bash
docker compose ps
```

### 6. Mengakses Aplikasi

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:3001/api`
- Health Check: `http://localhost:3001/api/health`

## Aturan Status Antrean

QueueApp menggunakan tiga status antrean:

| Status | Keterangan |
|---|---|
| WAITING | Antrean sedang menunggu. |
| CALLED | Antrean sedang dipanggil petugas. |
| COMPLETED | Antrean telah selesai dilayani. |

Perpindahan status yang diperbolehkan:

`WAITING → CALLED → COMPLETED`

Perubahan status yang tidak mengikuti urutan tersebut akan ditolak oleh server.

## Status Pengembangan

Pada Week 11, QueueApp telah memiliki frontend React dan backend REST API yang terintegrasi.

Backend menggunakan Node.js dan Express dengan koneksi database MySQL melalui connection pool. Struktur backend dipisahkan menjadi routes, controllers, services, konfigurasi, dan middleware.

REST API menyediakan delapan endpoint untuk health check serta operasi membaca, membuat, memperbarui, memanggil, menyelesaikan, dan menghapus antrean.

Validasi request, penanganan error terpusat, serta konfigurasi CORS telah diterapkan. Frontend menggunakan REST API untuk mengambil dan mengelola data antrean.

Database MySQL menjadi penyimpanan utama data antrean. `localStorage` hanya menyimpan ID antrean milik pengunjung agar pengunjung dapat menemukan antreannya kembali.

Autentikasi dan otorisasi petugas secara sungguhan, termasuk JWT, belum diterapkan dan masih menjadi batasan sistem.

Dokumentasi kontrak API tersedia pada `docs/api.md`, sedangkan penjelasan arsitektur tersedia pada `docs/architecture.md`.

## Dokumentasi

- `README.md`: Informasi umum dan panduan menjalankan proyek.
- `MILESTONE.md`: Catatan perkembangan dan pencapaian setiap minggu.
- `docs/api.md`: Dokumentasi kontrak REST API.
- `docs/architecture.md`: Dokumentasi arsitektur aplikasi.
- `docs/ui-flow.md`: Dokumentasi alur antarmuka pengguna.

## Repository

GitHub: https://github.com/ckevinland-beep/Aplikasi-Antrian