import React, { useState } from 'react';
import { AlertTriangle } from 'lucide-react';
import Dashboard from './components/Dashboard';
import FormWizard from './components/FormWizard';

const demoTimeline = {
  installStart: '2025-03-12',
  installStartTime: '08:00',
  installEnd: '2025-03-14',
  installEndTime: '20:00',
  showStart: '2025-03-15',
  showStartTime: '09:00',
  showEnd: '2025-03-17',
  showEndTime: '17:00',
  dismantleStart: '2025-03-17',
  dismantleStartTime: '20:00',
  dismantleEnd: '2025-03-19',
  dismantleEndTime: '16:00',
};

export default function App() {
  const [screen, setScreen] = useState('dashboard');

  return (
    <div style={{ padding: 20, background: '#f9fafb', minHeight: '100vh' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ fontSize: 20, fontWeight: 700, color: '#1d4ed8' }}>GPJ — Project Intake</div>
        <div style={{ color: '#374151' }}>Hello, Sarah</div>
      </header>

      <main>
        {screen === 'dashboard' && (
          <>
            <Dashboard onNew={() => setScreen('form')} onOpen={(p) => { console.log('Open', p); setScreen('form'); }} />
          </>
        )}

        {screen === 'form' && (
          <FormWizard initialTimeline={demoTimeline} onBack={() => setScreen('dashboard')} onDone={() => setScreen('dashboard')} />
        )}
      </main>

      <footer style={{ marginTop: 32, color: '#6b7280', fontSize: 13, display: 'flex', gap: 8, alignItems: 'center' }}>
        <AlertTriangle size={14} /> Demo scaffold — restore the full intake form incrementally.
      </footer>
    </div>
  );
}

