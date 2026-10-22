import { STATUS } from '../queue.js';

export default function QueueStatus({ antrean }) {
  let keterangan = 'Belum mengambil nomor';

  if (antrean?.status === STATUS.WAITING) {
    keterangan = 'WAITING. Simpan nomor ini.';
  } else if (antrean?.status === STATUS.CALLED) {
    keterangan = 'Nomor Anda sedang dipanggil.';
  } else if (antrean?.status === STATUS.COMPLETED) {
    keterangan = 'Antrean Anda telah selesai.';
  }

  return (
    <section
      className="kartu-ambil kartu-nomor-saya"
      aria-labelledby="judul-status-antrean"
    >
      <h2 id="judul-status-antrean">Nomor Antrean Anda</h2>

      {antrean ? (
        <p className="nomor-antrean nomor-saya">
          {antrean.queueNumber}
        </p>
      ) : (
        <p className="nomor-belum-ada">—</p>
      )}

      <p className="status-nomor">
        Status: {keterangan}
      </p>
    </section>
  );
}
