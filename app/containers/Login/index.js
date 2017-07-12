import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { createFormAction } from 'redux-form-saga';
import {
  CenteredFlexColumnLogin,
} from 'components/DesktopWrappers';

import { selectDeviceFormat } from 'selectors/app';

import LeftTitleBlock from 'components/TitleBlock/lefttitle';
import TitleblockMobile from 'components/TitleBlock/mobile';
import translations from './translations';

import { LOGIN_SUCCESS, LOGIN_ERROR } from '../Authentication/constants';

import { logIn } from '../Authentication/actions';
import { selectLoggedIn, selectUser, selectUsername, selectPassword } from '../Authentication/selectors';
import LoginForm from './loginForm';

class Login extends PureComponent { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    deviceFormat: PropTypes.string.isRequired,
  };
  render() {
    const { deviceFormat } = this.props;

    return deviceFormat === 'desktop' ?
      <CenteredFlexColumnLogin>
        <LeftTitleBlock title={<FormattedMessage {...translations.title} />} subtitle={<FormattedMessage {...translations.subtitle} />} />
        <LoginForm onSubmit={this.props.onSubmitForm} />
      </CenteredFlexColumnLogin>
      :
      <CenteredFlexColumnLogin>
        <TitleblockMobile title={<FormattedMessage {...translations.title} />} subtitle={<FormattedMessage {...translations.subtitle} />} />
        <LoginForm onSubmit={this.props.onSubmitForm} />
      </CenteredFlexColumnLogin>
    ;
  }
}

export function mapDispatchToProps() {
  return {
    onSubmitForm: createFormAction(logIn, [LOGIN_SUCCESS, LOGIN_ERROR]),
  };
}

const mapStateToProps = createStructuredSelector({
  user: selectUser(),
  loggedIn: selectLoggedIn(),
  username: selectUsername(),
  password: selectPassword(),
  deviceFormat: selectDeviceFormat(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(Login));
