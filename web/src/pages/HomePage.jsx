import { currentCalled, waitingQueues } from '../queue.js';

import Layout from '../components/Layout.jsx';
import DataState from '../components/DataState.jsx';
import QueueDisplay from '../components/QueueDisplay.jsx';
import QueueStatus from '../components/QueueStatus.jsx';
import StatusLegend from '../components/StatusLegend.jsx';

export default function HomePage({
  status,
  galat,
  antrean,
  nomorSaya,
  onMuatUlang,
}) {
  return (
    <Layout
      judul="Antrean Saat Ini"
      catatan="Pantau status antrean Anda melalui QueueApp."
    >
      <DataState
        status={status}
        galat={galat}
        onCobaLagi={onMuatUlang}
      >
        <div className="ringkasan-antrean">
          <QueueDisplay
            dipanggil={currentCalled(antrean)}
            menunggu={waitingQueues(antrean)}
          />

          <QueueStatus antrean={nomorSaya} />
        </div>
      </DataState>

      <StatusLegend />
    </Layout>
  );
}
