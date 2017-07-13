/*
 *
 * Authentication actions
 *
 */

import {
  SEARCH,
  VIEW_DETAILS,
  SET_DETAILS_TAB,
  UPDATE_PAGINATION,
  UPDATE_RESULTS_VIEW,
  UPDATE_ALERTS_PAGINATION,
  UPDATE_CASENOTES_PAGINATION,
  VIEW_CASENOTE_DETAILS,
  VIEW_CASENOTE_LIST,
  SET_ADD_CASENOTE_MODAL,
  ADD_NEW_CASENOTE,
  SET_AMEND_CASENOTE_MODAL,
} from './constants';

export function search(searchObj) {
  return {
    type: SEARCH,
    searchObj,
  };
}

export function viewDetails(bookingId) {
  return {
    meta: { debounce: 'simple' },
    type: VIEW_DETAILS,
    payload: { bookingId },
  };
}

export function setPagination(pagination) {
  return {
    type: UPDATE_PAGINATION,
    payload: pagination,
  };
}

export function setAlertPagination(bookingId, pagination) {
  return {
    type: UPDATE_ALERTS_PAGINATION,
    payload: { bookingId, pagination },
  };
}

export function setCaseNotesPagination(bookingId, pagination, query) {
  return {
    type: UPDATE_CASENOTES_PAGINATION,
    payload: { bookingId, pagination, query },
  };
}

export function openAddCaseNoteModal() {
  return {
    type: SET_ADD_CASENOTE_MODAL,
    payload: true,
  };
}
export function closeAddCaseNoteModal() {
  return {
    type: SET_ADD_CASENOTE_MODAL,
    payload: false,
  };
}
export function openAmendCaseNoteModal() {
  return {
    type: SET_AMEND_CASENOTE_MODAL,
    payload: true,
  };
}
export function closeAmendCaseNoteModal() {
  return {
    type: SET_AMEND_CASENOTE_MODAL,
    payload: false,
  };
}
export function addNewCaseNote({ bookingId, type, subType, occurrenceDateTime }) {
  return {
    meta: { debounce: 'simple' },
    type: ADD_NEW_CASENOTE.BASE,
    payload: { bookingId, type, subType, occurrenceDateTime },
  };
}

export function setDetailsTab(activeTabId) {
  return {
    type: SET_DETAILS_TAB,
    payload: { activeTabId },
  };
}

export function setResultsView(view) {
  return {
    type: UPDATE_RESULTS_VIEW,
    payload: view,
  };
}

export function setCaseNotesDetailView(caseNoteId) {
  return {
    type: VIEW_CASENOTE_DETAILS,
    payload: { caseNoteId },
  };
}
export function setCaseNotesListView() {
  return {
    type: VIEW_CASENOTE_LIST,
  };
}
