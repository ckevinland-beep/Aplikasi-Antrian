export default function AdminPreview({
  ringkasan,
  dipanggil,
  berikutnya,
  pesan = '',
  sibuk = false,
  onPanggil,
}) {
  /* Antrean berikutnya hanya bisa dipanggil jika tidak ada
     antrean yang sedang dipanggil dan masih ada yang menunggu. */
  const bolehMemanggil = dipanggil === null && berikutnya !== null;

  let keterangan;

  if (dipanggil) {
    keterangan = `Selesaikan ${dipanggil.queueNumber} lebih dulu sebelum memanggil antrean berikutnya.`;
  } else if (berikutnya) {
    keterangan = `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`;
  } else {
    keterangan = 'Belum ada antrean yang menunggu.';
  }

  return (
    <div className="dashboard-ringkasan-grid">
      <section
        className="dashboard-kartu"
        aria-labelledby="judul-ringkasan"
      >
        <h2 id="judul-ringkasan">Ringkasan Hari Ini</h2>

        <dl className="dashboard-statistik">
          <dt>Sedang dipanggil</dt>
          <dd>{dipanggil?.queueNumber ?? '—'}</dd>

          <dt>Menunggu</dt>
          <dd>{ringkasan.waiting}</dd>

          <dt>Selesai</dt>
          <dd>{ringkasan.completed}</dd>
        </dl>
      </section>

      <section
        className="dashboard-kartu"
        aria-labelledby="judul-aksi"
      >
        <h2 id="judul-aksi">Aksi</h2>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            onPanggil();
          }}
        >
          <button
            type="submit"
            className="dashboard-tombol"
            disabled={!bolehMemanggil || sibuk}
          >
            {sibuk ? 'Memanggil…' : 'Panggil Antrean Berikutnya'}
          </button>
        </form>

        <p className="dashboard-keterangan">{keterangan}</p>

        <p className="pesan-galat" role="alert">
          {pesan}
        </p>
      </section>
    </div>
  );
}
