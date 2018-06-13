import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { FormattedDate } from 'components/intl';
import moment from 'moment';
import { List } from 'immutable';
import uuid from 'uuid/v4';

import { Model as offenderDetailsModel } from 'helpers/dataMappers/offenderDetails';

import {
  loadScheduledEventsForThisWeek,
  loadScheduledEventsForNextWeek,
  viewDetails,
} from 'containers/Bookings/actions';

import {
  DETAILS_TABS,
} from 'containers/Bookings/constants';

import { properCase } from 'utils/stringUtils';

import './index.scss';

export const Event = ({ startTime, endTime, type, shortComment }) =>
  (<div className="row add-gutter-margin-bottom">

    <div className="col-xl-5 col-lg-3 col-md-6 col-xs-6">
      <span className="whereabouts-startTime">
        {moment(startTime).format('HH:mm')}
      </span>

      {endTime &&
        <span>
          <span className="separator">-</span>
          <span className="whereabouts-endTime"> {moment(endTime).format('HH:mm')} </span>
        </span>
      }
    </div>

    <div className="col-xl-7 col-lg-9 col-md-6 col-xs-6">

      <span>
        <b> {type} </b>
        {shortComment && <b>{' - '}</b>}
      </span>

      <span>
        {shortComment}
      </span>

    </div>
  </div>)


export const DayAndDate = ({ value }) => (<h1 className="heading-medium whereabouts-day-header">
  {moment(value).format('dddd')}
</h1>)

class ScheduledEvents extends Component {
  componentDidMount() {
    const { loadThisWeeksScheduledEvents, offenderNo, loadBookingDetails } = this.props;
    loadBookingDetails(offenderNo);
    loadThisWeeksScheduledEvents(offenderNo);
  }

  render() {
    const scheduledEvents = this.props.scheduledEvents;

    if (!scheduledEvents && !scheduledEvents) {
      return null;
    }

    const {
      loadThisWeeksScheduledEvents,
      loadNextWeeksScheduledEvents,
      offenderNo,
      currentFilter } = this.props;

    const { thisWeek, nextWeek } = currentFilter.toJS();
    const { firstName, lastName } = this.props.offenderDetails;

    return (<div className="whereabouts">

      <h1 className="heading-large"> Schedule for {`${properCase(firstName)} ${properCase(lastName)}`} </h1>

      <div className="row filters">

        <div className="col-xs-6 col-lg-2 no-left-gutter">
          <div className="form-group">
            <div className="multiple-choice">
              <input
                checked={thisWeek && 'checked'}
                type="radio"
                name="radio-inline-group"
                value="Yes"
                onClick={() => loadThisWeeksScheduledEvents(offenderNo)}
                onChange={(event) => event.preventDefault()}
              >
              </input>
              <label>This week</label>
            </div>
          </div>
        </div>
        <div className="col-xs-6 col-lg-2 no-left-gutter">
          <div className="multiple-choice">
            <input
              checked={nextWeek && 'checked'}
              type="radio"
              name="radio-inline-group"
              value="Yes"
              onClick={() => loadNextWeeksScheduledEvents(offenderNo)}
              onChange={(event) => event.preventDefault()}
            >
            </input>
            <label>Next week</label>
          </div>
        </div>

      </div>

      <div className="row hidden-lg-down">
        <div className="col-lg-2"></div>
        <div className="col-lg-3">
          <h1 className="heading-medium">Morning (AM)</h1>
        </div>
        <div className="col-lg-3">
          <h1 className="heading-medium">Afternoon (PM)</h1>
        </div>
        <div className="col-lg-3">
          <h1 className="heading-medium">Evening Duty (ED)</h1>
        </div>
      </div>
      {scheduledEvents.map((entry) =>

        (<div className="row appointment-row" key={uuid()}>
          <div className="appointments">
            <div className="col-lg-2 no-left-gutter">
              <DayAndDate
                className="whereabouts-day-header"
                value={entry.get('date')}
              />
              <FormattedDate
                className="heading-medium whereabouts-date-header"
                value={entry.get('date')}
                month="long"
                day="2-digit"
              />
            </div>

            <div className="visible-lg-down add-gutter-top">
              <div className="col-lg-12">
                <b>Morning (AM)</b>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="appointment morning add-gutter-top add-gutter-bottom">
                  {entry.get('morningActivities').map((morning) => (<div key={uuid()}>
                  <Event
                    startTime={morning.get('startTime')}
                    endTime={morning.get('endTime')}
                    type={morning.get('type')}
                    shortComment={morning.get('shortComment')}
                  />
                </div>))}
              </div>
            </div>


            <div className="visible-lg-down add-gutter-top add-gutter-bottom">
              <div className="col-lg-12">
                <b>Afternoon (PM)</b>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="appointment afternoon add-gutter-top">
                {entry.get('afternoonActivities').map((afternoon) => (<div key={uuid()}>
                  <Event
                    startTime={afternoon.get('startTime')}
                    endTime={afternoon.get('endTime')}
                    type={afternoon.get('type')}
                    shortComment={afternoon.get('shortComment')}
                  />
                </div>))}
              </div>
            </div>


            <div className="visible-lg-down add-gutter-top add-gutter-bottom">
              <div className="col-lg-12">
                <b>Evening Duty (ED)</b>
              </div>
            </div>

            <div className="col-lg-3">
              <div className="appointment ed add-gutter-top">
                {entry.get('eveningDuties').map((afternoon) => (<div key={uuid()}>
                  <Event
                    startTime={afternoon.get('startTime')}
                    endTime={afternoon.get('endTime')}
                    type={afternoon.get('type')}
                    shortComment={afternoon.get('shortComment')}
                  />
                </div>))}
              </div>
            </div>

          </div>

        </div>))}
    </div>)
  }
}
export function mapDispatchToProps(dispatch) {
  return {
    loadThisWeeksScheduledEvents: (offenderNo) => dispatch(loadScheduledEventsForThisWeek(offenderNo)),
    loadNextWeeksScheduledEvents: (offenderNo) => dispatch(loadScheduledEventsForNextWeek(offenderNo)),
    loadBookingDetails: (offenderNo) => dispatch(viewDetails(offenderNo, DETAILS_TABS.SCHEDULED)),
  }
}

const mapStateToProps = (immutableState, props) => {
  const offenderNo = props.params.offenderNo;
  const scheduledEvents = immutableState.getIn(['search', 'details', 'scheduledEvents']) || List([]);
  const offenderDetails = immutableState.getIn(['eliteApiLoader', 'Bookings', 'Details', offenderNo, 'Data']) || offenderDetailsModel;
  const offenderName = { firstName: offenderDetails.get('firstName'), lastName: offenderDetails.get('lastName') }
  const currentFilter = immutableState.getIn(['search', 'details', 'currentFilter']);

  return {
    offenderNo,
    scheduledEvents,
    offenderDetails: offenderName,
    currentFilter,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(ScheduledEvents);
