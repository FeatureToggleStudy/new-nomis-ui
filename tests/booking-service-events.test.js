const sinon = require('sinon');
const chai = require('chai'),
  expect = chai.expect;
const sinonChai = require('sinon-chai');
const moment = require('moment');

const isoDateFormat = require('./../server/constants').isoDateFormat;
const elite2Api = require('../server/elite2Api');
const bookingService = require('../server/services/booking');

chai.use(sinonChai);

describe('Booking service events', () => {
  let sandbox;
  const req = {
    params: {
      bookingId: 1,
    },
  };

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    sandbox.stub(elite2Api, 'getEventsForThisWeek');
    sandbox.stub(elite2Api, 'getEventsForNextWeek');
  });

  afterEach(() => {
    sandbox.restore()
  });


  it('should call getScheduledEventsForThisWeek and return data with a slot for each day, for 7 days starting from today', async () => {
    elite2Api.getEventsForThisWeek.returns(null);

    const startDate = moment();
    const data = await bookingService.getScheduledEventsForThisWeek(req);

    expect(data.length).to.equal(7);

    expect(data[0].date.format(isoDateFormat)).to.equal(startDate.format(isoDateFormat));
    expect(data[1].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[2].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[3].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[4].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[5].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[6].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
  });

  it('should call getScheduledEventsForNextWeek and return data with a slot for each day, for 7 days starting from next week', async () => {
    elite2Api.getEventsForThisWeek.returns(null);

    const startDate = moment().add('days', 7);
    const data = await bookingService.getScheduledEventsForNextWeek(req);

    expect(data.length).to.equal(7);
    expect(data[0].date.format(isoDateFormat)).to.equal(startDate.format(isoDateFormat));
    expect(data[1].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[2].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[3].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[4].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[5].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
    expect(data[6].date.format(isoDateFormat)).to.equal(startDate.add(1,'days').format(isoDateFormat));
  });


  it('should place events into the correct weekly calender slot', async () => {
    const today = moment();
    const threeDaysInTheFuture = moment().add(3,'days');

    elite2Api.getEventsForThisWeek.returns([
      {
        eventSourceeDesc: 'Workshop morning',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
      {
        eventSourceeDesc: 'Workshop afternoon',
        startTime: '2017-12-12T19:00:00',
        endTime: '2017-12-12T20:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },

      {
        eventSourceeDesc: 'Workshop morning',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: threeDaysInTheFuture,
      },
      {
        eventSourceeDesc: 'Workshop afternoon',
        startTime: '2017-12-12T19:00:00',
        endTime: '2017-12-12T20:00:00',
        eventStatus: 'SCH',
        eventDate: threeDaysInTheFuture,
      },
    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);

    expect(data[0].date.format(isoDateFormat)).to.equal(today.format(isoDateFormat));
    expect(data[0].forMorning.length).to.equal(1);
    expect(data[0].forAfternoon.length).to.equal(1);

    expect(data[3].date.format(isoDateFormat)).to.equal(threeDaysInTheFuture.format(isoDateFormat));
    expect(data[3].forMorning.length).to.equal(1);
    expect(data[3].forAfternoon.length).to.equal(1);
  });

  it('should use eventSourceDesc to indicate the type for activities only', async () => {
    const today = moment().format('YYYY-MM-DD');
    elite2Api.getEventsForThisWeek.returns([
      {
        eventSubType: 'PA',
        eventSubTypeDesc: 'Prison Activity',
        eventSourceDesc: 'Wing cleaner',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);
    expect(data[0].forMorning[0].type).to.equal('Wing cleaner');
  });

  it('should use the eventSubTypeDesc when eventSourceDesc is missing', async () => {
    const today = moment().format('YYYY-MM-DD');
    elite2Api.getEventsForThisWeek.returns([
      {
        eventSubTypeDesc: 'Prison Activity',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);
    expect(data[0].forMorning[0].type).to.equal('Prison Activity');
  });


  it('should format the event with the following subTypeDesc - sourceTypeDesc ', async () => {
    const today = moment().format('YYYY-MM-DD');

    elite2Api.getEventsForThisWeek.returns([
      {
        eventType: 'NOT_PA',
        eventSubTypeDesc: 'appointment',
        eventSourceDesc: 'health check up',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);

    expect(data[0].forMorning[0].type).to.equal('appointment');
    expect(data[0].forMorning[0].comment).to.equal('health check up');
  });

  it('should show use eventSourceDesc for an activities type', async () => {
    const today = moment().format('YYYY-MM-DD');

    elite2Api.getEventsForThisWeek.returns([
      {
        eventType: 'NOT_PA',
        eventSubTypeDesc: 'appointment',
        eventSourceDesc: 'health check up',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);

    expect(data[0].forMorning[0].type).to.equal('appointment');
    expect(data[0].forMorning[0].comment).to.equal('health check up');
  });

  it('should order events by start time then by end time', async () => {
    const today = moment().format('YYYY-MM-DD');

    elite2Api.getEventsForThisWeek.returns([
      {
        eventType: 'NOT_PA',
        eventSubTypeDesc: 'appointment',
        eventSourceDesc: 'health check up',
        startTime: '2017-12-12T09:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
      {
        eventType: 'NOT_PA',
        eventSubTypeDesc: 'appointment',
        eventSourceDesc: 'health check up',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T11:30:00',
        eventStatus: 'SCH',
        eventDate: today,
      },
      {
        eventType: 'NOT_PA',
        eventSubTypeDesc: 'appointment',
        eventSourceDesc: 'health check up',
        startTime: '2017-12-12T09:00:00',
        endTime: '2017-12-12T10:00:00',
        eventStatus: 'SCH',
        eventDate: today,
      },

    ]);

    const data = await bookingService.getScheduledEventsForThisWeek(req);

    expect(data[0].forMorning[0].startTime).to.equal('2017-12-12T09:00:00');
    expect(data[0].forMorning[0].endTime).to.equal(undefined);

    expect(data[0].forMorning[1].startTime).to.equal('2017-12-12T09:00:00');
    expect(data[0].forMorning[1].endTime).to.equal('2017-12-12T10:00:00');

    expect(data[0].forMorning[2].startTime).to.equal('2017-12-12T09:00:00');
    expect(data[0].forMorning[2].endTime).to.equal('2017-12-12T11:30:00');
  });
});