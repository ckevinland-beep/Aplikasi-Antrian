export default function AdminPreview({
  ringkasan,
  dipanggil,
  berikutnya,
  pesan = '',
  sibuk = false,
  onPanggil,
}) {
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

        <button
          type="button"
          className="dashboard-tombol"
          disabled={sibuk || !berikutnya}
          onClick={onPanggil}
        >
          {sibuk ? 'Memproses...' : 'Panggil Antrean Berikutnya'}
        </button>

        <p className="dashboard-keterangan">
          {berikutnya
            ? `Antrean berikutnya yang akan dipanggil: ${berikutnya.queueNumber}.`
            : 'Tidak ada antrean yang menunggu.'}
        </p>

        {pesan && (
          <p className="pesan-galat" role="alert">
            {pesan}
          </p>
        )}
      </section>
    </div>
  );
}
