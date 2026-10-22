import { STATUS } from '../queue.js';

function formatWaktu(waktu) {
  if (!waktu) return '—';

  const tanggal = new Date(waktu);

  if (Number.isNaN(tanggal.getTime())) return '—';

  return tanggal.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

export default function QueueTable({
  antrean = [],
  sibuk = false,
  onSelesaikan,
}) {
  const daftarAktif = antrean.filter(
    (item) => item.status !== STATUS.COMPLETED
  );

  return (
    <section
      className="dashboard-daftar"
      aria-labelledby="judul-daftar-antrean"
    >
      <h2 id="judul-daftar-antrean">Daftar Antrean</h2>

      <p className="dashboard-keterangan-tabel">
        Antrean hari ini, urut dari yang terawal.
      </p>

      {daftarAktif.length === 0 ? (
        <p>Belum ada antrean aktif.</p>
      ) : (
        <div className="tabel-antrean">
          <table>
            <thead>
              <tr>
                <th scope="col">Nomor</th>
                <th scope="col">Status</th>
                <th scope="col">Dibuat</th>
                <th scope="col">Dipanggil</th>
                <th scope="col">Selesai</th>
                <th scope="col">Aksi</th>
              </tr>
            </thead>

            <tbody>
              {daftarAktif.map((item) => (
                <tr key={item.id}>
                  <td className="dashboard-nomor">
                    {item.queueNumber}
                  </td>

                  <td>
                    <span
                      className={`dashboard-status ${
                        item.status === STATUS.CALLED
                          ? 'status-dipanggil'
                          : 'status-menunggu'
                      }`}
                    >
                      {item.status === STATUS.CALLED
                        ? '● CALLED'
                        : '○ WAITING'}
                    </span>
                  </td>

                  <td>{formatWaktu(item.createdAt)}</td>
                  <td>{formatWaktu(item.calledAt)}</td>
                  <td>{formatWaktu(item.completedAt)}</td>

                  <td>
                    {item.status === STATUS.CALLED ? (
                      <button
                        type="button"
                        className="dashboard-tombol dashboard-tombol-kecil"
                        disabled={sibuk}
                        onClick={() => onSelesaikan(item.id)}
                      >
                        Selesaikan {item.queueNumber}
                      </button>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
