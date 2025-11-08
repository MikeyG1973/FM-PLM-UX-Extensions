import React, { useState, useEffect, useRef } from 'react';
import { Loader2 } from 'lucide-react';
import PhaseTimelineContext from './PhaseTimelineContext';
import ZoneEditor from './ZoneEditor';
import { mockVenues } from '../data/mockData';
import { checkSupervisorConflict } from '../lib/supervisorUtils';
import SatelliteSupervisors from './SatelliteSupervisors';
import SupervisorSelector from './SupervisorSelector';
import OverrideModal from './OverrideModal';
import { showToast } from '../lib/toast';

// Minimal team state for the form

export default function FormWizard({ initialTimeline, onDone, onBack }) {
	const [step, setStep] = useState(1);
	const [timeline, setTimeline] = useState(initialTimeline);
	const [team, setTeam] = useState({ mainSupervisor: null, estimator: null, pm: null, overrideJustification: '' });
	const [zones, setZones] = useState([{ id: 1, name: 'Main Entrance', location: 'Default', elements: [] }]);
	const [satelliteMap, setSatelliteMap] = useState({});
	const [overrideWarning, setOverrideWarning] = useState('');
	const [openOverrideModal, setOpenOverrideModal] = useState(false);
	const [isSaving, setIsSaving] = useState(false);
	const [lastSavedAt, setLastSavedAt] = useState(null);

	// Derived validation state
	const mainSupervisorId = team.mainSupervisor;
	const mainHasConflict = mainSupervisorId ? checkSupervisorConflict(parseInt(mainSupervisorId), timeline) : false;
	const canFinish = !(mainHasConflict && (!team.overrideJustification || team.overrideJustification.trim().length === 0));

	// Persistence helpers
	const STORAGE_KEY = 'project-intake-draft';

	const getSummary = () => ({
		timeline,
		team,
		zones,
		satelliteMap,
		createdAt: new Date().toISOString(),
	});

	const saveToLocal = () => {
		try {
			const payload = JSON.stringify(getSummary(), null, 2);
			localStorage.setItem(STORAGE_KEY, payload);
			return true;
		} catch (err) {
			console.error('saveToLocal error', err);
			return false;
		}
	};

	const loadFromLocal = () => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (!raw) return false;
			const obj = JSON.parse(raw);
			if (obj.timeline) setTimeline(obj.timeline);
			if (obj.team) setTeam(obj.team);
			if (obj.zones) setZones(obj.zones);
			if (obj.satelliteMap) setSatelliteMap(obj.satelliteMap);
			return true;
		} catch (err) {
			console.error('loadFromLocal error', err);
			return false;
		}
	};

	// Auto-load draft on mount (if present)
	useEffect(() => {
		const ok = loadFromLocal();
		if (ok) showToast('Loaded saved draft from localStorage', { type: 'info' });
	}, []);

	// Debounced auto-save when core pieces change with an inline saving indicator
	const _saveTimer = useRef(null);
	useEffect(() => {
		// indicate a pending save immediately
		setIsSaving(true);
		if (_saveTimer.current) clearTimeout(_saveTimer.current);
		_saveTimer.current = setTimeout(() => {
			const ok = saveToLocal();
			setIsSaving(false);
			if (ok) setLastSavedAt(new Date().toISOString());
		}, 1000);
		return () => {
			if (_saveTimer.current) clearTimeout(_saveTimer.current);
		};
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [timeline, team, zones, satelliteMap]);

	const downloadJSON = () => {
		const data = JSON.stringify(getSummary(), null, 2);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;
		a.download = `project-intake-${new Date().toISOString()}.json`;
		document.body.appendChild(a);
		a.click();
		a.remove();
		URL.revokeObjectURL(url);
	};

	const next = () => setStep(s => Math.min(4, s + 1));
	const prev = () => setStep(s => Math.max(1, s - 1));

	return (
		<div style={{ padding: 16 }}>
			{/* spinner animation class is provided by src/styles/animations.css */}
			<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
				<div style={{ fontSize: 18, fontWeight: 700 }}>New Project Intake</div>
				<div>
					<button onClick={onBack} style={{ marginRight: 8 }}>&larr; Back</button>
					<button onClick={() => onDone && onDone()} style={{ background: '#111827', color: '#fff', padding: '6px 10px', borderRadius: 6, marginRight: 12 }}>Save</button>
					{/* autosave indicator with subtle cross-fade */}
					<div style={{ position: 'relative', width: 170, minHeight: 18, display: 'inline-block' }} aria-live="polite">
						{/* saving layer */}
						<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 8, color: '#f59e0b', fontSize: 13, transition: 'opacity 160ms ease, transform 160ms ease' , opacity: isSaving ? 1 : 0, transform: isSaving ? 'translateY(0px)' : 'translateY(-4px)' }}>
							<Loader2 size={14} className="gpj-spin" style={{ color: '#f59e0b' }} aria-hidden="true" />
							<span>Saving...</span>
						</div>

						{/* saved / not-saved layer */}
						<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 8, color: '#6b7280', fontSize: 13, transition: 'opacity 160ms ease, transform 160ms ease', opacity: isSaving ? 0 : 1, transform: isSaving ? 'translateY(4px)' : 'translateY(0px)' }}>
							{lastSavedAt ? `Saved ${new Date(lastSavedAt).toLocaleTimeString()}` : 'Not saved yet'}
						</div>
					</div>
				</div>
			</div>

			<div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: 8, padding: 12 }}>
				{step === 1 && (
					<div>
						<div style={{ marginBottom: 8 }}>Step 1 — Basics (stub)</div>
						<div style={{ color: '#6b7280', fontSize: 13 }}>Fields for OppID, Project Name, Client, Priority</div>
					</div>
				)}

				{step === 2 && (
					<div>
						<div style={{ marginBottom: 8 }}>Step 2 — Timeline & Venue</div>
						<PhaseTimelineContext timeline={timeline} />
						<div style={{ marginTop: 12 }}>
							<h4 style={{ margin: 0, marginBottom: 8 }}>Zones & Elements</h4>
							<ZoneEditor zones={zones} setZones={setZones} locations={mockVenues} />
						</div>
					</div>
				)}

				{step === 3 && (
					<div>
						<div style={{ marginBottom: 8 }}>Step 3 — Team & Budget</div>
						<div style={{ marginBottom: 8, color: '#6b7280', fontSize: 13 }}>Assign PM, Supervisor, Estimator</div>
						<SupervisorSelector
							team={team}
							timeline={timeline}
							oppId={null}
							onChange={(field, value) => setTeam(prev => ({ ...prev, [field]: value }))}
						/>

						<SatelliteSupervisors
							zones={zones}
							satelliteMap={satelliteMap}
							timeline={timeline}
							onChange={(key, supeId) => setSatelliteMap(prev => ({ ...prev, [key]: supeId }))}
						/>
					</div>
				)}

				{step === 4 && (
					<div>
						<h3 style={{ marginTop: 0 }}>Review & Persist</h3>
						<div style={{ marginBottom: 8, color: '#6b7280' }}>Review the JSON summary below. You can save it to localStorage, download it, or load a previously saved draft.</div>
						<div style={{ marginTop: 12 }}>
							<pre style={{ whiteSpace: 'pre-wrap', background: '#f3f4f6', padding: 12, borderRadius: 8, maxHeight: 320, overflow: 'auto' }}>{JSON.stringify(getSummary(), null, 2)}</pre>
						</div>
						<div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
							<button onClick={() => { const ok = saveToLocal(); if (ok) showToast('Saved to localStorage', { type: 'success' }); else showToast('Save failed', { type: 'error' }); }} style={{ padding: '8px 12px', borderRadius: 6, background: '#2563eb', color: '#fff' }}>Save to localStorage</button>
							<button onClick={() => { downloadJSON(); }} style={{ padding: '8px 12px', borderRadius: 6, background: '#0ea5e9', color: '#fff' }}>Download JSON</button>
							<button onClick={() => { const ok = loadFromLocal(); showToast(ok ? 'Loaded draft from localStorage' : 'No draft found', { type: ok ? 'success' : 'info' }); }} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #e5e7eb' }}>Load draft</button>
							<button onClick={() => { localStorage.removeItem(STORAGE_KEY); showToast('Cleared saved draft', { type: 'info' }); }} style={{ padding: '8px 12px', borderRadius: 6, border: '1px solid #f3f4f6' }}>Clear draft</button>
						</div>
					</div>
				)}

				<div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between' }}>
					<div>
						{step > 1 && <button onClick={() => { prev(); }} style={{ marginRight: 8 }}>Previous</button>}
						{step < 4 && <button onClick={() => next()} style={{ background: '#0ea5e9', color: '#fff', padding: '6px 10px', borderRadius: 6 }}>Next</button>}
					</div>
					<div>
						<button
							onClick={() => {
								// If there's a booking conflict and no justification, open the modal to collect one.
								if (mainHasConflict && (!team.overrideJustification || team.overrideJustification.trim().length === 0)) {
									setOverrideWarning('Selected main supervisor is booked during project dates — please provide an override justification.');
									setStep(3);
									setOpenOverrideModal(true);
									return;
								}
								// Otherwise proceed
								setOverrideWarning('');
								setStep(3);
								onDone && onDone();
							}}
							style={{ background: canFinish ? '#10b981' : '#9ca3af', color: '#fff', padding: '6px 10px', borderRadius: 6, cursor: 'pointer', opacity: canFinish ? 1 : 0.9 }}
						>
							Finish
						</button>
						{!canFinish && (
							<div style={{ marginTop: 8, color: '#ef4444', fontSize: 13 }}>Finish blocked: provide override justification for the booked supervisor.</div>
						)}
					</div>
				</div>
			</div>

			{/* Override modal */}
			<OverrideModal
				open={openOverrideModal}
				initialValue={team.overrideJustification}
				onSave={(val) => {
					setTeam(prev => ({ ...prev, overrideJustification: val }));
					setOpenOverrideModal(false);
					showToast('Override justification saved', { type: 'success' });
					// After saving justification, proceed to finalize
					setOverrideWarning('');
					setStep(4);
					onDone && onDone();
				}}
				onClose={() => setOpenOverrideModal(false)}
			/>
		</div>
	);
}
