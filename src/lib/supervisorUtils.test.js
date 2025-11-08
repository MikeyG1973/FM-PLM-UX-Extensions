import { describe, it, expect } from 'vitest';
import { checkSupervisorConflict } from './supervisorUtils';

describe('checkSupervisorConflict', () => {
  it('detects a conflict when project dates overlap a booking', () => {
    const timeline = {
      installStart: '2025-03-05',
      installStartTime: '08:00',
      dismantleEnd: '2025-03-15',
      dismantleEndTime: '18:00',
    };

    // supervisor id 2 in mock data is booked 2025-03-01 -> 2025-03-20
    const conflict = checkSupervisorConflict(2, timeline);
    expect(conflict).toBe(true);
  });

  it('returns false when there is no overlap', () => {
    const timeline = {
      installStart: '2025-04-05',
      installStartTime: '08:00',
      dismantleEnd: '2025-04-10',
      dismantleEndTime: '18:00',
    };

    // supervisor id 2 booking is in March, so April dates do not overlap
    const conflict = checkSupervisorConflict(2, timeline);
    expect(conflict).toBe(false);
  });
});
