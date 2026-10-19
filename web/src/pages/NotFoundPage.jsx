import { Link } from 'react-router-dom';
import Layout from '../components/Layout.jsx';

export default function NotFoundPage() {
  return (
    <Layout
      judul="Halaman Tidak Ditemukan"
      catatan="Minggu 07: routing menggunakan React Router."
    >
      <p>Maaf, halaman yang Anda cari tidak ditemukan.</p>

      <h2>Silakan pilih halaman berikut</h2>
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
    </Layout>
  );
}