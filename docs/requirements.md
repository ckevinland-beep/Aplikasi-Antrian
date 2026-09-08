# QueueApp Requirements

## Problem

QueueApp dikembangkan untuk membantu pengelolaan sistem antrian secara bertahap.

## Scope

Pada tahap awal, QueueApp berfokus pada discovery dan penyiapan development environment. Week 01 belum mengimplementasikan fitur aplikasi secara penuh.

## Functional Requirements

- Sistem harus memiliki service server yang dapat berjalan.
- Sistem harus memiliki web interface placeholder yang dapat diakses.
- Sistem harus menggunakan MySQL sebagai database service.
- Ketiga service harus dapat berjalan bersama menggunakan Docker Compose.

## Non-Functional Requirements

- Environment development harus dapat dijalankan secara konsisten menggunakan Docker Compose.
- Service harus dapat diakses melalui port yang telah ditentukan.
- Struktur repository harus mendukung pengembangan QueueApp secara bertahap.

## Main Flow

1. Developer menyiapkan environment.
2. Docker Compose menjalankan MySQL, QueueApp Server, dan Web.
3. Developer memeriksa status ketiga service.
4. Developer melakukan verification terhadap endpoint server dan web.

## Constraints

- Week 01 hanya berfokus pada discovery dan environment setup.
- Belum ada implementasi fitur aplikasi utama.
- Server masih menggunakan placeholder.
- Web masih menggunakan halaman placeholder.