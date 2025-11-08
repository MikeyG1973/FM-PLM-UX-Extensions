import React from 'react';
import { mockSupervisors } from '../data/mockData';

export default function SatelliteSupervisors({ zones = [], satelliteMap = {}, onChange, timeline }) {
  // Unique locations derived from zones
  const locations = Array.from(new Map(zones.map(z => [z.location + (z.hall ? `::${z.hall}` : ''), z])).values());

  return (
    <div style={{ marginTop: 12 }}>
      <h4 style={{ margin: 0, marginBottom: 8 }}>Satellite Supervisors (per zone)</h4>
      <div style={{ display: 'grid', gap: 10 }}>
        {zones.map(z => {
          const key = `${z.location}${z.hall ? `::${z.hall}` : ''}`;
          return (
            <div key={z.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 10, background: '#fff' }}>
              <div style={{ fontWeight: 700 }}>{z.name}</div>
              <div style={{ fontSize: 13, color: '#6b7280' }}>{z.location}{z.hall ? ` — ${z.hall}` : ''}</div>
              <div style={{ marginTop: 8 }}>
                <select
                  value={satelliteMap[key] || ''}
                  onChange={(e) => onChange && onChange(key, e.target.value ? parseInt(e.target.value) : null)}
                  style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
                >
                  <option value="">-- Select Satellite Supervisor --</option>
                  {mockSupervisors.map(s => (
                    <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
