import Layout from '../components/Layout.jsx';
import AdminPreview from '../components/AdminPreview.jsx';
import QueueTable from '../components/QueueTable.jsx';
import {
  currentCalled,
  nextInLine,
  summary,
} from '../queue.js';

export default function AdminDashboardPage({
  state,
  panggilBerikutnya,
  selesaikan,
  pesan,
}) {
  const dipanggil = currentCalled(state);
  const berikutnya = nextInLine(state);
  const ringkasan = summary(state);

  return (
    <Layout
      judul="Dashboard Petugas"
      aktif="admin-dashboard.html"
      petugas
      catatan="Kelola antrean pelanggan melalui dashboard petugas."
    >
      <AdminPreview
        dipanggil={dipanggil}
        berikutnya={berikutnya}
        ringkasan={ringkasan}
      />

      <section aria-labelledby="judul-kontrol-antrean">
        <h2 id="judul-kontrol-antrean">Kontrol Antrean</h2>

        <button
          type="button"
          onClick={panggilBerikutnya}
        >
          Panggil Antrean Berikutnya
        </button>

        {pesan && (
          <p role="status" aria-live="polite">
            {pesan}
          </p>
        )}
      </section>

      <QueueTable
        antrean={state.queues}
        onSelesaikan={selesaikan}
      />
    </Layout>
  );
}
