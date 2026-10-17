import Layout from '../components/Layout.jsx';
import { myQueue } from '../queue.js';

export default function TakeQueuePage({ state, ambilNomor, pesan }) {
  const antreanSaya = myQueue(state);

  return (
    <Layout
      judul="Ambil Nomor Antrean"
      aktif="take-queue.html"
      catatan="Pastikan Anda menyimpan nomor antrean setelah mengambilnya."
    >
      <section aria-labelledby="judul-ambil-antrean">
        <h2 id="judul-ambil-antrean">Antrean Pelanggan</h2>

        <p>
          Tekan tombol di bawah untuk mengambil nomor antrean baru.
        </p>

        <button type="button" onClick={ambilNomor}>
          Ambil Nomor Antrean
        </button>

        {pesan && (
          <p role="status" aria-live="polite">
            {pesan}
          </p>
        )}
      </section>

      {antreanSaya && (
        <section aria-labelledby="judul-nomor-saya">
          <h2 id="judul-nomor-saya">Nomor Antrean Anda</h2>

          <p>
            Nomor antrean:{' '}
            <strong>{antreanSaya.queueNumber}</strong>
          </p>

          <p>Status: {labelStatus(antreanSaya.status)}</p>

          {antreanSaya.status === 'WAITING' && (
            <p>Silakan menunggu sampai nomor Anda dipanggil.</p>
          )}

          {antreanSaya.status === 'CALLED' && (
            <p>Nomor Anda sedang dipanggil. Silakan menuju petugas.</p>
          )}

          {antreanSaya.status === 'COMPLETED' && (
            <p>Pelayanan untuk nomor Anda sudah selesai.</p>
          )}
        </section>
      )}

      {!antreanSaya && (
        <p>Anda belum mengambil nomor antrean pada sesi ini.</p>
      )}
    </Layout>
  );
}

function labelStatus(status) {
  const daftar = {
    WAITING: 'Menunggu',
    CALLED: 'Sedang Dipanggil',
    COMPLETED: 'Selesai',
  };

  return daftar[status] ?? status;
}
