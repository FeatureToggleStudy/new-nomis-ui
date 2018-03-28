import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import React from 'react';
import { browserHistory } from 'react-router';
import uuid from 'uuid/v4';

import EliteImage from 'containers/EliteContainers/Image';
import Name from 'components/Name';
import { DETAILS_TABS } from 'containers/Bookings/constants';

import './index.scss';

const ArrowUp = ({ sortOrderChange }) => <span className="clickable" onClick={sortOrderChange}> &#9650; </span>;
const ArrowDown = ({ sortOrderChange }) => <span className="clickable" onClick={sortOrderChange}> &#9660; </span>;

const onViewDetails = (event, row) => {
  event.preventDefault();

  browserHistory.push(`/offenders/${row.get('offenderNo')}/${DETAILS_TABS.OFFENDER_DETAILS}`)
};

const Table = ({ results, sortOrder, sortOrderChange }) => (
  <div className="booking-table">
    <div className="row">

      <div className="col-xs-3 col-md-2">
      </div>

      <div className="col-xs-4 col-md-3">
        <b> Name </b> {sortOrderChange &&
      (sortOrder === 'ASC' ? <ArrowUp sortOrderChange={sortOrderChange} /> : <ArrowDown sortOrderChange={sortOrderChange} />)}
      </div>

      <div className="col-xs-2 col-md-2">
        <b> ID </b>
      </div>

      <div className="visible-md visible-lg col-md-2">
        <b> IEP </b>
      </div>

      <div className="visible-md visible-lg col-md-1">
        <b> Age </b>
      </div>

      <div className="col-xs-3 col-md-2">
        <b> Location </b>
      </div>
    </div>

      {(results).map((row) =>
        <div className="row" key={uuid()}>
          <div className="col-xs-3 col-md-2 remove-left-padding">
            <div className="photo clickable" onClick={(e) => onViewDetails(e, row)}>
              <EliteImage imageId={row.get('facialImageId')} />
            </div>
          </div>
          <div className="col-xs-4 col-md-3 add-margin-top">
            <span>
              <div role="link" className="bold link" onClick={(e) => onViewDetails(e, row)}>
                <Name lastName={row.get('lastName')} firstName={row.get('firstName')} />
              </div>
            </span>
          </div>
          <div className="col-xs-2 col-md-2 add-margin-top">
            <span>{row.get('offenderNo')}</span>
          </div>
          <div className="visible-md visible-lg col-md-2 add-margin-top">
            <span>{row.get('iepLevel')}</span>
          </div>
          <div className="visible-md visible-lg col-md-1 add-margin-top">
            <span>{row.get('age')}</span>
          </div>
          <div className="col-xs-3 col-md-2 add-margin-top">
            <span>{row.get('assignedLivingUnitDesc')}</span>
          </div>
        </div>
    )}
    </div>
);

Table.defaultProps = {
  sortOrderChange: () => {},
}

Table.propTypes = {
  results: ImmutablePropTypes.list.isRequired,
  sortOrderChange: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
};

export default Table;
