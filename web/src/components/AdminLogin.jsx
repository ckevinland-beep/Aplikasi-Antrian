import { useState } from 'react';

export default function AdminLogin({ onLogin, pesan = '' }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    onLogin({ username, password });
  }

  return (
    <section aria-labelledby="judul-login">
      <h2 id="judul-login">Login Petugas</h2>

      <p>Masuk menggunakan akun petugas untuk mengelola antrean.</p>

      {pesan && (
        <p role="alert" aria-live="polite">
          {pesan}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username atau Email</label>
          <input
            id="username"
            name="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit">Masuk</button>
      </form>
    </section>
  );
}