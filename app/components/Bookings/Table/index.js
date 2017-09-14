import PropTypes from 'prop-types';
import React from 'react';
import { FormattedDate } from 'react-intl';

import EliteImage from 'containers/EliteContainers/Image';
import Name from 'components/Name';
import './index.scss';

const ArrowUp = ({ sortOrderChange }) => <span className="clickable" onClick={sortOrderChange}> &#9650; </span>;
const ArrowDown = ({ sortOrderChange }) => <span className="clickable" onClick={sortOrderChange}> &#9660; </span>;

const onViewDetails = (e, row, viewDetails) => {
  e.preventDefault(e);
  viewDetails(row.bookingId);
};

const Table = ({ results, viewDetails, sortOrder, sortOrderChange }) => (
  <table className="booking-table">
    <thead>
      <tr>
        <th> </th>
        <th> <span> Name </span> {sortOrderChange &&
          (sortOrder === 'asc' ? <ArrowUp sortOrderChange={sortOrderChange} /> : <ArrowDown sortOrderChange={sortOrderChange} />)
        }
        </th>
        <th className="visible-md visible-lg"> Aliases</th>
        <th className="visible-md visible-lg"> Date of birth</th>
        <th> ID </th>
        <th> Location </th>
      </tr>
    </thead>
    <tbody>
      {(results || []).map((row) =>
        <tr key={row.bookingId}>
          <td>
            <div className="photo clickable" onClick={(e) => onViewDetails(e, row, viewDetails)}>
              <EliteImage imageId={row.facialImageId} />
            </div>
          </td>
          <td>
            <span>
              <a href="#" className="bold link" onClick={(e) => onViewDetails(e, row, viewDetails)}>
                <Name lastName={row.lastName} firstName={row.firstName} />
              </a>
            </span>
          </td>
          <td className="visible-md visible-lg">
            {(row.aliases || []).map((name) =>
              <div className="row" key={name + row}>
                <span key={name}>
                  <Name name={name} />
                </span>
              </div>)}
          </td>
          <td className="visible-md visible-lg">
            <FormattedDate value={Date.parse(row.dateOfBirth)} />
          </td>
          <td><span>{row.offenderNo}</span></td>
          <td><span>{row.assignedLivingUnitDesc}</span></td>
        </tr>
    )}
    </tbody>
  </table>
);

Table.propTypes = {
  results: PropTypes.array.isRequired,
  viewDetails: PropTypes.func.isRequired,
  sortOrderChange: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,

};

export default Table;
