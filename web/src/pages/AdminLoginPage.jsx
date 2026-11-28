import { useNavigate } from 'react-router-dom';

import Layout from '../components/Layout.jsx';
import AdminLogin from '../components/AdminLogin.jsx';

export default function AdminLoginPage() {
  const navigasi = useNavigate();

  function handleLogin() {
    navigasi('/admin/dashboard');
  }

  return (
    <Layout
      judul="Masuk sebagai Petugas"
      catatan="Minggu 11: halaman masuk petugas masih memvalidasi form dan melakukan navigasi; autentikasi kredensial dan JWT belum diterapkan."
    >
      <AdminLogin onLogin={handleLogin} />
    </Layout>
  );
}
