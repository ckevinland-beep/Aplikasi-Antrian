import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import HomePage from '../pages/HomePage.jsx';
import { useQueue } from '../useQueue.js';
import '../styles/style.css';

function HomeEntry() {
  const { state } = useQueue();

  return <HomePage state={state} />;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomeEntry />
  </StrictMode>
);
