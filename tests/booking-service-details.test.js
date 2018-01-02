const sinon = require('sinon');
const chai = require('chai'),
  expect = chai.expect;
const sinonChai = require('sinon-chai');

const elite2Api = require('../server/elite2Api');
const bookingService = require('../server/services/booking');

chai.use(sinonChai);

describe('Booking Service Booking details', () => {
  let sandbox;
  const req = {
    params: {
      bookingId: 1,
    },
  };

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
    sandbox.stub(elite2Api, 'getDetails');
    sandbox.stub(elite2Api, 'getIepSummary');

    elite2Api.getDetails.returns({
      assessments: [{
        classification: 'basic',
        cellSharingAlertFlag: true,
      },
      ],
    });
    elite2Api.getIepSummary.returns({ iepLevel: null });
  });

  afterEach(() => sandbox.restore());

  it('should call getDetails', async () => {
    await bookingService.getBookingDetailsViewModel(req);
    expect(elite2Api.getDetails).to.be.called;
  });

  it('should call getIepSummary', async () => {
    const data = await bookingService.getBookingDetailsViewModel(req);
    expect(elite2Api.getIepSummary).to.be.called;
    expect(data.csra).to.equal('basic');
  })
});