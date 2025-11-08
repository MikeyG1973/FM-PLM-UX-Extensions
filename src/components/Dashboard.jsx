import React from 'react';

export default function Dashboard({ onNew, onOpen }) {
  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
        <button onClick={onNew} style={{ padding: 16, borderRadius: 8, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
          <div style={{ fontWeight: 700, color: '#1e40af' }}>+ New Project</div>
          <div style={{ fontSize: 12, color: '#374151' }}>Full Estimate</div>
        </button>
        <div style={{ padding: 16, borderRadius: 8, background: '#ecfccb', border: '1px solid #bbf7d0' }}>
          <div style={{ fontWeight: 700, color: '#065f46' }}>+ Change Order</div>
          <div style={{ fontSize: 12, color: '#374151' }}>Modify existing project</div>
        </div>
        <div style={{ padding: 16, borderRadius: 8, background: '#fef3c7', border: '1px solid #fde68a' }}>
          <div style={{ fontWeight: 700, color: '#92400e' }}>RUSH Requests</div>
          <div style={{ fontSize: 12, color: '#374151' }}>Priority queue</div>
        </div>
      </div>

      <div style={{ marginTop: 18, background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
        <h3 style={{ margin: 0, marginBottom: 8 }}>Recent Submissions</h3>
        <div style={{ color: '#6b7280' }}>This area will list recent projects (stubbed for now).</div>
        <div style={{ marginTop: 12 }}>
          <button onClick={() => onOpen && onOpen({ id: 1, name: 'Demo Project' })} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}>
            View demo project
          </button>
        </div>
      </div>
    </div>
  );
}
