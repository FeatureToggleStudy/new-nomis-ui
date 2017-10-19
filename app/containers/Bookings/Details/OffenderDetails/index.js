import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import EliteImage from 'containers/EliteContainers/image';

import { selectOffenderDetails } from '../../selectors';
import { showLargePhoto } from '../../actions';
import './index.scss'

const FormatValue = ({ start, end }) => ((start && `${start} ${end}`) || '--').trimEnd();

class OffenderDetails extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { offenderDetails, showPhoto } = this.props;
    const { dateOfBirth, age, gender, ethnicity, physicalAttributes,physicalCharacteristics, physicalMarks } = offenderDetails;

    const marksGroupedIntoPairs = physicalMarks.reduce((result, value, index, array) => {
      if (index % 2 === 0) { result.push(array.slice(index, index + 2)); }
      return result;
    }, []);

    return (<div className="offender-details">

        <div className="row">
           <div className="col-md-6">
              <h3 className="heading-medium">Personal details</h3>
           </div>

          <div className="col-md-6">
            <h3 className="heading-medium"> Aliases </h3>
          </div>
        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
              <label>Date of birth</label>
          </div>

          <div className="col-md-3">
            <b> {dateOfBirth} </b>
          </div>

          <div className="col-md-3">
            <label>Current</label>
          </div>

          <div className="col-md-3">
            <b>--</b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Age</label>
          </div>

          <div className="col-md-3">
            <b> {age} </b>
          </div>

          <div className="col-md-3">
            <label>2010 - 2014</label>
          </div>

          <div className="col-md-3">
            <b>--</b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Gender</label>
          </div>

          <div className="col-md-3">
            <b> {gender} </b>
          </div>

          <div className="col-md-3">
            <label>2005 - 2009</label>
          </div>

          <div className="col-md-3">
            <b>--</b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Ethnicity</label>
          </div>

          <div className="col-md-3">
            <b> {ethnicity} </b>
          </div>

        </div>

        <div className="row">
          <div className="col-md-12">
            <h3 className="heading-medium">Physical characteristics</h3>
          </div>
        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Height</label>
          </div>

          <div className="col-md-3">
             <b>
               <FormatValue start={physicalAttributes.heightFeet} end="feet" />
             </b>
          </div>

          <div className="col-md-3">
            <label>Hair colour</label>
          </div>

          <div className="col-md-3">
            <b>
              <FormatValue start={physicalCharacteristics.haircolour} />
            </b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Weight</label>
          </div>

          <div className="col-lg-3">
            <b>
              <FormatValue start={physicalAttributes.weightKilograms} end="kg" />
            </b>
          </div>

          <div className="col-md-3">
            <label> Facial hair</label>
          </div>

          <div className="col-md-3">
            <b>
              <FormatValue start={physicalCharacteristics.facialHair} />
            </b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Build</label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.build} /> </b>
          </div>

          <div className="col-md-3">
            <label> Right eye colour</label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.righteyecolour} /> </b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Complexion</label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.complexion} /> </b>
          </div>

          <div className="col-md-3">
            <label> Left eye colour</label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.lefteyecolour} /> </b>
          </div>

        </div>

        <div className="row border-bottom-line">

          <div className="col-md-3">
            <label>Shape of face </label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.righteyecolour} /> </b>
          </div>

          <div className="col-md-3">
            <label> Shoe size</label>
          </div>

          <div className="col-md-3">
            <b> <FormatValue start={physicalCharacteristics.shoesize} /> </b>
          </div>

        </div>

        {marksGroupedIntoPairs.length > 0 && <div className="row">
          <div className="col-md-12">
              <h3 className="heading-medium">
                Distinguishing marks
              </h3>
          </div>
        </div> }


        {marksGroupedIntoPairs.map((pairs,pairIndex) =>

          <div className="row" key={`pairs_${pairIndex}`}>
            { pairs.map((mark,index) =>
              <div className="col-md-6" key={`physicalMarks_${index}`}>

              <div className="row">
                <div className="col-md-6">
                   <b> { `Mark ${index + 1}` } </b>
                </div>
              </div>

              <div className="row border-bottom-line">
                <div className="col-md-3">
                  <label>Type</label>
                </div>

                <div className="col-md-3">
                  <b>{mark.type}</b>
                </div>
              </div>

              <div className="row border-bottom-line">
                <div className="col-md-3">
                  <label>Body part</label>
                </div>

                <div className="col-md-3">
                  <b>{mark.bodyPart}</b>
                </div>
              </div>

              <div className="row">
                <div className="col-md-3">
                  <label>Visual</label>
                </div>

                <div className="col-md-3">
                  <div className="photo clickable" onClick={() => showPhoto(mark.imageId)}>
                    { (mark.imageId && <EliteImage imageId={mark.imageId} />) || '--'}
                  </div>
                </div>
              </div>

            </div>)}

          </div>
        )}

      </div>

    );
  }
}

OffenderDetails.propTypes = {
  offenderDetails: PropTypes.object.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    showPhoto: (imageId) => dispatch(showLargePhoto(imageId)),
  };
}

const mapStateToProps = createStructuredSelector({
  offenderDetails: selectOffenderDetails(),
  // activeTabId: selectCurrentDetailTabId(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(OffenderDetails);
