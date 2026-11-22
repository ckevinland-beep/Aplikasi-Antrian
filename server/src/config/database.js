import mysql from 'mysql2/promise';
import { config } from './index.js';

let koneksi = null;

export async function connectDatabase() {
    koneksi = await mysql.createConnection({
        ...config.database,

        // Gunakan UTC agar waktu konsisten.
        timezone: 'Z',
    });

    // Pastikan koneksi benar-benar aktif.
    await koneksi.ping();

    const { host, port, database } = config.database;
    console.log(
        `[queueapp] terhubung ke MySQL ${host}:${port}/${database}`
    );

    return koneksi;
}

export function getConnection() {
    if (!koneksi) {
        throw new Error(
            'Database belum tersambung - connectDatabase() harus dipanggil lebih dulu.'
        );
    }

    return koneksi;
}
