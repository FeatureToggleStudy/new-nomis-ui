const momentTimeZone = require('moment-timezone');

const isoDateTimeFormat = require('../constants').isoDateTimeFormat;

const visitStatusCodes = {
  cancelled: 'CANC',
  cancelledOutcome: 'CAN',
  attended: 'ATT',
  scheduled: 'SCH',
};

const toVisit = (visit) => {
  const nameParts = visit.leadVisitor && visit.leadVisitor.split(' ');
  const toName = (value) => value && value.split('').map((letter,index) => index === 0 ? letter.toUpperCase() : letter.toLowerCase()).join('');

  const leadVisitorName = nameParts && `${toName(nameParts[0])} ${toName(nameParts[1])}`;
  const leadVisitorRelationship = visit.relationshipDescription ? ` (${visit.relationshipDescription})` : '';

  return {
    leadVisitor: (leadVisitorName) && `${leadVisitorName}${leadVisitorRelationship}`,
    date: visit.startTime,
    type: visit.visitTypeDescription,
  };
};

const calculateStatus = (visit) => {
  const bst = 'Europe/London';
  const now = momentTimeZone.tz(bst);
  const startTime = momentTimeZone.tz(visit.startTime, isoDateTimeFormat, bst);
  const endTime = momentTimeZone.tz(visit.endTime, isoDateTimeFormat, bst);

  if (visit.eventStatus === visitStatusCodes.scheduled && now.isAfter(startTime) && now.isBefore(endTime)) {
    return 'Ongoing';
  }
  return visit.eventStatus === visitStatusCodes.cancelled
    ? visit.eventStatusDescription : visit.eventOutcomeDescription;
};

const toLastVisit = (visit) => {
  if (visit.eventStatus !== visitStatusCodes.cancelled &&
    visit.eventOutcome !== visitStatusCodes.attended &&
    visit.eventOutcome !== visitStatusCodes.scheduled &&
    visit.eventOutcome !== visitStatusCodes.cancelledOutcome) {
    return null;
  }

  const status = calculateStatus(visit);

  const isCancelledVisit = visit.eventStatus === visitStatusCodes.cancelled ||
    visit.eventOutcome === visitStatusCodes.cancelledOutcome;

  return {
    ...toVisit(visit),
    status,
    cancellationReason: isCancelledVisit && visit.cancelReasonDescription,
  }
};


module.exports = {
  toLastVisit,
  toVisit,
};