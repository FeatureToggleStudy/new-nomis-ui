import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Link } from 'react-router-dom'
import EliteImage from '../../../containers/EliteContainers/Image'
import EliteOfficerName from '../../../containers/EliteContainers/OfficerName'

import { offenderImageUrl } from '../../../containers/Bookings/constants'
import { linkOnClick } from '../../../helpers'

import './header.scss'
import flags from '../AlertFlags'

const Alerts = ({ activeAlertCount, inactiveAlertCount }) => (
  <div className="alerts">
    <span className="active-alert">
      <strong>{activeAlertCount}</strong>
      <span> active </span>
    </span>
    <span>
      <strong className="inactive-alert">{inactiveAlertCount}</strong>
      <span> inactive </span>
    </span>
  </div>
)

Alerts.propTypes = {
  activeAlertCount: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
  inactiveAlertCount: PropTypes.oneOfType([PropTypes.number.isRequired, PropTypes.string.isRequired]).isRequired,
}

const Location = ({ assignedLivingUnit }) => (
  <div>
    <span className="label">Location</span>

    <div>
      <strong>{assignedLivingUnit && assignedLivingUnit.get('description')}</strong>
    </div>

    <div>
      <strong>{assignedLivingUnit && assignedLivingUnit.get('agencyName')}</strong>
    </div>
  </div>
)

Location.propTypes = {
  assignedLivingUnit: ImmutablePropTypes.map.isRequired,
}

const MiddleSection = ({ inmateData, offenderNo, showAddKeyworkerSessionLink }) => {
  const cat = inmateData.get('categoryCode')
  const category = flags.AssessmentFlagsOrLetter(cat, '')
  return (
    <div className="middle-section">
      <div className="col-xs-4 col-sm-3 visible-large">
        <div className="row">
          <div className="col">
            <span className="label">IEP</span>
            <strong>{inmateData.get('iepLevel') || '--'}</strong>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <span className="label">CSRA</span>
            <strong>{inmateData.get('csra') || '--'}</strong>
          </div>
        </div>

        {cat && (
          <div className="row">
            <div className="col">
              <span className="label">Category</span>
              {category}
            </div>
          </div>
        )}
      </div>
      <div className="col-xs-12 visible-small">
        <div className="row">
          <div className="col-xs-4 d-inline-block">
            <span className="label">IEP</span>
            <strong>{inmateData.get('iepLevel') || '--'}</strong>
          </div>

          <div className="col-xs-4 d-inline-block">
            <span className="label">CSRA</span>
            <strong>{inmateData.get('csra') || '--'}</strong>
          </div>

          {cat && (
            <div className="col-xs-4 d-inline-block">
              <span className="label">Category</span>
              {category}
            </div>
          )}
        </div>
      </div>

      <div className="visible-large">
        <div className="col-xs-6 col-sm-3">
          <div className="row">
            <div className="col">
              <span className="label">Alerts</span>
              <Alerts
                activeAlertCount={inmateData.get('activeAlertCount')}
                inactiveAlertCount={inmateData.get('inactiveAlertCount')}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Location assignedLivingUnit={inmateData.get('assignedLivingUnit')} />
            </div>
          </div>
        </div>
      </div>

      <div className="visible-small">
        <div className="col-xs-4">
          <div className="row">
            <div className="col">
              <span className="label">Alerts</span>
              <Alerts
                activeAlertCount={inmateData.get('activeAlertCount')}
                inactiveAlertCount={inmateData.get('inactiveAlertCount')}
              />
            </div>
          </div>
        </div>

        <div className="col-xs-4">
          <div className="row">
            <div className="col">
              <Location assignedLivingUnit={inmateData.get('assignedLivingUnit')} />
            </div>
          </div>
        </div>
      </div>
      <div className="col-xs-12 col-sm-3">
        <div className="stacked-links">
          <div>
            <Link name="add-case-note-link" className="button-link" to={`/offenders/${offenderNo}/add-case-note`}>
              Add case note
            </Link>
          </div>

          {showAddKeyworkerSessionLink && (
            <div>
              <Link
                name="add-kw-session-link"
                className="button-link"
                to={`/offenders/${offenderNo}/add-case-note?type=KA&subType=KS`}
              >
                Add KW session
              </Link>
            </div>
          )}

          <div>
            <Link name="add-appointment-link" className="button-link" to={`/offenders/${offenderNo}/add-appointment`}>
              Add appointment
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

MiddleSection.propTypes = {
  offenderNo: PropTypes.string.isRequired,
  inmateData: ImmutablePropTypes.map.isRequired,
  showAddKeyworkerSessionLink: PropTypes.bool.isRequired,
}

const Header = ({ inmateData, onImageClick, offenderNo, onAlertFlagClick, showAddKeyworkerSessionLink }) => {
  const alertFlags = className => flags.AlertFlags(inmateData.get('alerts'), className, onAlertFlagClick)

  return (
    <div className="header-details">
      <div className="row visible-small">{alertFlags('col-sm-12 no-padding-left')}</div>
      <div className="row">
        <div className="col-md-2 col-xs-3 no-left-gutter no-right-gutter">
          <div
            className="photo clickable"
            {...linkOnClick(() => onImageClick(offenderImageUrl(inmateData.get('facialImageId'))))}
          >
            <EliteImage src={offenderImageUrl(inmateData.get('facialImageId'))} />
          </div>
        </div>

        <div className="col-xs-9 col-sm-9 col-md-10 col-lg-10 no-left-gutter no-right-gutter add-gutter-bottom-mobile">
          <div className="row">
            <div className="col-md-12">{alertFlags('inline-header-large align-alerts')}</div>
          </div>

          <div className="row">
            <div className="col-md-3 col-sm-3 col-xs-12">
              <div className="row">
                <div className="col">
                  <span className="label">Prison number</span>
                  <strong>{inmateData.get('offenderNo')}</strong>
                </div>
              </div>

              <div className="row">
                <div className="col">
                  <span className="label">Key worker</span>
                  <strong>
                    {inmateData.get('keyworker') && (
                      <EliteOfficerName staffId={inmateData.getIn(['keyworker', 'staffId'])} />
                    )}
                  </strong>
                </div>
              </div>
            </div>

            <div className="visible-large">
              <MiddleSection
                inmateData={inmateData}
                offenderNo={offenderNo}
                showAddKeyworkerSessionLink={showAddKeyworkerSessionLink}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="visible-small">
          <MiddleSection
            inmateData={inmateData}
            offenderNo={offenderNo}
            showAddKeyworkerSessionLink={showAddKeyworkerSessionLink}
          />
        </div>
      </div>
    </div>
  )
}

Header.propTypes = {
  inmateData: ImmutablePropTypes.map.isRequired,
  offenderNo: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  onAlertFlagClick: PropTypes.func.isRequired,
  showAddKeyworkerSessionLink: PropTypes.bool.isRequired,
}

export default Header
