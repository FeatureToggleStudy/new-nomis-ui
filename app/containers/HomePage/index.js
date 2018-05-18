import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { LOAD_ASSIGNMENTS } from 'containers/Assignments/constants';
import Name from 'components/Name';
import ActionLinks from 'containers/ActionLinks';
import SearchForm from './SearchForm';

import {
  loadLocations,
} from '../Bookings/actions';


import './homepage.scss';

class HomePage extends Component {

  componentDidMount() {
    this.props.loadLocations();
  }

  render() {
    const { user, locations, omicUrl } = this.props;
    if (!user) {
      return <div></div>
    }

    return (<div>
      <h1 className="heading-xlarge">Hello <Name firstName={user.firstName} /></h1>
      <SearchForm locations={locations} />
      <div>
        <ActionLinks
          className="no-left-gutter"
          isKeyWorkerAdmin={user.isKeyWorkerAdmin}
          isKeyWorker={user.isKeyWorker}
          omicUrl={omicUrl}
        />

      </div>
    </div>);
  }
}

HomePage.defaultProps = {
  loadLocations: () => {},
};

HomePage.propTypes = {
  loadLocations: PropTypes.func,
  locations: PropTypes.array.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    test: () => dispatch({ type: LOAD_ASSIGNMENTS, payload: {} }),
    loadLocations: () => dispatch(loadLocations()),
  };
}


const mapStateToProps = (state) => {
  const user = state.getIn(['authentication','user']);
  const locations = state.getIn(['home', 'locations']);
  const omicUrl = state.getIn(['app', 'omicUrl']);

  return {
    user,
    locations,
    omicUrl,
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
