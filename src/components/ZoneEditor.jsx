import React, { useState } from 'react';

export default function ZoneEditor({ zones, setZones, locations = [] }) {
  const [zoneName, setZoneName] = useState('');
  const [zoneLocation, setZoneLocation] = useState(locations[0]?.id || '');
  const [zoneHall, setZoneHall] = useState('');

  const addZone = () => {
    if (!zoneName.trim()) return;
    const newZone = { id: Date.now(), name: zoneName.trim(), location: zoneLocation, hall: zoneHall || null, elements: [] };
    setZones(prev => [...prev, newZone]);
    setZoneName('');
    setZoneHall('');
  };

  const removeZone = (id) => {
    setZones(prev => prev.filter(z => z.id !== id));
  };

  const addElement = (zoneId, elementName, qty = 1) => {
    if (!elementName || !elementName.trim()) return;
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, elements: [...z.elements, { id: Date.now(), name: elementName.trim(), qty }] } : z));
  };

  const removeElement = (zoneId, elId) => {
    setZones(prev => prev.map(z => z.id === zoneId ? { ...z, elements: z.elements.filter(e => e.id !== elId) } : z));
  };

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={zoneName} onChange={e => setZoneName(e.target.value)} placeholder="Zone name (e.g., Main Entrance)" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }} />
        <select value={zoneLocation} onChange={e => { setZoneLocation(e.target.value); setZoneHall(''); }} style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}>
          {locations.length === 0 && <option value="">Default</option>}
          {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
        </select>
        {/* If the selected location provides halls, show a hall selector */}
        {locations.find(l => l.id === zoneLocation && l.halls) && (
          <select value={zoneHall} onChange={e => setZoneHall(e.target.value)} style={{ padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}>
            <option value="">-- Select Hall --</option>
            {locations.find(l => l.id === zoneLocation).halls.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        )}
        <button onClick={addZone} style={{ padding: '8px 12px', borderRadius: 6, background: '#2563eb', color: '#fff' }}>Add Zone</button>
      </div>

      <div style={{ display: 'grid', gap: 10 }}>
        {zones.map(z => (
          <div key={z.id} style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 10, background: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700 }}>{z.name}</div>
                <div style={{ fontSize: 12, color: '#6b7280' }}>{z.location}</div>
              </div>
              <div>
                <button onClick={() => removeZone(z.id)} style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #ef4444', color: '#ef4444' }}>Remove</button>
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <AddElementForm onAdd={(name, qty) => addElement(z.id, name, qty)} />
              <div style={{ marginTop: 8 }}>
                {z.elements.length === 0 && <div style={{ color: '#6b7280', fontSize: 13 }}>No elements added yet.</div>}
                {z.elements.map(el => (
                  <div key={el.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: '1px solid #f3f4f6' }}>
                    <div>
                      <div style={{ fontSize: 14 }}>{el.name}</div>
                      <div style={{ fontSize: 12, color: '#6b7280' }}>Qty: {el.qty}</div>
                    </div>
                    <div>
                      <button onClick={() => removeElement(z.id, el.id)} style={{ padding: '6px 8px', borderRadius: 6, border: '1px solid #e5e7eb' }}>Remove</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AddElementForm({ onAdd }) {
  const [name, setName] = useState('');
  const [qty, setQty] = useState(1);

  const submit = (e) => {
    e.preventDefault();
    onAdd(name, Number(qty) || 1);
    setName('');
    setQty(1);
  };

  return (
    <form onSubmit={submit} style={{ display: 'flex', gap: 8 }}>
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Element name (e.g., Pedestal)" style={{ flex: 1, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }} />
      <input value={qty} onChange={e => setQty(e.target.value)} type="number" min={1} style={{ width: 80, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }} />
      <button type="submit" style={{ padding: '8px 12px', borderRadius: 6, background: '#10b981', color: '#fff' }}>Add</button>
    </form>
  );
}
