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
      catatan="Minggu 08: form ini memeriksa kelengkapan isian, tetapi belum memeriksa kredensial sama sekali. Autentikasi sungguhan ditambahkan pada Minggu 13."
    >
      <AdminLogin onLogin={handleLogin} />
    </Layout>
  );
}
