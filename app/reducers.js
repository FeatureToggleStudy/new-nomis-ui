/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';


import { reducer as formReducer } from 'redux-form/immutable';
import appReducer from 'globalReducers/app';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import authenticationReducer from 'containers/Authentication/reducer';
import configReducer from 'containers/ConfigLoader/reducer';
import eliteApiLoaderReducer from 'containers/EliteApiLoader/reducer';
import assignmentsReducer from 'containers/Assignments/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

const objectIsNotEmpty = (obj) => Object.keys(obj).length !== 0;
const isSearchResultRoute = (route) => route === '/results';

function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
        lastSearchResultQuery:
          isSearchResultRoute(action.payload.pathname) &&
          objectIsNotEmpty(action.payload.query) ? action.payload.query : state.get('lastSearchResultQuery'),
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    app: appReducer,
    language: languageProviderReducer,
    form: formReducer,
    authentication: authenticationReducer,
    config: configReducer,
    eliteApiLoader: eliteApiLoaderReducer,
    assignments: assignmentsReducer,
    ...asyncReducers,
  });
}
