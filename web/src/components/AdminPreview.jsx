export default function AdminPreview({ dipanggil, berikutnya, ringkasan }) {
  return (
    <section aria-labelledby="judul-ringkasan">
      <h2 id="judul-ringkasan">Ringkasan Antrean</h2>

      <div className="ringkasan-antrean">
        <article>
          <h3>Sedang Dipanggil</h3>
          <p>
            <strong>
              {dipanggil ? dipanggil.queueNumber : 'Belum ada'}
            </strong>
          </p>
        </article>

        <article>
          <h3>Antrean Berikutnya</h3>
          <p>
            <strong>
              {berikutnya ? berikutnya.queueNumber : 'Belum ada'}
            </strong>
          </p>
        </article>

        <article>
          <h3>Menunggu</h3>
          <p>
            <strong>{ringkasan.waiting}</strong>
          </p>
        </article>

        <article>
          <h3>Selesai</h3>
          <p>
            <strong>{ringkasan.completed}</strong>
          </p>
        </article>

        <article>
          <h3>Total Antrean</h3>
          <p>
            <strong>{ringkasan.total}</strong>
          </p>
        </article>
      </div>
    </section>
  );
}