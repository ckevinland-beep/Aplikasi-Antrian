export default function QueueForm({
  onAmbil,
  sibuk = false,
  pesan = '',
}) {
  async function handleSubmit(event) {
    event.preventDefault();
    await onAmbil();
  }

  return (
    <form className="form-ambil-nomor" onSubmit={handleSubmit}>
      <h3>Konfirmasi pengambilan antrean</h3>

      <p>
        Nomor antrean akan dibuatkan untuk Anda.
        Anda tidak perlu mengisi data apa pun.
      </p>

      <button type="submit" disabled={sibuk}>
        {sibuk ? 'Memproses...' : 'Ambil Nomor Antrean'}
      </button>

      {pesan && (
        <p className="pesan-galat" role="alert">
          {pesan}
        </p>
      )}
    </form>
  );
}
