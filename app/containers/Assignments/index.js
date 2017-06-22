import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { DW } from 'components/DesktopWrappers';
import Pagination from 'components/Pagination';
import MobileNextResultsPage from 'components/MobileNextResultsPage';
import ResultsViewToggle from 'components/ResultsViewToggle';
import ResultsViewToggleMobile from 'components/ResultsViewToggle/mobile';

import { selectDeviceFormat } from 'selectors/app';
import { viewDetails as vD } from 'containers/Bookings/actions';

import BookingsListItem from 'containers/Bookings/Results/BookingsListItem';
import BookingsGridItem from 'containers/Bookings/Results/BookingsGridItem';
import { BookingList, BookingGrid } from 'containers/Bookings/Results/results.theme';

import AssignmentsHeader from 'components/AssignmentsHeader';
import AssignmentsHeaderMobile from 'components/AssignmentsHeader/mobile';
import { selectUser } from '../Authentication/selectors';

import { setAssignmentsPagination, setAssignmentsView } from './actions';

import { selectAssignmentResults, selectAssignmentTotal, selectAssignmentPagination, selectAssignmentsView } from './selectors';


class Assignments extends PureComponent { // eslint-disable-line react/prefer-stateless-function

  render() {
    const { deviceFormat, searchOptions, searchQuery, viewDetails, totalResults, pagination, setPage, resultsView, setResultsView, user } = this.props; //eslint-disable-line
    const { perPage: pP } = pagination;
    return (
      <DW>
        { deviceFormat === 'desktop' ?
          <AssignmentsHeader resultsViewToggle={<ResultsViewToggle resultsView={resultsView} setResultsView={setResultsView} />} user={user} options={{ assignments: totalResults }} />
          :
          <div>
            <AssignmentsHeaderMobile user={user} options={{ assignments: totalResults }} />
            <ResultsViewToggleMobile resultsView={resultsView} setResultsView={setResultsView} />
          </div>
        }

        {/* <div>{Array(Math.ceil(totalResults / pP)).fill(0).map((_, id) => <div onClick={() => { setPage({ perPage: pP, pageNumber: id }); }}>{id}</div>)}</div> */}

        {resultsView === 'List' ?
          <BookingList>
            {this.props.results ? this.props.results.map((data) => <BookingsListItem key={data.bookingId} data={data} action={viewDetails} />) : null}
          </BookingList> :
          <BookingGrid>
            {this.props.results ? this.props.results.map((data) => <BookingsGridItem key={data.bookingId} data={data} action={viewDetails} />) : null}
          </BookingGrid>
        }
        { deviceFormat === 'desktop' ?
          <Pagination pagination={pagination} totalRecords={totalResults} pageAction={(id) => { setPage({ perPage: pP, pageNumber: id }); }} /> :
          <MobileNextResultsPage pagination={pagination} totalRecords={totalResults} pageAction={(id) => { setPage({ perPage: pP, pageNumber: id }); }} />
        }
      </DW>
    );
  }
}

Assignments.propTypes = {
  deviceFormat: PropTypes.string,
  results: PropTypes.array.isRequired,
  viewDetails: PropTypes.func.isRequired,
  // searchOptions: PropTypes.array,
  searchQuery: PropTypes.object,
  totalResults: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  resultsView: PropTypes.string.isRequired,
  setResultsView: PropTypes.func.isRequired,
};

Assignments.defaultProps = {
  deviceFormat: 'desktop',
  searchOptions: [],
  totalResults: 0,
  searchQuery: {},
  user: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    viewDetails: (bookingId) => dispatch(vD(bookingId, true)),
    setPage: (pagination) => dispatch(setAssignmentsPagination(pagination)),
    setResultsView: (view) => dispatch(setAssignmentsView(view)),
  };
}

const mapStateToProps = createStructuredSelector({
  deviceFormat: selectDeviceFormat(),
  results: selectAssignmentResults(),
  totalResults: selectAssignmentTotal(),
  pagination: selectAssignmentPagination(),
  resultsView: selectAssignmentsView(),
  user: selectUser(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(Assignments);