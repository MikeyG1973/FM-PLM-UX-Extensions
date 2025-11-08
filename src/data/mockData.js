// Minimal mock data used by demo components (incrementally expandable)
export const mockSupervisors = [
  { id: 1, name: 'Maria Chen (Lead)', status: 'AVAILABLE', expertise: 'Large Conference Lead', clients: ['Google', 'Oracle'], bookedDates: [] },
  { id: 2, name: 'Ben Smith (Lead)', status: 'BOOKED', expertise: 'Fabrication Lead', clients: ['Microsoft', 'Cisco'], bookedDates: [{ show: 'Cisco Live', client: 'Cisco', start: '2025-03-01', end: '2025-03-20' }] },
  { id: 3, name: 'Jose Perez (Junior)', status: 'SHOP LEAD', expertise: 'Technical Lead', clients: ['Dell'], bookedDates: [] },
  { id: 4, name: 'Dave Johnson (Lead)', status: 'ON ROAD', expertise: 'Large Conference Lead', clients: ['Google', 'Oracle'], bookedDates: [{ show: 'Google NEXT', client: 'Google', start: '2025-03-10', end: '2025-03-25' }] },
  { id: 5, name: 'Frank Williams (Lead)', status: 'AVAILABLE', expertise: 'Fabrication Lead', clients: ['Microsoft'], bookedDates: [] },
];

export const mockOpportunityData = [
  { id: 'OPP-2025-04-A1', name: 'Acme Sales Conf 2025', client: 'Acme Corporation', status: 'Approved', priority: 'Standard' },
];

export const mockProjectList = [
  { id: 1, name: 'Acme Corp - Sales Conference 2025', status: 'draft', client: 'Acme Corporation', budget: '$150,000', lastSaved: '2 hours ago', priority: 'Standard', projectNumber: 'PROJ-100', oppId: 'OPP-2025-04-A1' },
];

export const mockVenues = [
  { id: 'jvc', name: 'Jacob Javits Center, NYC', halls: ['Main Exhibition Hall', 'River Pavilion', 'Meeting Rooms 1A-1E'] },
  { id: 'lacc', name: 'Los Angeles Convention Center', halls: ['South Hall', 'West Hall', 'Concourse Halls'] },
  { id: 'venetian', name: 'The Venetian, Las Vegas', halls: ['Venetian Ballroom', 'Palazzo Ballroom', 'Sands Expo Center'] },
];
