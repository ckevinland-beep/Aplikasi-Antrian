import { createApp } from './app.js';
import { config } from './config/index.js';

const app = createApp();

/* Server harus menerima koneksi dari luar container. */
const server = app.listen(config.port, '0.0.0.0', () => {
  console.log(
    `[queueapp] API berjalan di port ${config.port} (${config.environment})`
  );

  console.log('[queueapp] coba: GET /api/health dan GET /api/queues');
});