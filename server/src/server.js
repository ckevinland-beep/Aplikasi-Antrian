import { createApp } from './app.js';
import { config } from './config/index.js';
import { connectDatabase } from './config/database.js';

/* Hubungkan database sebelum menjalankan server. */
try {
  await connectDatabase();
} catch (galat) {
  console.error(
    '[queueapp] tidak dapat terhubung ke database:',
    galat.message
  );
  console.error(
    '[queueapp] periksa DB_HOST, DB_USER, dan DB_PASSWORD di berkas .env.'
  );
  console.error(
    '[queueapp] pastikan container MySQL sudah berjalan.'
  );

  process.exit(1);
}

const app = createApp();

/* Server harus menerima koneksi dari luar container. */
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `[queueapp] API berjalan di port ${config.port} (${config.environment})`
  );

  console.log('[queueapp] coba: GET /api/health dan GET /api/queues');
});
