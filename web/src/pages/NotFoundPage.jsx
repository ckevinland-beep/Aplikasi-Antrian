import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function NotFoundPage() {
  return (
    <Layout
      judul="Halaman Tidak Ditemukan"
      catatan="Minggu 07: routing sisi klien. Alamat yang tidak terdaftar berakhir di halaman ini."
    >
      <div className="not-found-halaman">
        <p className="not-found-pengantar">
          Alamat yang Anda buka tidak ada di QueueApp.
        </p>

        <section
          className="not-found-kartu"
          aria-labelledby="judul-tautan-not-found"
        >
          <h2 id="judul-tautan-not-found">Mungkin Anda mencari</h2>

          <ul>
            <li>
              <Link to="/">Antrean Saat Ini</Link>
            </li>
            <li>
              <Link to="/queue">Ambil Nomor Antrean</Link>
            </li>
            <li>
              <Link to="/admin/login">Masuk sebagai Petugas</Link>
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
