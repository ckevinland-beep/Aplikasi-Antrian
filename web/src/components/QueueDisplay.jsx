export default function QueueDisplay({ dipanggil, menunggu }) {
  return (
    <>
      <section
        className="kartu-antrean"
        id="antrean-saat-ini"
        aria-labelledby="judul-dipanggil"
      >
        <h2 id="judul-dipanggil">Sedang Dipanggil</h2>

        {dipanggil ? (
          <p className="nomor-antrean">
            {dipanggil.queueNumber}
          </p>
        ) : (
          <p className="nomor-kosong">—</p>
        )}

        <p>
          {dipanggil
            ? 'Silakan menuju loket pelayanan.'
            : 'Belum ada antrean yang dipanggil.'}
        </p>
      </section>

      <section
        className="kartu-antrean"
        id="antrean-menunggu"
        aria-labelledby="judul-menunggu"
      >
        <h2 id="judul-menunggu">Menunggu</h2>

        <p className="jumlah-antrean">{menunggu.length}</p>
        <p>Jumlah antrean yang menunggu.</p>

        {menunggu.length > 0 && (
          <ul className="daftar-nomor">
            {menunggu.map((antrean) => (
              <li key={antrean.id}>{antrean.queueNumber}</li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
