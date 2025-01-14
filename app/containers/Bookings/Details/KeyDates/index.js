import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import uuid from 'uuid/v4'
import { Map } from 'immutable'
import { FormattedDate } from '../../../../components/intl'

import { Model as keyDatesModel } from '../../../../helpers/dataMappers/keydates'

import { loadKeyDates } from '../../actions'

import './index.scss'

const KeyDatePair = ({ title, text, date }) => (
  <div className="information">
    {(text || date) && <span>{title}</span>}
    <span>
      {text && <b>{text}</b>}
      {date && (
        <b>
          <FormattedDate value={date} />
        </b>
      )}
    </span>
  </div>
)

KeyDatePair.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  date: PropTypes.string,
}

KeyDatePair.defaultProps = {
  text: '',
  date: '',
}

const ErrorMessage = () => (
  <div>
    <div className="error-summary">
      <div className="error-message">There was a problem trying to retrieve the key dates information.</div>
    </div>
  </div>
)

const SentenceView = ({
  additionalDaysAwarded,
  dtoReleaseDates,
  nonDtoReleaseDate,
  sentenceExpiryDates,
  other,
  reCategorisationDate,
}) => {
  const shouldShowNonDtoReleaseDate = Boolean(nonDtoReleaseDate.get('label') && nonDtoReleaseDate.get('value'))
  const shouldShowOtherDates = other.get('dates').size > 0

  return (
    <div>
      <h3 className="heading-medium">Key dates</h3>

      <div className="section">
        <div className="information-group">
          {dtoReleaseDates.map(pair => (
            <KeyDatePair key={uuid()} title={pair.get('label')} date={pair.get('value')} />
          ))}
          {additionalDaysAwarded ? <KeyDatePair title=" Additional days awarded" text={additionalDaysAwarded} /> : null}
          {sentenceExpiryDates.map(pair => (
            <KeyDatePair title={pair.get('label')} date={pair.get('value')} />
          ))}
          {shouldShowNonDtoReleaseDate && (
            <KeyDatePair title={nonDtoReleaseDate.get('label')} date={nonDtoReleaseDate.get('value')} />
          )}
          {shouldShowOtherDates &&
            other
              .get('dates')
              .map(otherDate => (
                <KeyDatePair
                  key={otherDate.get('label')}
                  title={otherDate.get('label')}
                  date={otherDate.get('value')}
                />
              ))}

          <div className="information">
            <span>Re-categorisation date</span>

            <b>
              {!reCategorisationDate && '--'}
              {reCategorisationDate && <FormattedDate value={reCategorisationDate} />}
            </b>
          </div>
        </div>
      </div>
    </div>
  )
}

SentenceView.propTypes = {
  additionalDaysAwarded: PropTypes.number.isRequired,
  dtoReleaseDates: ImmutablePropTypes.list.isRequired,
  nonDtoReleaseDate: ImmutablePropTypes.map.isRequired,
  sentenceExpiryDates: ImmutablePropTypes.list.isRequired,
  other: ImmutablePropTypes.map.isRequired,
  reCategorisationDate: PropTypes.string.isRequired,
}

class KeyDates extends Component {
  componentDidMount() {
    const { offenderNo, loadContent } = this.props

    loadContent(offenderNo)
  }

  render() {
    const { keyDates, error } = this.props

    const sentence = keyDates.get('sentence')

    if (error.size > 0) {
      return <ErrorMessage />
    }

    return (
      <div className="key-dates">
        <div>
          <h3 className="heading-medium no-top-margin">Incentives and earned privileges</h3>

          <div className="section">
            <div className="information-group">
              <div className="information">
                <span>IEP Level</span>
                <b>{keyDates.get('iepLevel')}</b>
              </div>

              <div className="information">
                <span>Days since review</span>
                <b>{keyDates.get('daysSinceReview')}</b>
              </div>
            </div>
          </div>
        </div>

        <SentenceView
          additionalDaysAwarded={sentence.get('additionalDaysAwarded')}
          dtoReleaseDates={sentence.get('dtoReleaseDates')}
          nonDtoReleaseDate={sentence.get('nonDtoReleaseDate')}
          sentenceExpiryDates={sentence.get('sentenceExpiryDates')}
          other={keyDates.get('other')}
          reCategorisationDate={keyDates.get('reCategorisationDate')}
        />
      </div>
    )
  }
}

KeyDates.propTypes = {
  keyDates: ImmutablePropTypes.map.isRequired,
  error: ImmutablePropTypes.map.isRequired,
  offenderNo: PropTypes.string.isRequired,
  loadContent: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  loadContent: id => dispatch(loadKeyDates(id)),
})

const mapStateToProps = (immutableState, props) => {
  const keyDates = immutableState.getIn(['search', 'details', 'keyDatesViewModel']) || keyDatesModel
  const error = immutableState.getIn(['search', 'details', 'error']) || Map({})

  return {
    keyDates,
    offenderNo: props.offenderNo,
    error,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyDates)
