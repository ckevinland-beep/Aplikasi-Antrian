import { currentCalled } from '../queue.js';
import Layout from '../components/Layout.jsx';
import DataState from '../components/DataState.jsx';
import QueueForm from '../components/QueueForm.jsx';
import QueueStatus from '../components/QueueStatus.jsx';

export default function TakeQueuePage({
  status,
  galat,
  antrean,
  nomorSaya,
  pesan,
  sibuk,
  onAmbil,
  onMuatUlang,
}) {
  const dipanggil = currentCalled(antrean);

  return (
    <Layout
      judul="Ambil Nomor Antrean"
      catatan="Minggu 08: pengunjung dapat mengambil nomor antrean dan melihat statusnya; data masih tersimpan di peramban ini."
    >
      <DataState
        status={status}
        galat={galat}
        onCobaLagi={onMuatUlang}
      >
        <div className="halaman-ambil-nomor">
          <p className="info-panggilan">
            {dipanggil
              ? `Nomor ${dipanggil.queueNumber} sedang dipanggil.`
              : 'Belum ada antrean yang sedang dipanggil.'}
          </p>

          <div className="kartu-ambil-grid">
            <section
              className="kartu-ambil"
              aria-labelledby="judul-ambil-nomor"
            >
              <h2 id="judul-ambil-nomor">Ambil Nomor</h2>

              <QueueForm
                onAmbil={onAmbil}
                sibuk={sibuk}
                pesan={pesan}
              />
            </section>

            <QueueStatus antrean={nomorSaya} />

            <section
              className="kartu-ambil kartu-petunjuk"
              aria-labelledby="judul-petunjuk"
            >
              <h2 id="judul-petunjuk">Selanjutnya</h2>

              <ol>
                <li>Simpan atau catat nomor antrean Anda.</li>
                <li>
                  Perhatikan halaman{' '}
                  <a href="/">Antrean Saat Ini</a>.
                </li>
                <li>
                  Menuju loket ketika nomor Anda dipanggil.
                </li>
              </ol>
            </section>
          </div>
        </div>
      </DataState>
    </Layout>
  );
}
