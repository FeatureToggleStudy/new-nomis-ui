package specs


import groovy.util.logging.Slf4j
import mockapis.Elite2Api
import mockapis.OauthApi
import model.TestFixture
import org.junit.Rule
import pages.HomePage
import pages.LoginPage
import pages.OffenderDetailsPage

import static model.UserAccount.ITAG_USER

@Slf4j
class LoginSpecification extends BrowserReportingSpec {

  @Rule
  Elite2Api elite2Api = new Elite2Api()

  @Rule
  OauthApi oauthApi = new OauthApi()

  TestFixture fixture = new TestFixture(browser, elite2Api, oauthApi)

  def "The login page is present"() {

    when: 'I go to the login page'
    oauthApi.stubAuthorizeRequest()
    to LoginPage

    then: 'The Login page is displayed'
    at LoginPage
  }

  def "Default URI redirects to Login page"() {
    oauthApi.stubAuthorizeRequest()

    when: "I go to the website URL using an empty path"
    go '/'

    then: 'The Login page is displayed'
    at LoginPage
  }

  def "Log in with valid credentials"() {
    oauthApi.stubValidOAuthTokenRequest()

    given: 'I am on the Login page'
    to LoginPage

    oauthApi.stubUsersMe ITAG_USER
    oauthApi.stubUserRoles()
    elite2Api.stubGetMyDetails ITAG_USER

    when: "I login using valid credentials"
    loginAs ITAG_USER, 'password'

    then: 'My credentials are accepted and I am shown the home page'
    at HomePage
  }

  def "Log in successfully with external links available at current caseload prison"() {
    oauthApi.stubValidOAuthTokenRequest()

    given: 'I am on the Login page'
    to LoginPage

    oauthApi.stubUsersMe ITAG_USER
    oauthApi.stubUserRoles()
    elite2Api.stubGetMyDetails(ITAG_USER, true)

    when: "I login using valid credentials"
    loginAs ITAG_USER, 'password'

    then: 'My credentials are accepted and the home page includes the whereabouts icon'
    at HomePage
    manageKeyWorkersLink.text().contains('Manage key workers')
    whereaboutsLink.text().contains('Manage prisoner whereabouts')
    def t = addBulkAppointmentsLink.text()
    t == 'Add bulk appointments'

    useOfForceLink.text() == 'Use of force incidents'

  }

  def "User login takes user back to requested page"() {
    given: "I would like to view a specific offender"
    oauthApi.stubValidOAuthTokenRequest()
    oauthApi.stubUsersMe ITAG_USER
    oauthApi.stubUserRoles()
    elite2Api.stubGetMyDetails ITAG_USER

    elite2Api.stubOffenderDetails(true)
    elite2Api.stubOffenderAddresses()
    elite2Api.stubIEP()
    elite2Api.stubAliases()
    elite2Api.stubImage()
    elite2Api.stubQuickLook()

    browser.go('/offenders/A1234AJ/quick-look')

    when: "I have logged in"
    at LoginPage
    loginAs ITAG_USER, 'password'

    then: "I am taken to quick look for the offender"
    at OffenderDetailsPage
  }

  def "Log out"() {
    given: "I have logged in"
    fixture.loginAs ITAG_USER

    when: "I log out"
    oauthApi.stubLogout()
    header.logout()

    then: "I am returned to the Login page."
    at LoginPage
  }
}
