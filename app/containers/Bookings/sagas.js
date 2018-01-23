import { takeLatest, put, select, call } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form/immutable';
import { getToken } from 'containers/Authentication/sagas';
import { selectApi } from 'containers/ConfigLoader/selectors';
import { bookingDetailsSaga as bookingDetailsElite } from 'containers/EliteApiLoader/sagas';
import { loadBookingAlerts, loadBookingCaseNotes, resetCaseNotes } from 'containers/EliteApiLoader/actions';
import { BOOKINGS } from 'containers/EliteApiLoader/constants';
import { DATE_TIME_FORMAT_SPEC } from 'containers/App/constants';
import moment from 'moment';
import { notify } from 'react-notify-toast';
import { showSpinner, hideSpinner } from 'globalReducers/app';


import {
  addCaseNote,
  amendCaseNote,
  loadMyLocations,
  searchOffenders,
  loadKeyDates,
  loadQuickLook,
  loadScheduledEventsForThisWeek,
  loadScheduledEventsForNextWeek,
  loadAppointmentViewModel,
  addAppointment,
} from 'utils/eliteApi';

import {
  APPOINTMENT,
} from 'containers/EliteApiLoader/constants';


import {
  selectSearchResultsPagination,
  selectSearchResultsSortOrder,
  selectSearchQuery,
  selectBookingDetailsId,
  selectCaseNotesPagination,
  selectCaseNotesQuery,
  selectCaseNotesDetailId,
} from './selectors';

import {
  setDetailsTab,
} from './actions';

import {
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_ERROR,
  VIEW_DETAILS,
  SET_DETAILS,
  DETAILS_ERROR,
  UPDATE_PAGINATION,
  SET_PAGINATION,
  UPDATE_ALERTS_PAGINATION,
  SET_ALERTS_PAGINATION,
  SET_CASENOTES_PAGINATION,
  UPDATE_CASENOTES_PAGINATION,
  UPDATE_RESULTS_VIEW,
  SET_RESULTS_VIEW,
  ADD_NEW_CASENOTE,
  AMEND_CASENOTE,
  CASE_NOTE_FILTER,
  SET_LARGE_PHOTO_VISIBILITY,
  SHOW_LARGE_PHOTO_BOOKING_DETAILS,
  HIDE_LARGE_PHOTO_BOOKING_DETAILS,
  LOAD_LOCATIONS,
  SET_LOCATIONS,
  NEW_SEARCH,
  TOGGLE_SORT_ORDER,
  SET_DETAILS_TAB,
  LOAD_KEY_DATES,
  SET_KEYDATES,
  LOAD_QUICK_LOOK,
  SET_QUICK_LOOK,
  LOAD_SCHEDULED_EVENTS,
  SET_SCHEDULED_EVENTS,
} from './constants';

export function* addAppointmentWatcher() {
  yield takeLatest(APPOINTMENT.ADD, onAddAppointment);
}

export function* loadScheduledEventsWatcher() {
  yield takeLatest(LOAD_SCHEDULED_EVENTS, onLoadScheduledEvents);
}

export function* loadKeyDatesWatcher() {
  yield takeLatest(LOAD_KEY_DATES, onLoadKeyDates);
}

export function* newSearchWatcher() {
  yield takeLatest(NEW_SEARCH, newSearch);
}
export function* loadLocationsWatcher() {
  yield takeLatest(LOAD_LOCATIONS, setLocations);
}
export function* searchWatcher() {
  yield takeLatest(SEARCH, searchSaga);
}

export function* showPhotoWatcher() {
  yield takeLatest(SHOW_LARGE_PHOTO_BOOKING_DETAILS, showPhoto);
}

export function* hidePhotoWatcher() {
  yield takeLatest(HIDE_LARGE_PHOTO_BOOKING_DETAILS, hidePhoto);
}

export function* toggleSortOrderWatcher() {
  yield takeLatest(TOGGLE_SORT_ORDER, toggleSort);
}

export function* loadQuickLookWatcher() {
  yield takeLatest(LOAD_QUICK_LOOK, onLoadQuickLook);
}

export function* onAddAppointment(action) {
  try {
    const bookingId = yield select(selectBookingDetailsId());
    const { appointmentType, location, startTime, endTime, eventDate, comment } = action.payload;
    const eventStartTime = moment(eventDate, 'DD/MM/YYYY');
    const eventEndTime = endTime && moment(eventDate, 'DD/MM/YYYY');

    eventStartTime.hour(moment(startTime).hour());
    eventStartTime.minute(moment(startTime).minute());
    eventStartTime.second(moment(startTime).second());

    if (eventEndTime) {
      eventEndTime.hour(moment(endTime).hour());
      eventEndTime.minute(moment(endTime).minute());
      eventEndTime.second(moment(endTime).second());
    }

    yield call(addAppointment, {
      appointmentType,
      locationId: location,
      comment,
      startTime: moment(eventStartTime).format(DATE_TIME_FORMAT_SPEC),
      endTime: eventEndTime && moment(eventEndTime).format(DATE_TIME_FORMAT_SPEC),
      bookingId,
    });

    yield put(push('/bookings/details'));

    yield notify.show('Appointment has been created successfully.','success');
  } catch (err) {
    yield put({ type: APPOINTMENT.ERROR, payload: new SubmissionError({ _error: 'Unable to create a new appointment at this time.' }) });
  }
}

export function* onLoadQuickLook(action) {
  try {
    yield put(showSpinner());
    const viewModel = yield call(loadQuickLook, action.payload);
    yield put({
      type: SET_QUICK_LOOK,
      payload: viewModel,
    });
    yield put(hideSpinner());
  } catch (err) {
    yield put(hideSpinner());
    yield put({ type: DETAILS_ERROR, payload: { error: err.userMessage } });
  }
}

export function* onLoadKeyDates(action) {
  try {
    yield put(showSpinner());
    const viewModel = yield call(loadKeyDates, action.payload);
    yield put({
      type: SET_KEYDATES,
      payload: viewModel,
    });
    yield put(hideSpinner());
  } catch (err) {
    yield put(hideSpinner());
    yield put({ type: DETAILS_ERROR, payload: { error: err.userMessage } });
  }
}

export function* onLoadScheduledEvents(action) {
  try {
    yield put(showSpinner());
    const fetchScheduledEvents = action.payload.nextWeek === true ? loadScheduledEventsForNextWeek : loadScheduledEventsForThisWeek;
    const data = yield call(fetchScheduledEvents, action.payload.bookingId);

    yield put({
      type: SET_SCHEDULED_EVENTS,
      payload: {
        data,
        nextWeek: action.payload.nextWeek,
      },
    });
    yield put(hideSpinner());
  } catch (error) {
    yield put(hideSpinner());
  }
}

export function* setLocations(action) {
  const token = yield getToken();
  const apiServer = yield select(selectApi());
  const locations = yield call(loadMyLocations, token, apiServer, action);

  yield put({
    type: SET_LOCATIONS,
    payload: {
      locations,
    },
  });
}

export function* showPhoto(action) {
  yield put({
    type: SET_LARGE_PHOTO_VISIBILITY,
    payload: {
      shouldShowLargePhoto: true,
      imageId: (action.payload || { imageId: null }).imageId,
    },
  });
}

export function* hidePhoto(action) {
  yield put({
    type: SET_LARGE_PHOTO_VISIBILITY,
    payload: {
      shouldShowLargePhoto: false,
      imageId: (action.payload || { imageId: null }).imageId,
    },
  });
}

export function* toggleSort(action) {
  const token = yield getToken();
  const baseUrl = yield select(selectApi());
  const previousSortOrder = yield select(selectSearchResultsSortOrder());
  const pagination = yield select(selectSearchResultsPagination());
  const query = yield select(selectSearchQuery());

  const sortOrder = action.payload || (previousSortOrder === 'ASC' ? 'DESC' : 'ASC');

  yield put(showSpinner());
  const result = yield call(searchOffenders, {
    token,
    baseUrl,
    query,
    pagination: {
      limit: pagination.perPage,
      offset: pagination.perPage * pagination.pageNumber,
    },
    sort: {
      order: sortOrder,
    },
  });

  yield put({
    type: SEARCH_SUCCESS,
    payload: {
      searchResults: result.bookings,
      searchQuery: query,
      meta: { totalRecords: result.totalRecords, sortOrder },
    },
  });

  yield put(hideSpinner());
}

export function* newSearch(action) {
  try {
    const { query, resetPagination } = action.payload;
    const token = yield getToken();
    const baseUrl = yield select(selectApi());
    const sortOrder = yield (action.payload.sortOrder || select(selectSearchResultsSortOrder()));
    let pagination = yield (action.payload.pagination || select(selectSearchResultsPagination()));

    yield put(showSpinner());

    if (resetPagination) {
      pagination = { ...pagination, pageNumber: 0 };
      yield put({ type: SET_PAGINATION, payload: pagination });
    }

    const result = yield call(searchOffenders, {
      token,
      baseUrl,
      query,
      pagination: {
        limit: pagination.perPage,
        offset: pagination.perPage * pagination.pageNumber,
      },
      sort: {
        order: sortOrder,
      },
    });

    if (result.bookings.length === 1 && pagination.pageNumber === 0) {
      yield put({
        type: VIEW_DETAILS,
        payload: {
          bookingId: result.bookings[0].bookingId,
        },
      });

      return;
    }

    yield put({
      type: SEARCH_SUCCESS,
      payload: {
        searchResults: result.bookings,
        searchQuery: query,
        meta: { totalRecords: result.totalRecords, sortOrder },
      },
    });

    if (action.redirectToResults) { yield put(push('/results')); }

    yield put(hideSpinner());
  } catch (err) {
    yield put(hideSpinner());
    yield put({ type: SEARCH_ERROR, payload: new SubmissionError({ _error: err.message }) });
  }
}

export function* searchSaga(action) {
  yield newSearch(action);
  yield put(push('/results'));
}

export function* addCasenoteWatcher() {
  yield takeLatest(ADD_NEW_CASENOTE.BASE, addCasenoteSaga);
}

export function* addCasenoteSaga(action) {
  const { typeAndSubType: { type, subType }, caseNoteText: text, occurrenceDateTime } = action.payload.query;
  const bookingId = yield select(selectBookingDetailsId());

  const token = yield getToken();
  const apiServer = yield select(selectApi());
  try {
    yield call(addCaseNote, token, apiServer, bookingId, type, subType, text, occurrenceDateTime);

    yield put({ type: ADD_NEW_CASENOTE.SUCCESS });
    // Reset casenotes
    yield put(resetCaseNotes(bookingId));
    // load casenotes again...
    const pagination = yield select(selectCaseNotesPagination());
    const query = yield select(selectCaseNotesQuery());
    yield put(loadBookingCaseNotes(bookingId, pagination, query));

    // Go to casenotes tab...
    yield put(setDetailsTab(3));
    yield put(push('/bookings/details'));

    yield notify.show('Case note has been created successfully.','success');
  } catch (e) {
    yield put({ type: ADD_NEW_CASENOTE.ERROR, payload: new SubmissionError(e.message) });
  }
}

export function* amendCaseNoteWatcher() {
  yield takeLatest(AMEND_CASENOTE.BASE, onAmendCaseNote);
}

export function* onAmendCaseNote(action) {
  const { amendmentText } = action.payload;
  const bookingId = yield select(selectBookingDetailsId());
  const caseNoteId = yield select(selectCaseNotesDetailId());
  const apiServer = yield select(selectApi());

  try {
    yield call(amendCaseNote, apiServer, bookingId, caseNoteId, amendmentText);
    yield put({ type: AMEND_CASENOTE.SUCCESS });

    // Reset casenotes
    const pagination = yield select(selectCaseNotesPagination());
    const query = yield select(selectCaseNotesQuery());
    yield put(resetCaseNotes(bookingId, pagination, query));
    // load casenotes again...
    yield put(loadBookingCaseNotes(bookingId, pagination, query));
    yield put(push('/bookings/details'));
    yield notify.show('Case note has been amended successfully.','success');
  } catch (err) {
    yield put({ type: AMEND_CASENOTE.ERROR,
      payload: new SubmissionError({ _error: err.message || 'Unable to amend case note at this time.' }) });
  }
}


export function* detailsWatcher() {
  yield takeLatest(VIEW_DETAILS, viewDetails);
}

export function* viewDetails(action) {
  yield put(showSpinner());
  yield put({ type: SET_DETAILS, payload: action.payload });
  const { Type } = yield call(bookingDetailsElite, action); //eslint-disable-line
  if (Type !== 'ERROR') {
    yield put(push('/bookings/details'));

    if (typeof action.payload.activeTabId === 'number') {
      yield put({ type: SET_DETAILS_TAB, payload: action.payload });
    }
  }

  yield put(hideSpinner());
}

export function* searchResultPaginationWatcher() {
  yield takeLatest(UPDATE_PAGINATION, updateSearchResultPagination);
}

export function* updateSearchResultPagination(action) {
  yield put({ type: SET_PAGINATION, payload: action.payload });
  const currentQuery = yield select(selectSearchQuery());
  yield put({ type: SEARCH, payload: { query: currentQuery } });
}

export function* searchResultViewWatcher() {
  yield takeLatest(UPDATE_RESULTS_VIEW, updateSearchResultView);
}

export function* updateSearchResultView(action) {
  yield put({ type: SET_RESULTS_VIEW, payload: action.payload });
  const currentQuery = yield select(selectSearchQuery());
  yield put({ type: SEARCH, payload: { query: currentQuery } });
}

export function* detailAlertsPaginationWatcher() {
  yield takeLatest(UPDATE_ALERTS_PAGINATION, detailAlertsPagination);
}

export function* detailAlertsPagination(action) {
  // Load new data first, then switch in view.
  yield put(loadBookingAlerts(action.payload.bookingId, action.payload.pagination));
  yield put({ type: SET_ALERTS_PAGINATION, payload: action.payload.pagination });
}

export function* detailCaseNotesPaginationWatcher() {
  yield takeLatest(UPDATE_CASENOTES_PAGINATION, detailCaseNotesPagination);
}

export function* detailCaseNotesPagination(action) {
  // Load new data first, then switch in view.
  yield put(loadBookingCaseNotes(action.payload.bookingId, action.payload.pagination, action.payload.query));
  yield put({ type: SET_CASENOTES_PAGINATION, payload: action.payload.pagination });
}

export function* setCaseNoteFilterWatcher() {
  yield takeLatest(CASE_NOTE_FILTER.BASE, setCaseNoteFilterSaga);
}

export function* setCaseNoteFilterSaga(action) {
  const { query, resetPagination, goToPage } = action.payload;
  let pagination = yield select(selectSearchResultsPagination());
  const bookingId = yield select(selectBookingDetailsId());

  try {
    if (resetPagination) {
      pagination = Object.assign(pagination, { pageNumber: 0 });
      yield put({ type: SET_CASENOTES_PAGINATION, payload: pagination });
    }
    yield put({ type: BOOKINGS.CASENOTES.BASE, payload: { bookingId, query, pagination } });
    yield put({ type: CASE_NOTE_FILTER.SUCCESS,
      payload: {
        query,
      } });
    if (goToPage) yield put(push(goToPage));
  } catch (err) {
    yield put({ type: CASE_NOTE_FILTER.ERROR, payload: new SubmissionError({ _error: err.message }) });
  }
}

export default [
  searchWatcher,
  detailsWatcher,
  searchResultPaginationWatcher,
  searchResultViewWatcher,
  detailAlertsPaginationWatcher,
  detailCaseNotesPaginationWatcher,
  addCasenoteWatcher,
  amendCaseNoteWatcher,
  setCaseNoteFilterWatcher,
  showPhotoWatcher,
  hidePhotoWatcher,
  loadLocationsWatcher,
  newSearchWatcher,
  toggleSortOrderWatcher,
  loadKeyDatesWatcher,
  loadQuickLookWatcher,
  loadScheduledEventsWatcher,
  addAppointmentWatcher,
];
