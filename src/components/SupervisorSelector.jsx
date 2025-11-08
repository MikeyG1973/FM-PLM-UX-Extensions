import React, { useMemo } from 'react';
import { AlertTriangle } from 'lucide-react';
import { mockSupervisors, mockOpportunityData } from '../data/mockData';
import { checkSupervisorConflict as _checkSupervisorConflict, checkSupervisorExpertiseConflict as _checkSupervisorExpertiseConflict } from '../lib/supervisorUtils';

export default function SupervisorSelector({ team = {}, timeline = {}, oppId, onChange }) {
  const selected = team.mainSupervisor || '';

  const conflict = useMemo(() => selected ? _checkSupervisorConflict(parseInt(selected), timeline) : false, [selected, timeline]);
  const expertiseMsg = useMemo(() => selected ? _checkSupervisorExpertiseConflict(parseInt(selected), oppId, mockOpportunityData) : null, [selected, oppId]);

  return (
    <div style={{ padding: 12, border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff' }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Choose Main Supervisor</div>
      <select
        value={selected}
        onChange={(e) => onChange && onChange('mainSupervisor', e.target.value ? parseInt(e.target.value) : null)}
        style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
      >
        <option value="">-- Select Supervisor --</option>
        {mockSupervisors.map(s => (
          <option key={s.id} value={s.id}>{s.name} ({s.status})</option>
        ))}
      </select>

      {conflict && (
        <div style={{ marginTop: 10, color: '#dc2626', display: 'flex', gap: 8, alignItems: 'center' }}>
          <AlertTriangle size={14} /> <div style={{ fontSize: 13 }}>Selected supervisor has a booking that overlaps project dates.</div>
        </div>
      )}

      {conflict && (
        <div style={{ marginTop: 8 }}>
          <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Override Justification (required if selecting a booked supervisor)</label>
          <textarea
            value={team.overrideJustification || ''}
            onChange={(e) => onChange && onChange('overrideJustification', e.target.value)}
            placeholder="Explain why this supervisor should be assigned despite a booking conflict"
            style={{ width: '100%', minHeight: 72, padding: 8, borderRadius: 6, border: '1px solid #d1d5db' }}
          />
        </div>
      )}

      {expertiseMsg && (
        <div style={{ marginTop: 8, color: '#92400e', fontSize: 13 }}>{expertiseMsg}</div>
      )}
    </div>
  );
}
