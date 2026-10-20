import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const HALAMAN_PENGUNJUNG = [
  { to: '/', label: 'Antrean Saat Ini' },
  { to: '/queue', label: 'Ambil Nomor' },
  { to: '/admin/login', label: 'Masuk sebagai Petugas' },
];

const HALAMAN_PETUGAS = [
  { to: '/', label: 'Antrean Saat Ini' },
  { to: '/queue', label: 'Ambil Nomor' },
  { to: '/admin/dashboard', label: 'Dashboard Petugas' },
  { to: '/admin/login', label: 'Keluar' },
];

export default function Layout({
  judul,
  petugas = false,
  catatan,
  children,
}) {
  const halaman = petugas ? HALAMAN_PETUGAS : HALAMAN_PENGUNJUNG;

  useEffect(() => {
    document.title = `${judul} — QueueApp`;
  }, [judul]);

  return (
    <>
      <a className="lewati" href="#konten-utama">
        Lewati ke konten utama
      </a>

      <header className="site-header">
        <div className="header-dalam">
          <NavLink to="/" className="logo">
            QueueApp
          </NavLink>

          <nav aria-label="Navigasi utama">
            <ul>
              {halaman.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end
                    className={({ isActive }) =>
                      isActive ? 'active' : undefined
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="konten-utama" tabIndex={-1}>
        <h1>{judul}</h1>
        {children}
      </main>

      <footer>
        <div className="footer-dalam">
          <p>
            QueueApp — reference implementation mata kuliah
            Web and Mobile Technology (BD323).
          </p>
          {catatan && <p>{catatan}</p>}
        </div>
      </footer>
    </>
  );
}
