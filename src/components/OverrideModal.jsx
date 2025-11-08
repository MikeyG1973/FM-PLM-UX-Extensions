import React, { useState } from 'react';

export default function OverrideModal({ open, initialValue = '', onSave, onClose }) {
  const [value, setValue] = useState(initialValue);

  if (!open) return null;

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.4)', zIndex: 1000 }}>
      <div style={{ width: 560, background: 'white', borderRadius: 8, padding: 16, boxShadow: '0 10px 30px rgba(2,6,23,0.2)' }}>
        <h3 style={{ marginTop: 0 }}>Override Justification</h3>
        <p style={{ color: '#374151', marginTop: 4 }}>Provide a reason for assigning the selected supervisor despite a booking conflict.</p>
        <textarea value={value} onChange={(e) => setValue(e.target.value)} placeholder="Explain why this supervisor should be assigned (required)" style={{ width: '100%', minHeight: 120, marginTop: 12, padding: 8, borderRadius: 6, border: '1px solid #e5e7eb' }} />

        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <button onClick={() => { setValue(initialValue); onClose && onClose(); }} style={{ padding: '8px 12px', borderRadius: 6 }}>Cancel</button>
          <button onClick={() => { onSave && onSave(value); }} style={{ padding: '8px 12px', borderRadius: 6, background: '#10b981', color: '#fff' }}>Save Justification</button>
        </div>
      </div>
    </div>
  );
}
