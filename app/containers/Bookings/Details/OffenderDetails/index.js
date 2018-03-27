import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid/v4';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import EliteImage from 'containers/EliteContainers/Image/index';
import { toFullName } from 'utils/stringUtils';
import DisplayValue from 'components/FormComponents/DisplayValue';
import { FormattedDate } from 'react-intl';
import { Model as offenderDetailsModel } from 'helpers/dataMappers/offenderDetails';

import { selectOffenderDetails } from '../../selectors';
import { showLargePhoto } from '../../actions';

import './index.scss'

const FormatValue = ({ start, end }) => ((start && <span> { (start && end && `${start} ${end}`) || `${start}`} </span>) || <span>{'--'}</span>);
const Alias = ({ lastName, firstName }) => <span> {toFullName({ lastName, firstName })} </span>

const OffenderDetails = ({ offenderDetails, showPhoto }) => {
  const marksGroupedIntoPairs = groupByPairs(offenderDetails.get('physicalMarks').toJS());
  const characteristicsGroupedIntoPairs = groupByPairs(offenderDetails.get('physicalCharacteristics').toJS());
  const physicalAttributes = offenderDetails.get('physicalAttributes');

  return (
    <div className="offender-details">
      <div className="row">
          <div className="col-md-6">

            <div className="row">
                <h3 className="heading-medium top-heading">Personal details</h3>
            </div>

            <div className="row border-bottom-line">

              <div className="col-md-6 col-xs-6">
                <label>Date of birth</label>
              </div>

              <div className="col-md-6 col-xs-6">
                {offenderDetails.get('dateOfBirth') && <b> <FormattedDate value={offenderDetails.get('dateOfBirth')} /> </b>}
              </div>
            </div>

            <div className="row border-bottom-line">

              <div className="col-md-6 col-xs-6">
                <label>Age</label>
              </div>

              <div className="col-md-6 col-xs-6">
                <b> <DisplayValue value={offenderDetails.get('age')} /> </b>
              </div>

            </div>

            <div className="row border-bottom-line">

              <div className="col-md-6 col-xs-6">
                <label>Gender</label>
              </div>

              <div className="col-md-6 col-xs-6">
                <b> <DisplayValue value={physicalAttributes.get('gender')} /> </b>
              </div>

            </div>

            <div className="row border-bottom-line">

              <div className="col-md-6 col-xs-6">
                <label>Ethnicity</label>
              </div>

              <div className="col-md-6 col-xs-6">
                <b> <DisplayValue value={physicalAttributes.get('ethnicity')} /> </b>
              </div>

            </div>

            <div className="row border-bottom-line">
              <div className="col-lg-6 col-xs-6">
                <label>Religion</label>
              </div>
              <div className="col-lg-6 col-xs-6">
                <b>
                  <DisplayValue value={offenderDetails.get('religion')} />
                </b>
              </div>
            </div>

          </div>

        <div className="col-md-6">

          <div className="row">
              <h3 className="heading-medium"> Aliases </h3>
          </div>

          {offenderDetails.get('aliases') && offenderDetails.get('aliases').size === 0 && <div> -- </div>}

          {offenderDetails.get('aliases').map(alias =>
          <div className="row border-bottom-line" key={uuid()}>
              <div className="col-md-6 col-xs-12">
                <b>
                  <Alias firstName={alias.get('firstName')} lastName={alias.get('lastName')} />
                </b>
              </div>
            </div>)}

          </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <h3 className="heading-medium">Physical characteristics</h3>
        </div>
      </div>

      <div className="desktop">
        <div className="row border-bottom-line">

          <div className="col-md-3 col-xs-6">
            <label>Height</label>
          </div>

          <div className="col-md-3 col-xs-6">
              <b>
                <FormatValue start={offenderDetails.getIn(['physicalAttributes','heightMetres'])} end="metres" />
              </b>
          </div>

            <div className="col-md-3 col-xs-6">
              <label>Weight</label>
            </div>

            <div className="col-md-3 col-xs-6">
              <b>
                <FormatValue start={offenderDetails.getIn(['physicalAttributes', 'weightKilograms'])} end="kg" />
              </b>
            </div>
        </div>
      </div>

      <div className="mobile">
        <div className="row border-bottom-line">

          <div className="col-md-3 col-xs-6">
            <label>Height</label>
          </div>

          <div className="col-md-3 col-xs-6">
            <b>
              <FormatValue start={offenderDetails.getIn(['physicalAttributes', 'heightMetres'])} end="metres" />
            </b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3 col-xs-6">
            <label>Weight</label>
          </div>

          <div className="col-md-3 col-xs-6">
            <b>
              <FormatValue start={offenderDetails.getIn(['physicalAttributes','weightKilograms'])} end="kg" />
            </b>
          </div>

        </div>
      </div>

      <div className="desktop">
          {characteristicsGroupedIntoPairs.map(pair =>
            <div className="row border-bottom-line" key={uuid()}>
              {pair.map(info => (
                <div key={uuid()}>
                  <div className="col-md-3 col-xs-6">
                    <label>{info.characteristic}</label>
                  </div>

                  <div className="col-md-3 col-xs-6">
                      <b>
                        <FormatValue start={info.detail} />
                      </b>
                    </div>
                </div>
                  ))}
            </div>
          )}
      </div>

      <div className="mobile">
        {characteristicsGroupedIntoPairs.map(pair =>
          <div key={uuid()}>
            {pair.map(info => (
              <div key={uuid()}>

                <div className="row border-bottom-line col-md-3 col-xs-6">
                  <label>{info.characteristic}</label>
                </div>

                <div className="row border-bottom-line col-md-3 col-xs-6">
                  <b>
                    <FormatValue start={info.detail} />
                  </b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {marksGroupedIntoPairs.length > 0 && <div className="row">
        <div className="col-xs-12">
            <h3 className="heading-medium">
              Distinguishing marks
            </h3>
        </div>
      </div> }


      {marksGroupedIntoPairs.map((pairs) =>

        <div className="row" key={uuid()}>
          { pairs.map((mark,index) =>
            <div className="col-md-6" key={uuid()}>

            <div className="row border-bottom-line">
              <div className="col-md-6 col-xs-6">
                <label>Type</label>
              </div>

              <div className="col-md-6 col-xs-6">
                <b>{mark.type}</b>
              </div>
            </div>

            <div className="row border-bottom-line">
              <div className="col-md-6 col-xs-6">
                <label>Body part</label>
              </div>

              <div className="col-md-6 col-xs-6">
                <b>{mark.bodyPart}</b>
              </div>
            </div>

              <div className="row border-bottom-line">
                <div className="col-md-6 col-xs-6">
                  <label>Comment</label>
                </div>

                <div className="col-md-6 col-xs-6">
                  <b>{mark.comment}</b>
                </div>
              </div>

              { mark.imageId && <div className="row">
                <div className="col-md-6 col-xs-6">
                  <label>Visual</label>
                </div>

                <div className="col-md-6 col-xs-6">
                  <div className="photo clickable" onClick={() => showPhoto(mark.imageId)}>
                    { (mark.imageId && <EliteImage imageId={mark.imageId} />) || '--'}
                  </div>
                </div>
              </div>
              }
          </div>)}

        </div>
      )}
    </div>
  );
}

const groupByPairs = (dataset) => dataset.reduce((result, value, index, array) => {
  if (index % 2 === 0) { result.push(array.slice(index, index + 2)); }
  return result;
}, []);

OffenderDetails.propTypes = {
  offenderDetails: ImmutablePropTypes.map,
};

export function mapDispatchToProps(dispatch) {
  return {
    showPhoto: (imageId) => dispatch(showLargePhoto(imageId)),
  };
}

const mapStateToProps = (immutableState, props) => {
  const offenderDetails = immutableState.getIn(['eliteApiLoader', 'Bookings', 'Details', props.bookingId.toString(), 'Data']) || offenderDetailsModel;

  return {
    offenderDetails,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OffenderDetails);
