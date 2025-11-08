import { mockSupervisors } from '../data/mockData';

const formatDate = (dateString, timeString = '00:00') => {
  if (!dateString) return null;
  return new Date(`${dateString}T${timeString}:00`);
};

export function checkSupervisorConflict(supervisorId, timeline) {
  const supe = mockSupervisors.find(s => s.id === supervisorId);
  if (!supe || !supe.bookedDates || supe.bookedDates.length === 0) return false;

  const projectStart = formatDate(timeline.installStart, timeline.installStartTime);
  const projectEnd = formatDate(timeline.dismantleEnd, timeline.dismantleEndTime);
  if (!projectStart || !projectEnd) return false;

  return supe.bookedDates.some(booking => {
    const bookedStart = formatDate(booking.start, '00:00');
    const bookedEnd = formatDate(booking.end, '23:59');
    return (projectStart < bookedEnd && projectEnd > bookedStart);
  });
}

export function checkSupervisorExpertiseConflict(supervisorId, oppId, opportunityData=[]) {
  if (!supervisorId) return null;
  const supe = mockSupervisors.find(s => s.id === supervisorId);
  const opp = opportunityData.find(o => o.id === oppId);
  if (!supe || !opp) return null;

  if (opp.name.match(/Conf|Dreamforce|NEXT|Keynote/i)) {
    if (!supe.expertise.includes('Large Conference Lead')) {
      return `Project looks like a large conference. ${supe.name} specializes in ${supe.expertise}. Consider a Large Conference Lead.`;
    }
  }
  return null;
}
