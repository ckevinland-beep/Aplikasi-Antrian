/* Membaca satu variabel angka. Bila kosong atau bukan angka, pakai default. */
function angka(nilai, bawaan) {
    const hasil = Number.parseInt(nilai, 10);
    return Number.isInteger(hasil) ? hasil : bawaan;
}

/* Memastikan variabel lingkungan wajib tersedia. */
function wajib(nama) {
    const nilai = process.env[nama];

    if (!nilai) {
        throw new Error(
            `Variabel lingkungan ${nama} wajib diisi. Salin .env.example menjadi .env.`
        );
    }

    return nilai;
}

export const config = Object.freeze({
    environment: process.env.NODE_ENV || 'development',

    // Port server di dalam container.
    port: angka(process.env.PORT, 3000),

    // Konfigurasi koneksi database MySQL.
    database: Object.freeze({
        host: process.env.DB_HOST || 'localhost',
        port: angka(process.env.DB_PORT, 3306),
        database: wajib('DB_NAME'),
        user: wajib('DB_USER'),
        password: wajib('DB_PASSWORD'),
    }),

    // Daftar origin web yang diizinkan mengakses API.
    webOrigins: Object.freeze(
        (process.env.WEB_ORIGIN || 'http://localhost:5173')
            .split(',')
            .map((asal) => asal.trim())
            .filter(Boolean)
    ),
});
