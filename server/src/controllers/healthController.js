import { config } from '../config/index.js';

export function getHealth(req, res) {
  res.status(200).json({
    data: {
      service: 'queueapp-server',
      status: 'ok',
      environment: config.environment,

      /* Waktu proses server sudah berjalan dalam detik. */
      uptimeSeconds: Math.round(process.uptime()),

      timestamp: new Date().toISOString(),
    },
  });
}