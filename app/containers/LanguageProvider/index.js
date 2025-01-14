/*
 *
 * LanguageProvider
 *
 * this component connects the redux state language locale to the
 * IntlProvider component and i18n messages (loaded from `app/translations`)
 */

import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createSelector } from 'reselect'
import { IntlProvider } from 'react-intl'
import { selectLocale } from './selectors'

export class LanguageProvider extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    const { locale, children, messages } = this.props
    return (
      <IntlProvider locale={locale} key={locale} messages={messages[locale]}>
        {React.Children.only(children)}
      </IntlProvider>
    )
  }
}

LanguageProvider.propTypes = {
  locale: PropTypes.string.isRequired,
  messages: PropTypes.shape({ en: PropTypes.shape({}).isRequired, 'en-GB': PropTypes.shape({}).isRequired }).isRequired,
  children: PropTypes.element.isRequired,
}

const mapStateToProps = createSelector(
  selectLocale(),
  locale => ({ locale })
)

const mapDispatchToProps = dispatch => ({ dispatch })

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LanguageProvider)
