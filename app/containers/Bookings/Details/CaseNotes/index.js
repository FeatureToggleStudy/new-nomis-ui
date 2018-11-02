import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import ReactRouterPropTypes from 'react-router-prop-types'
import { Map } from 'immutable'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { DETAILS_TABS } from '../../constants'
import { loadBookingCaseNotes } from '../../../EliteApiLoader/actions'
import { loadCaseNoteTypesAndSubTypes } from '../../actions'
import { Model as caseNoteModel } from '../../../../helpers/dataMappers/caseNotes'
import { buildCaseNotQueryString } from '../../../../utils/stringUtils'

import CaseNoteList from './caseNoteList'
import CaseNoteDetails from './caseNoteDetails'
import caseNoteQueryType from './types'

class CaseNotes extends Component {
  componentDidMount() {
    if (window) {
      window.scrollTo(0, 0)
    }

    const { loadCaseNotes, loadTypesSubTypes, offenderNo, query } = this.props

    loadTypesSubTypes()
    loadCaseNotes(offenderNo, query)
  }

  componentWillReceiveProps(props) {
    const { caseNotes } = this.props
    if (this.props && caseNotes !== props.caseNotes) {
      window.scrollTo(0, 0)
    }
  }

  componentDidUpdate(prevProps) {
    const { query, loadCaseNotes, offenderNo } = this.props
    if (!Map(prevProps.query).equals(Map(query))) {
      loadCaseNotes(offenderNo, query)
    }
  }

  render() {
    const {
      offenderNo,
      itemId: caseNoteId,
      setCaseNoteView,
      caseNotes,
      totalResults,
      setPagination,
      query,
      location,
    } = this.props

    const pagination = {
      perPage: query.perPage,
      pageNumber: query.pageNumber,
    }

    if (caseNoteId) {
      return <CaseNoteDetails offenderNo={offenderNo} caseNoteId={caseNoteId} />
    }

    return (
      <CaseNoteList
        location={location}
        offenderNo={offenderNo}
        caseNotes={caseNotes}
        pagination={pagination}
        caseNotesQuery={query}
        setPagination={setPagination}
        totalResults={totalResults}
        setCaseNoteView={setCaseNoteView}
      />
    )
  }
}

CaseNotes.propTypes = {
  // mapStateToProps
  offenderNo: PropTypes.string.isRequired,
  caseNotes: ImmutablePropTypes.list.isRequired,
  query: caseNoteQueryType.isRequired,
  totalResults: PropTypes.number,
  itemId: PropTypes.string,

  // mapDispatchToProps
  loadCaseNotes: PropTypes.func.isRequired,
  setPagination: PropTypes.func.isRequired,
  setCaseNoteView: PropTypes.func.isRequired,
  loadTypesSubTypes: PropTypes.func.isRequired,

  // special
  location: ReactRouterPropTypes.location.isRequired,
}

CaseNotes.defaultProps = {
  totalResults: 0,
  itemId: null,
}

const mapDispatchToProps = (dispatch, props) => ({
  loadCaseNotes: (id, query) => dispatch(loadBookingCaseNotes(id, query)),

  setPagination: (id, pagination) =>
    dispatch(
      push(`/offenders/${id}/case-notes?${buildCaseNotQueryString({ ...props.location.query, ...pagination })}`)
    ),
  setCaseNoteView: id => dispatch(push(`/offenders/${props.offenderNo}/${DETAILS_TABS.CASE_NOTES}/${id}`)),
  loadTypesSubTypes: () => dispatch(loadCaseNoteTypesAndSubTypes()),
})

const mapStateToProps = (immutableState, props) => {
  const { offenderNo } = props
  const caseNotes =
    immutableState.getIn(['eliteApiLoader', 'Bookings', 'Details', offenderNo, 'CaseNotes']) || caseNoteModel
  const results = caseNotes.get('results')
  const totalResults = caseNotes.getIn(['meta', 'totalRecords'])

  const query = {
    ...props.location.query,
    perPage: parseInt(props.location.query.perPage, 10) || 10,
    pageNumber: parseInt(props.location.query.pageNumber, 10) || 0,
  }

  const deviceFormat = immutableState.getIn(['app', 'deviceFormat'])

  return {
    caseNotes: results,
    offenderNo,
    deviceFormat,
    totalResults,
    query,
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CaseNotes)
