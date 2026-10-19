import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/* Konfigurasi Vite untuk aplikasi satu dokumen.
   Routing halaman ditangani oleh React Router. */

export default defineConfig({
  plugins: [react()],
});
