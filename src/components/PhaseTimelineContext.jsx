import React from 'react';
import ProjectCalendarView from './ProjectCalendarView';

export default function PhaseTimelineContext({ timeline }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12, marginTop: 12 }}>
      <h3 style={{ margin: 0, marginBottom: 8, fontSize: 14, color: '#111827' }}>Execution Timeline</h3>
      <ProjectCalendarView timeline={timeline} />
    </div>
  );
}
