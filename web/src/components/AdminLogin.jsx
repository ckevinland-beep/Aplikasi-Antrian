import { useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim() || !password) {
      setPesan('Email dan kata sandi wajib diisi.');
      return;
    }

    setPesan('');
    onLogin();
  }

  return (
    <section aria-labelledby="judul-login">
      <h2 id="judul-login">Login Petugas</h2>

      <p>
        Masukkan email dan kata sandi untuk membuka dashboard
        petugas.
      </p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email-petugas">Email</label>
          <input
            id="email-petugas"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />
        </div>

        <div>
          <label htmlFor="password-petugas">Kata sandi</label>
          <input
            id="password-petugas"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
          />
        </div>

        {pesan && (
          <p className="pesan-galat" role="alert">
            {pesan}
          </p>
        )}

        <button type="submit">Masuk</button>
      </form>

      <p>
        Catatan: login ini hanya simulasi untuk praktikum,
        belum menggunakan autentikasi sungguhan.
      </p>
    </section>
  );
}
