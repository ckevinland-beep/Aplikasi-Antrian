import { useRef, useState } from 'react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pesan, setPesan] = useState('');
  const [kolomSalah, setKolomSalah] = useState('');

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();

    if (!email.trim()) {
      setPesan('Email wajib diisi.');
      setKolomSalah('email');
      emailRef.current?.focus();
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setPesan('Masukkan alamat email dengan format yang benar.');
      setKolomSalah('email');
      emailRef.current?.focus();
      return;
    }

    if (!password) {
      setPesan('Kata sandi wajib diisi.');
      setKolomSalah('password');
      passwordRef.current?.focus();
      return;
    }

    setPesan('');
    setKolomSalah('');

    // Autentikasi sungguhan belum diterapkan pada Minggu 07.
    onLogin();
  }

  function handleEmailChange(event) {
    setEmail(event.target.value);

    if (kolomSalah === 'email') {
      setKolomSalah('');
      setPesan('');
    }
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);

    if (kolomSalah === 'password') {
      setKolomSalah('');
      setPesan('');
    }
  }

  return (
    <div className="login-halaman">
      <p className="login-pengantar">
        Halaman ini hanya untuk petugas. Pengunjung tidak perlu masuk.
      </p>

      <section className="login-kartu" aria-labelledby="judul-login">
        <h2 id="judul-login">Kredensial petugas</h2>

        <form onSubmit={handleSubmit} noValidate>
          <div className="login-area-pesan">
            {pesan && (
              <p className="login-pesan" role="alert">
                {pesan}
              </p>
            )}
          </div>

          <div className="login-field">
            <label htmlFor="email-petugas">Email</label>

            <input
              ref={emailRef}
              id="email-petugas"
              type="email"
              value={email}
              onChange={handleEmailChange}
              autoComplete="username"
              aria-invalid={kolomSalah === 'email'}
              aria-describedby="contoh-email"
              className={
                kolomSalah === 'email' ? 'login-input-salah' : ''
              }
            />

            <small id="contoh-email">
              Contoh: petugas@queueapp.test
            </small>
          </div>

          <div className="login-field">
            <label htmlFor="password-petugas">Password</label>

            <input
              ref={passwordRef}
              id="password-petugas"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              autoComplete="current-password"
              aria-invalid={kolomSalah === 'password'}
              className={
                kolomSalah === 'password' ? 'login-input-salah' : ''
              }
            />
          </div>

          <button type="submit" className="login-tombol">
            Masuk
          </button>
        </form>
      </section>

      <section
        className="login-kartu login-info"
        aria-labelledby="judul-pesan-kesalahan"
      >
        <h2 id="judul-pesan-kesalahan">Tentang Pesan Kesalahan</h2>

        <p>
          Bila kredensial salah, sistem tidak memberi tahu bagian mana
          yang keliru. Menyebutkan "email tidak terdaftar" akan
          memberitahu penyerang bahwa email lainnya terdaftar.
        </p>
      </section>
    </div>
  );
}
