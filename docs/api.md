# QueueApp REST API

Dokumentasi kontrak REST API QueueApp — Minggu 11.

## 1. Informasi Umum

- **Base URL:** `http://localhost:3001/api`
- **Format komunikasi:** JSON
- **Content-Type:** `application/json`
- **CORS:** Origin frontend diatur melalui variabel lingkungan `WEB_ORIGIN`.
- **Autentikasi:** Belum diterapkan pada tahap Minggu 11.

Seluruh endpoint API menggunakan prefix `/api`.

## 2. Format Respons

### Respons Sukses

Seluruh respons sukses yang memiliki data menggunakan properti `data`.

Contoh:

```json
{
  "data": {
    "id": 1,
    "queueNumber": "A001",
    "status": "WAITING",
    "createdAt": "2026-11-28T07:00:00.000Z",
    "calledAt": null,
    "completedAt": null
  }
}
```

### Respons Error

Respons error menggunakan properti `error` yang berisi kode dan pesan kesalahan.

Contoh:

```json
{
  "error": {
    "code": "QUEUE_NOT_FOUND",
    "message": "Antrean tidak ditemukan."
  }
}
```

Pada lingkungan development, respons error yang tidak terduga dapat menyertakan properti `detail`.

## 3. Status Antrean

QueueApp menggunakan tiga status antrean:

| Status | Keterangan |
|---|---|
| WAITING | Antrean sedang menunggu. |
| CALLED | Antrean sedang dipanggil petugas. |
| COMPLETED | Antrean telah selesai dilayani. |

Perpindahan status yang diperbolehkan:

`WAITING → CALLED → COMPLETED`

Perubahan status yang tidak mengikuti urutan tersebut akan ditolak oleh server.

## 4. Daftar Endpoint API

### 4.1 Health Check

**Method:** GET
**Endpoint:** `/api/health`

Digunakan untuk memeriksa kondisi server API.

**Respons sukses:** `200 OK`

Contoh respons:

```json
{
  "data": {
    "service": "queueapp-server",
    "status": "ok",
    "environment": "development",
    "uptimeSeconds": 120,
    "timestamp": "2026-11-28T07:00:00.000Z"
  }
}
```

### 4.2 Mendapatkan Daftar Antrean

**Method:** GET
**Endpoint:** `/api/queues`

Digunakan untuk mengambil seluruh data antrean berdasarkan urutan waktu pembuatan.

Parameter query opsional:

| Parameter | Keterangan |
|---|---|
| status | Memfilter antrean berdasarkan status. |

Contoh request:

`GET /api/queues?status=WAITING`

Status yang dapat digunakan adalah `WAITING`, `CALLED`, dan `COMPLETED`.

**Respons sukses:** `200 OK`

### 4.3 Membuat Antrean Baru

**Method:** POST
**Endpoint:** `/api/queues`

Digunakan untuk membuat nomor antrean baru. Nomor antrean dibuat secara otomatis oleh server dengan status awal `WAITING`.

Request body tidak diperlukan.

**Respons sukses:** `201 Created`

### 4.4 Mendapatkan Detail Antrean

**Method:** GET
**Endpoint:** `/api/queues/:id`

Digunakan untuk mengambil detail antrean berdasarkan ID.

Contoh request:

`GET /api/queues/1`

**Respons sukses:** `200 OK`

Jika antrean tidak ditemukan, server mengembalikan `404 Not Found`.

### 4.5 Memperbarui Status Antrean

**Method:** PATCH
**Endpoint:** `/api/queues/:id`

Digunakan untuk memperbarui status antrean berdasarkan ID.

Request body:

```json
{
  "status": "CALLED"
}
```

Status harus berupa salah satu dari `WAITING`, `CALLED`, atau `COMPLETED`, serta mengikuti aturan perpindahan status yang berlaku.

**Respons sukses:** `200 OK`

Kemungkinan kode error:

- `400 Bad Request`: ID atau status tidak valid.
- `404 Not Found`: Antrean tidak ditemukan.
- `409 Conflict`: Perubahan status tidak diperbolehkan.

### 4.6 Menghapus Antrean

**Method:** DELETE
**Endpoint:** `/api/queues/:id`

Digunakan untuk menghapus antrean berdasarkan ID.

Contoh request:

`DELETE /api/queues/1`

**Respons sukses:** `204 No Content`

Respons sukses tidak memiliki response body. Jika antrean tidak ditemukan, server mengembalikan `404 Not Found`.

### 4.7 Memanggil Antrean Berikutnya

**Method:** POST
**Endpoint:** `/api/queues/next`

Digunakan untuk memanggil antrean berstatus `WAITING` yang paling awal dibuat.

Request body tidak diperlukan.

**Respons sukses:** `200 OK`

Antrean yang berhasil dipanggil akan berubah menjadi `CALLED`.

Kemungkinan kode error:

- `409 Conflict`: Masih terdapat antrean yang sedang dipanggil.
- `409 Conflict`: Tidak ada antrean yang menunggu.

### 4.8 Menyelesaikan Antrean

**Method:** POST
**Endpoint:** `/api/queues/:id/complete`

Digunakan untuk menyelesaikan antrean berdasarkan ID. Antrean harus memiliki status `CALLED` sebelum diselesaikan.

Contoh request:

`POST /api/queues/1/complete`

Request body tidak diperlukan.

**Respons sukses:** `200 OK`

Status antrean akan berubah menjadi `COMPLETED`.

Kemungkinan kode error:

- `404 Not Found`: Antrean tidak ditemukan.
- `409 Conflict`: Status antrean tidak memungkinkan untuk diselesaikan.

## 5. Kode HTTP

| Kode HTTP | Keterangan |
|---|---|
| 200 | Request berhasil diproses. |
| 201 | Antrean berhasil dibuat. |
| 204 | Antrean berhasil dihapus tanpa response body. |
| 400 | Request tidak valid. |
| 404 | Endpoint atau antrean tidak ditemukan. |
| 409 | Terjadi konflik aturan atau perubahan status antrean. |
| 500 | Terjadi kesalahan internal server. |

## 6. Validasi dan Aturan Bisnis

API QueueApp menerapkan beberapa aturan berikut:

1. ID antrean harus berupa bilangan bulat positif.
2. Filter status hanya menerima satu nilai status yang sah.
3. Field `status` wajib disertakan pada request PATCH.
4. Status antrean hanya dapat berubah dari `WAITING` menjadi `CALLED`, kemudian `COMPLETED`.
5. Hanya satu antrean yang dapat berstatus `CALLED` pada satu waktu melalui mekanisme pemanggilan antrean berikutnya.
6. Nomor antrean dibuat otomatis oleh server menggunakan format `A` diikuti tiga digit.
7. Data antrean disimpan dalam database MySQL.

## 7. Batasan Implementasi Minggu 11

Pada tahap Minggu 11, QueueApp telah memiliki REST API untuk membaca, membuat, memperbarui, memanggil, menyelesaikan, dan menghapus antrean.

Frontend telah dihubungkan dengan backend melalui REST API sehingga data antrean tidak lagi bergantung pada penyimpanan daftar antrean lokal di browser.

Autentikasi petugas dan JWT belum diterapkan dan direncanakan untuk tahap pengembangan berikutnya.