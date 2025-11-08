import { describe, it, expect } from 'vitest';
import { checkSupervisorExpertiseConflict } from './supervisorUtils';
import { mockOpportunityData } from '../data/mockData';

describe('checkSupervisorExpertiseConflict', () => {
  it('returns a warning string when the supervisor lacks Large Conference Lead expertise for a conference-like opp', () => {
    // opp id in mockOpportunityData is 'OPP-2025-04-A1' with name containing 'Conf'
    const msg = checkSupervisorExpertiseConflict(2, 'OPP-2025-04-A1', mockOpportunityData);
    expect(typeof msg).toBe('string');
    expect(msg).toMatch(/Large Conference Lead/);
  });

  it('returns null when supervisor has Large Conference Lead expertise', () => {
    const msg = checkSupervisorExpertiseConflict(1, 'OPP-2025-04-A1', mockOpportunityData);
    expect(msg).toBeNull();
  });
});
