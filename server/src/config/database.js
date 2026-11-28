import mysql from 'mysql2/promise';
import { config } from './index.js';

// Maksimal koneksi database yang boleh digunakan bersamaan.
const BATAS_KONEKSI = 10;

let pool = null;

export async function connectDatabase() {
  pool = mysql.createPool({
    ...config.database,

    // Gunakan UTC agar waktu konsisten.
    timezone: 'Z',

    // Pengaturan connection pool.
    connectionLimit: BATAS_KONEKSI,
    waitForConnections: true,
    queueLimit: 0,
  });

  // Pastikan koneksi database benar-benar aktif.
  const koneksi = await pool.getConnection();
  await koneksi.ping();
  koneksi.release();

  const { host, port, database } = config.database;

  console.log(
    `[queueapp] terhubung ke MySQL ${host}:${port}/${database} ` +
    `(pool, maksimum ${BATAS_KONEKSI} koneksi)`
  );
}

export function getPool() {
  if (!pool) {
    throw new Error(
      'Database belum tersambung - connectDatabase() harus dipanggil lebih dulu.'
    );
  }

  return pool;
}
