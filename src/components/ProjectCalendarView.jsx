import React, { useMemo } from 'react';

const formatDate = (dateString, timeString = '00:00') => {
  if (!dateString) return null;
  return new Date(`${dateString}T${timeString}:00`);
};

export default function ProjectCalendarView({ timeline }) {
  const phases = useMemo(() => {
    const p = [
      { name: 'Installation', start: formatDate(timeline.installStart, timeline.installStartTime), end: formatDate(timeline.installEnd, timeline.installEndTime), color: 'blue' },
      { name: 'Show Run', start: formatDate(timeline.showStart, timeline.showStartTime), end: formatDate(timeline.showEnd, timeline.showEndTime), color: 'green' },
      { name: 'Dismantle', start: formatDate(timeline.dismantleStart, timeline.dismantleStartTime), end: formatDate(timeline.dismantleEnd, timeline.dismantleEndTime), color: 'red' },
    ];
    return p.filter(x => x.start && x.end && x.start < x.end);
  }, [timeline]);

  if (!phases.length) return <div style={{ color: '#6b7280', fontSize: 13, fontStyle: 'italic', padding: 12 }}>Timeline dates not set yet.</div>;

  const allDates = phases.flatMap(p => [p.start, p.end]);
  const minDate = new Date(Math.min(...allDates));
  const maxDate = new Date(Math.max(...allDates));
  const total = maxDate - minDate || 1;

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto' }}>
      <div style={{ position: 'relative', height: 40, background: '#f3f4f6', borderRadius: 8 }}>
        {phases.map(ph => {
          const left = ((ph.start - minDate) / total) * 100;
          const width = ((ph.end - ph.start) / total) * 100;
          const bg = ph.color === 'blue' ? '#2563eb' : ph.color === 'green' ? '#16a34a' : '#dc2626';
          return (
            <div
              key={ph.name}
              title={`${ph.name}: ${ph.start.toLocaleString()} - ${ph.end.toLocaleString()}`}
              style={{ position: 'absolute', left: `${left}%`, width: `${width}%`, top: '50%', transform: 'translateY(-50%)', height: 12, background: bg, borderRadius: 6 }}
            />
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: '#374151', marginTop: 8 }}>
        <span>{minDate.toLocaleDateString()}</span>
        <span>{maxDate.toLocaleDateString()}</span>
      </div>
    </div>
  );
}
