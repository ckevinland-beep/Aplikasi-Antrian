import express from 'express';
import cors from 'cors';

import { config } from './config/index.js';
import { routes } from './routes/index.js';
import { requestLogger } from './middleware/requestLogger.js';
import { notFound } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  /* Membaca body JSON menjadi req.body. */
  app.use(express.json());

  /* Mengizinkan origin web yang sudah dikonfigurasi. */
  app.use(cors({
    origin: config.webOrigins,
  }));

  app.use(requestLogger);

  /* Seluruh API berada di bawah /api. */
  app.use('/api', routes);

  /* Middleware 404 dan error handler harus berada di akhir. */
  app.use(notFound);
  app.use(errorHandler);

  return app;
}
