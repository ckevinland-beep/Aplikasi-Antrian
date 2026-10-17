import { useState } from 'react';
import Layout from '../components/Layout.jsx';
import AdminLogin from '../components/AdminLogin.jsx';

export default function AdminLoginPage() {
  const [pesan, setPesan] = useState('');

  function handleLogin({ username, password }) {
    if (!username.trim() || !password) {
      setPesan('Username dan password wajib diisi.');
      return;
    }

    setPesan(
      'Login belum terhubung ke sistem autentikasi.'
    );
  }

  return (
    <Layout
      judul="Login Petugas"
      aktif="admin-login.html"
      catatan="Halaman akses petugas QueueApp."
    >
      <AdminLogin onLogin={handleLogin} pesan={pesan} />
    </Layout>
  );
}
