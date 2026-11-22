# QueueApp - Database Documentation

## 1. Gambaran Umum

Pada Week 10, QueueApp mulai menggunakan MySQL sebagai basis data untuk menyimpan informasi pengguna dan antrean.

Backend menggunakan Node.js, Express, dan library `mysql2` untuk berkomunikasi dengan MySQL. Koneksi database dikelola melalui satu modul konfigurasi.

## 2. Teknologi Database

- **MySQL 8.0:** sistem manajemen basis data.
- **mysql2:** library Node.js untuk koneksi MySQL.
- **Docker Compose:** menjalankan layanan aplikasi.
- **SQL:** membuat tabel, memasukkan data awal, dan menjalankan query.

## 3. Struktur Database

Database yang digunakan bernama `queueapp` dan memiliki dua tabel utama, yaitu `users` dan `queues`.

### 3.1 Tabel users

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | INT UNSIGNED | Primary key dan auto increment |
| name | VARCHAR(100) | Nama pengguna |
| email | VARCHAR(150) | Email pengguna dan unik |
| password_hash | CHAR(60) | Password dalam bentuk hash |
| role | ENUM('USER', 'ADMIN') | Peran pengguna |
| created_at | TIMESTAMP | Waktu pembuatan data |

### 3.2 Tabel queues

| Kolom | Tipe Data | Keterangan |
|---|---|---|
| id | INT UNSIGNED | Primary key dan auto increment |
| queue_number | VARCHAR(10) | Nomor antrean dan unik |
| status | ENUM | Status antrean |
| created_at | TIMESTAMP | Waktu antrean dibuat |
| called_at | TIMESTAMP | Waktu antrean dipanggil |
| completed_at | TIMESTAMP | Waktu antrean diselesaikan |

Status antrean:
- `WAITING`: antrean sedang menunggu.
- `CALLED`: antrean sedang dipanggil.
- `COMPLETED`: antrean telah selesai.

Kolom `called_at` dan `completed_at` dapat bernilai NULL.

### 3.3 Index dan Constraint

Database menggunakan:
- Primary key pada kolom `id` di setiap tabel.
- Unique key pada `users.email`.
- Unique key pada `queues.queue_number`.
- Index gabungan `status` dan `created_at` pada tabel `queues`.

Kedua tabel menggunakan InnoDB, karakter `utf8mb4`, dan collation `utf8mb4_unicode_ci`.

## 4. File SQL

Struktur folder:

```text
database/
+-- schema.sql
+-- seed.sql
```

- `schema.sql` berisi perintah untuk membuat tabel `users` dan `queues`.
- `seed.sql` berisi data awal untuk pengujian aplikasi.

Data awal terdiri dari dua akun pengguna dan lima antrean dengan nomor A001 sampai A005. Password akun disimpan dalam bentuk hash.

## 5. Konfigurasi Koneksi Database

Konfigurasi berada di:

```text
server/src/config/
+-- index.js
+-- database.js
```

Environment variable yang digunakan:
- `DB_HOST`: alamat database.
- `DB_PORT`: port database.
- `DB_NAME`: nama database.
- `DB_USER`: pengguna database.
- `DB_PASSWORD`: password pengguna database.

Pada Docker Compose, host database menggunakan nama layanan `mysql` dengan port internal `3306`.

File `database.js` menggunakan `mysql2/promise` dan menyediakan:
- `connectDatabase()`: membuat dan memeriksa koneksi database.
- `getConnection()`: menyediakan koneksi aktif untuk service.

Server menghubungkan database sebelum mulai menerima request API.

## 6. Integrasi Database dengan Backend

Pengelolaan data antrean dilakukan melalui:

```text
server/src/services/queueService.js
```

Fungsi yang tersedia:
- `listQueues()`: mengambil daftar antrean.
- `findQueue(id)`: mencari antrean berdasarkan ID.
- `createQueue()`: membuat antrean baru.
- `updateQueueStatus(id, status)`: mengubah status antrean.
- `deleteQueue(id)`: menghapus antrean berdasarkan ID.
- `formatQueueNumber(angka)`: membentuk nomor antrean seperti A001.

Query menggunakan parameter untuk memasukkan nilai ke dalam perintah SQL.

## 7. Integrasi Docker Compose

Layanan MySQL menggunakan image MySQL 8.0 dengan konfigurasi:
- Port host `3307` menuju port container `3306`.
- Volume `mysql_data` untuk menyimpan data.
- Folder `database` dipasang ke `/docker-entrypoint-initdb.d`.
- Healthcheck untuk memeriksa kesiapan MySQL.

Layanan server menggunakan depends_on dengan kondisi service_healthy, sehingga saat layanan dijalankan melalui Docker Compose, server menunggu MySQL mencapai status sehat sebelum dimulai.

File SQL pada `/docker-entrypoint-initdb.d` dijalankan ketika MySQL melakukan inisialisasi pertama pada direktori data yang kosong. File tersebut tidak otomatis dijalankan ulang setiap container dimulai.

## 8. API Daftar Antrean

### 8.1 Mengambil Semua Antrean

```http
GET /api/queues
```

Endpoint mengembalikan seluruh data antrean dari tabel `queues` dengan properti `data`.

### 8.2 Filter Status Antrean

```http
GET /api/queues?status=WAITING
```

Filter mendukung:
- `WAITING`
- `CALLED`
- `COMPLETED`

Jika parameter status tidak diberikan, API mengembalikan seluruh antrean.

### 8.3 Format Response

Setiap data antrean memiliki properti:
- `id`
- `queueNumber`
- `status`
- `createdAt`
- `calledAt`
- `completedAt`

Nama kolom database dipetakan menjadi properti camelCase pada response API.

## 9. Pengujian Database

Pengujian dilakukan melalui PowerShell.

Mengambil seluruh antrean:

```powershell
Invoke-RestMethod "http://localhost:3001/api/queues" |
ConvertTo-Json -Depth 5
```

Memfilter antrean WAITING:

```powershell
Invoke-RestMethod "http://localhost:3001/api/queues?status=WAITING" |
ConvertTo-Json -Depth 5
```

Hasil pengujian:
- Lima data antrean berhasil ditampilkan.
- Nomor antrean A001 sampai A005 berhasil dibaca.
- Filter `WAITING` menampilkan A004 dan A005.
- Timestamp dikembalikan dalam format ISO 8601 UTC.
- Waktu yang belum tersedia ditampilkan sebagai `null`.

## 10. Persistensi Data

Data MySQL disimpan menggunakan Docker volume `mysql_data`.

Data tetap tersedia ketika container dihentikan dan dijalankan kembali selama volume tidak dihapus.

**Catatan:** Perintah `docker compose down -v` menghapus volume database beserta data yang tersimpan di dalamnya.