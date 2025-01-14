import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './index.scss'

export const ActionLink = ({ url, testId, image, children }) => (
  <div className="action-links__link">
    <a href={url} className="action-link link" data-qa={testId}>
      <img src={image} alt={`${children} icon`} />
      {children}
    </a>
  </div>
)

ActionLink.propTypes = {
  url: PropTypes.string.isRequired,
  testId: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

const ActionLinks = ({
  isKeyWorkerAdmin,
  isKeyWorker,
  isWhereabouts,
  omicUrl,
  prisonStaffHubUrl,
  useOfForceUrl,
  pathfinderUrl,
  isEstablishmentRollCheck,
  hasAdminRights,
  isGlobalSearch,
  isAddBulkAppointments,
  isCatToolUser,
  categorisationUrl,
  isUseOfForce,
  isPathfinderUser,
}) => {
  if (
    !isKeyWorker &&
    !isKeyWorkerAdmin &&
    !isWhereabouts &&
    !isEstablishmentRollCheck &&
    !hasAdminRights &&
    !isGlobalSearch &&
    !isAddBulkAppointments &&
    !isCatToolUser &&
    !isUseOfForce &&
    !isPathfinderUser
  ) {
    return <div />
  }
  return (
    <div>
      <h1 className="heading-medium">Tasks</h1>
      <div className="action-links">
        {isGlobalSearch && prisonStaffHubUrl && (
          <ActionLink
            url={`${prisonStaffHubUrl}global-search`}
            image="/img/global-search.png"
            testId="global-search-link"
          >
            Global search
          </ActionLink>
        )}

        {isKeyWorker && (
          <div className="action-links__link">
            <Link to="/key-worker-allocations" className="action-link link" data-qa="my-kw-allocations-link">
              <img src="/img/ICON_MyKeyWorkerAssignments@2x.png" alt="My key worker allocations icon" />
              My key worker allocations
            </Link>
          </div>
        )}

        {isWhereabouts && prisonStaffHubUrl && (
          <ActionLink
            url={`${prisonStaffHubUrl}manage-prisoner-whereabouts`}
            image="/img/ICON_ManagePrisonerWhereabouts.png"
            testId="whereabouts-link"
          >
            Manage prisoner whereabouts
          </ActionLink>
        )}

        {isUseOfForce && useOfForceUrl && (
          <ActionLink url={`${useOfForceUrl}`} image="/img/UseOfForce_icon.png" testId="useOfForce-link">
            Use of force incidents
          </ActionLink>
        )}

        {isPathfinderUser && pathfinderUrl && (
          <ActionLink url={`${pathfinderUrl}`} image="/img/Pathfinder_icon.png" testId="pathfinder-link">
            Pathfinder
          </ActionLink>
        )}

        {isEstablishmentRollCheck && prisonStaffHubUrl && (
          <ActionLink
            url={`${prisonStaffHubUrl}establishment-roll`}
            image="/img/EstablishmentRoll_icon.png"
            testId="establishment-roll-link"
          >
            Establishment roll check
          </ActionLink>
        )}

        {isAddBulkAppointments && prisonStaffHubUrl && (
          <ActionLink
            url={`${prisonStaffHubUrl}bulk-appointments/need-to-upload-file`}
            image="/img/bulk-appointments.png"
            testId="add-bulk-appointments-link"
          >
            Add bulk appointments
          </ActionLink>
        )}

        {isKeyWorkerAdmin && omicUrl && (
          <ActionLink
            url={`${omicUrl}manage-key-workers`}
            image="/img/manage-key-workers2x.png"
            testId="manage-kw-link"
          >
            Manage key workers
          </ActionLink>
        )}

        {hasAdminRights && omicUrl && (
          <ActionLink
            url={`${omicUrl}admin-utilities`}
            image="/img/ICON_AdminUtilities.png"
            testId="admin-utilities-link"
          >
            Admin and utilities
          </ActionLink>
        )}

        {isCatToolUser && categorisationUrl && (
          <ActionLink url={`${categorisationUrl}`} image="/img/ICON_CatTool.png" testId="cat-tool-link">
            Categorisation
          </ActionLink>
        )}
      </div>
    </div>
  )
}

ActionLinks.propTypes = {
  isKeyWorkerAdmin: PropTypes.bool.isRequired,
  isKeyWorker: PropTypes.bool.isRequired,
  isWhereabouts: PropTypes.bool.isRequired,
  omicUrl: PropTypes.string.isRequired,
  isEstablishmentRollCheck: PropTypes.bool.isRequired,
  hasAdminRights: PropTypes.bool.isRequired,
  isGlobalSearch: PropTypes.bool.isRequired,
  isAddBulkAppointments: PropTypes.bool.isRequired,
  prisonStaffHubUrl: PropTypes.string.isRequired,
  isCatToolUser: PropTypes.bool.isRequired,
  categorisationUrl: PropTypes.string.isRequired,
  isUseOfForce: PropTypes.bool.isRequired,
  useOfForceUrl: PropTypes.string.isRequired,
  isPathfinderUser: PropTypes.bool.isRequired,
  pathfinderUrl: PropTypes.string.isRequired,
}

export default ActionLinks
