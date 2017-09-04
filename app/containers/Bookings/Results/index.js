import React, {Component } from 'react';
import PropTypes from 'prop-types';

import './index.scss';

import { createStructuredSelector } from 'reselect';
import PreviousNextNavigation from 'components/PreviousNextNavigation';
import BookingTable from 'components/Bookings/Table';
import BookingGrid from 'components/Bookings/Grid';
import { selectBookingsSearch } from 'containers/ConfigLoader/selectors';

import { connect } from 'react-redux';

import SearchAgainForm from './SearchForm'
import { selectDeviceFormat } from 'selectors/app';
import NavLink from 'components/NavLink';
import NoSearchResultsReturnedMessage from 'components/NoSearchResultsReturnedMessage';

import {
  selectSearchResultsV2,
  selectSearchQuery,
  selectSearchResultsTotalRecords,
  selectSearchResultsPagination,
  selectResultsView,
  selectLocations,
  selectSearchResultsSortOrder
} from '../selectors';

import{
  viewDetails as vD,
  setPagination as sP,
  setResultsView,
  loadLocations,
  toggleSortOrder
} from '../actions';

import ResultsViewToggle from 'components/ResultsViewToggle';
import { setSearchContext } from 'globalReducers/app';


const ResultsViewBuilder = ({viewName,results,onViewDetails,sortOrderChange,sortOrder}) => {
  return viewName === 'List' ?
    <BookingTable results={results} viewDetails={onViewDetails} sortOrderChange={sortOrderChange} sortOrder={sortOrder}/> :
    <BookingGrid results={results} viewDetails={onViewDetails} sortOrderChange={sortOrderChange} sortOrder={sortOrder}/>
}

class SearchResults extends Component { // eslint-disable-line react/prefer-stateless-function

  componentWillMount() {
    this.props.setSearchContext('search');
    this.props.loadLocations();
  }

  render() {
    const {locations, sortOrder,toggleSortOrder,viewDetails,results, deviceFormat, searchOptions, searchQuery, totalResults, pagination, setPage, resultsView, setResultsView } = this.props; //eslint-disable-line
    const { perPage: pP, pageNumber: pN } = pagination;

    return (
      <div className="booking-search">
        <div className="mobile-only">
          <NavLink route="/" key="Home" text="Home"/>
        </div>

        <div className="row">
          <h1 className="heading-xlarge"> Search results </h1>
          <SearchAgainForm locations={locations} />
        </div>

        <div className="row toggleAndCountView">
           {totalResults > 0 ?
             <div>
               <ResultsViewToggle resultsView={resultsView} setResultsView={setResultsView} />
               <div>{Math.min((pP * pN) + 1, totalResults)} - {Math.min(pP * (pN + 1), totalResults)} of {totalResults} results</div>
             </div>
             : null}
        </div>

        <div className="row">

         <NoSearchResultsReturnedMessage resultCount={results.length} />

          {totalResults > 0 ?
            <ResultsViewBuilder
              viewName={resultsView}
              results={results}
              onViewDetails={viewDetails}
              sortOrderChange={toggleSortOrder}
              sortOrder={sortOrder}/>
            : null
          }

        </div>

        <div className="row">
          <PreviousNextNavigation pagination={pagination} totalRecords={totalResults} pageAction={(id) => { setPage({ perPage: pP, pageNumber: id }); }} />
        </div>

      </div>
    );
  }
}

SearchResults.propTypes = {
  deviceFormat: PropTypes.string,
  results: PropTypes.array.isRequired,
  viewDetails: PropTypes.func.isRequired,
  searchOptions: PropTypes.array,
  searchQuery: PropTypes.object,
  totalResults: PropTypes.number,
  pagination: PropTypes.object.isRequired,
  setPage: PropTypes.func.isRequired,
  resultsView: PropTypes.string,
  setResultsView: PropTypes.func,
  setSearchContext: PropTypes.func,
  locations: PropTypes.array
};

SearchResults.defaultProps = {
  deviceFormat: 'desktop',
  searchOptions: [],
  totalResults: 0,
  searchQuery: {},
  resultsView: 'List',
  setResultsView: () => {},
  setSearchContext: () => {},
  locations: []
};

export function mapDispatchToProps(dispatch) {
  return {
    viewDetails: (bookingId) => dispatch(vD(bookingId)),
    setPage: (pagination) => dispatch(sP(pagination)),
    setResultsView: (pagination) => dispatch(setResultsView(pagination)),
    setSearchContext: (context) => dispatch(setSearchContext(context)),
    loadLocations: () => dispatch(loadLocations()),
    toggleSortOrder: () => dispatch(toggleSortOrder())
  }
};

const mapStateToProps = createStructuredSelector({
  deviceFormat: selectDeviceFormat(),
  results: selectSearchResultsV2(),
  searchOptions: selectBookingsSearch(),
  searchQuery: selectSearchQuery(),
  totalResults: selectSearchResultsTotalRecords(),
  pagination: selectSearchResultsPagination(),
  resultsView: selectResultsView(),
  locations: selectLocations(),
  sortOrder: selectSearchResultsSortOrder()
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
