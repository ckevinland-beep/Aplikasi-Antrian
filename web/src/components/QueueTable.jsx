export default function QueueTable({ antrean, onSelesaikan }) {
  return (
    <section aria-labelledby="judul-tabel-antrean">
      <h2 id="judul-tabel-antrean">Daftar Antrean</h2>

      {antrean.length === 0 ? (
        <p>Belum ada data antrean.</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th scope="col">Nomor</th>
                <th scope="col">Status</th>
                <th scope="col">Waktu Dibuat</th>
                <th scope="col">Tindakan</th>
              </tr>
            </thead>

            <tbody>
              {antrean.map((item) => (
                <tr key={item.id}>
                  <td>{item.queueNumber}</td>
                  <td>{formatStatus(item.status)}</td>
                  <td>{formatWaktu(item.createdAt)}</td>
                  <td>
                    {item.status === 'CALLED' ? (
                      <button
                        type="button"
                        onClick={() => onSelesaikan(item.id)}
                      >
                        Selesaikan
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

function formatStatus(status) {
  const daftarStatus = {
    WAITING: 'Menunggu',
    CALLED: 'Sedang Dipanggil',
    COMPLETED: 'Selesai',
  };

  return daftarStatus[status] ?? status;
}

function formatWaktu(waktu) {
  if (!waktu) return '—';

  const tanggal = new Date(waktu);

  if (Number.isNaN(tanggal.getTime())) return '—';

  return tanggal.toLocaleString('id-ID', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}