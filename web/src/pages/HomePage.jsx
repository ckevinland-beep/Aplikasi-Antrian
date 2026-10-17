import Layout from '../components/Layout.jsx';
import QueueDisplay from '../components/QueueDisplay.jsx';
import StatusLegend from '../components/StatusLegend.jsx';
import { currentCalled, waitingQueues, myQueue } from '../queue.js';

export default function HomePage({ state }) {
  const dipanggil = currentCalled(state);
  const menunggu = waitingQueues(state);
  const antreanSaya = myQueue(state);

  return (
    <Layout
      judul="Informasi Antrean"
      aktif="index.html"
      catatan="Pantau status antrean Anda melalui QueueApp."
    >
      <p>
        Selamat datang di QueueApp. Periksa antrean yang sedang
        dipanggil dan antrean yang masih menunggu.
      </p>

      <QueueDisplay
        dipanggil={dipanggil}
        menunggu={menunggu}
      />

      {antreanSaya && (
        <section aria-labelledby="judul-antrean-saya">
          <h2 id="judul-antrean-saya">Nomor Antrean Saya</h2>
          <p>
            Nomor antrean Anda:{' '}
            <strong>{antreanSaya.queueNumber}</strong>
          </p>
          <p>Status: {labelStatus(antreanSaya.status)}</p>
        </section>
      )}

      <StatusLegend />
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
