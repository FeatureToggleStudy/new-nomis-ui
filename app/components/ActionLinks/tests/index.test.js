import React from 'react'

import { shallow } from 'enzyme'

import ActionLinks from '../index'

describe('Actions component', () => {
  it('should only show the my allocations link when the user is a key worker', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl=""
        categorisationUrl=""
        isKeyWorker
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('Link').prop('to')).toBe('/key-worker-allocations')
  })

  it('should only show the key worker admin link when the user is a key worker admin', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl="//omicURL"
        prisonStaffHubUrl=""
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('//omicURLmanage-key-workers')
  })

  it('should not show anything when the user does not have any applicable roles', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl=""
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('div').children().length).toBe(0)
  })

  it('should show global search link when the user has isGlobalSearch', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl="http://"
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('http://global-search')
  })

  it('should show roll check link when the user has isEstablishmentRollCheck', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl="http://"
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('http://establishment-roll')
  })

  it('should show admin and utilities link when the user has admin rights', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl="http://omic/"
        prisonStaffHubUrl="http://psh/"
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('http://omic/admin-utilities')
  })

  it('should show add bulk appointments link when the user has admin rights', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl="http://"
        categorisationUrl=""
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments
        isCatToolUser={false}
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('http://bulk-appointments/need-to-upload-file')
  })

  it('should show add cat tool link when the user has cat tool role', () => {
    const wrapper = shallow(
      <ActionLinks
        omicUrl=""
        prisonStaffHubUrl=""
        categorisationUrl="http://cat-tool"
        isKeyWorker={false}
        isKeyWorkerAdmin={false}
        isWhereabouts={false}
        hasAdminRights={false}
        isEstablishmentRollCheck={false}
        isGlobalSearch={false}
        isAddBulkAppointments={false}
        isCatToolUser
        isUseOfForce={false}
        useOfForceUrl=""
        isPathfinderUser={false}
        pathfinderUrl=""
      />
    )

    expect(wrapper.find('ActionLink').prop('url')).toBe('http://cat-tool')
  })
})

it('should show Use of Force link when the user has selected at UoF enabled prison', () => {
  const wrapper = shallow(
    <ActionLinks
      omicUrl=""
      categorisationUrl=""
      prisonStaffHubUrl="http://"
      isKeyWorker={false}
      isKeyWorkerAdmin={false}
      isWhereabouts={false}
      hasAdminRights={false}
      isEstablishmentRollCheck={false}
      isGlobalSearch={false}
      isAddBulkAppointments={false}
      isUseOfForce
      isCatToolUser={false}
      useOfForceUrl="http://use-of-force/"
      isPathfinderUser={false}
      pathfinderUrl=""
    />
  )

  expect(wrapper.find('ActionLink').prop('url')).toBe('http://use-of-force/')
})

it('should show Pathfinder link when the user has a Pathfinder role', () => {
  const wrapper = shallow(
    <ActionLinks
      omicUrl=""
      categorisationUrl=""
      prisonStaffHubUrl="http://"
      isKeyWorker={false}
      isKeyWorkerAdmin={false}
      isWhereabouts={false}
      hasAdminRights={false}
      isEstablishmentRollCheck={false}
      isGlobalSearch={false}
      isAddBulkAppointments={false}
      isUseOfForce={false}
      isCatToolUser={false}
      useOfForceUrl=""
      isPathfinderUser
      pathfinderUrl="http://pathfinder/"
    />
  )

  expect(wrapper.find('ActionLink').prop('url')).toBe('http://pathfinder/')
})
