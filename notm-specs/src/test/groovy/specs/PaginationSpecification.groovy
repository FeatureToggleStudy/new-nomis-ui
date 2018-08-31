package specs

import geb.spock.GebReportingSpec
import groovy.util.logging.Slf4j
import mockapis.Elite2Api
import mockapis.KeyworkerApi
import model.TestFixture
import org.junit.Rule
import pages.AlertsPage
import pages.CaseNotesPage

import static model.UserAccount.ITAG_USER

@Slf4j
class PaginationSpecification extends GebReportingSpec {

  @Rule
  Elite2Api elite2api = new Elite2Api()

  @Rule
  KeyworkerApi keyworkerApi = new KeyworkerApi()

  TestFixture fixture = new TestFixture(browser, elite2api)
  def offenderNo = "A1234AJ"
  def bookingId = -10
  def agencyId = "${ITAG_USER.staffMember.assginedCaseload}"

  def "should be able to page through the alerts"() {
    elite2api.stubHealthCheck()
    elite2api.stubGetMyDetailsForKeyWorker(ITAG_USER)
    elite2api.stubImage()
    elite2api.stubBookingAlerts(bookingId)
    elite2api.stubOffenderDetails(true)
    elite2api.stubOffenderDetails(false)

    keyworkerApi.stubGetKeyworkerByPrisonAndOffenderNo(agencyId,offenderNo)

    elite2api.stubIEP()
    elite2api.stubAliases()

    given: 'I navigate to an offenders alerts page'
    fixture.loginAs(ITAG_USER)
    go "/offenders/${offenderNo}/alerts"

    when: "I can see the first 10 alerts and click on the next page link"
    at AlertsPage
    assert checkAlerts(0, 10)
    // Scroll to bottom to avoid link being hidden behind the mobile fixed icons
    scrollToBottom()
    nextPageLink.click()

    then: "I can see the next set of alerts"
    assert checkAlerts(10, 20)

    when: "I click on the previous page link"
    scrollToBottom()
    previousPageLink.click()

    then: "I can see the previous set of alerts"
    assert checkAlerts(0, 10)
  }

  def "should be able to page through the case notes"() {
    elite2api.stubHealthCheck()
    elite2api.stubGetMyDetailsForKeyWorker(ITAG_USER)
    elite2api.stubImage()
    elite2api.stubBookingCaseNotes(bookingId)
    elite2api.stubOffenderDetails(true)
    elite2api.stubOffenderDetails(false)

    keyworkerApi.stubGetKeyworkerByPrisonAndOffenderNo(agencyId,offenderNo)

    elite2api.stubIEP()
    elite2api.stubAliases()
    elite2api.stubCaseNoteTypes()
    elite2api.stubMeCaseNoteTypes()

    given: 'I navigate to an offenders case notes'
    fixture.loginAs(ITAG_USER)
    go "/offenders/${offenderNo}/case-notes"

    when: 'I can see the first ten case notes and click on the next page link'
    at CaseNotesPage
    assert checkCaseNotes(0, 10)
    scrollToBottom()
    nextPageLink.click()

    then: 'I can see the next set of case notes'
    assert checkCaseNotes(10, 20)

    when: 'I click on the previous page link'
    scrollToBottom()
    previousPageLink.click()

    then: 'I can see the previous set of alerts'
    assert checkCaseNotes(0, 10)
  }

  def scrollToBottom() {
    js.exec("window.scrollTo(0, document.body.scrollHeight)")
  }

  def checkCaseNotes(Integer start, Integer end) {
    for(Integer index =start; index != end;index++) {
      if( caseNotes[0].text().indexOf("CaseNoteOriginalNoteText${index}") == -1)
        return false
    }
    return true
  }

  def checkAlerts(Integer start, Integer end) {
    for(Integer index =start; index != end;index++) {
      if( alerts[0].text().indexOf("alertType${index}") == -1)
        return false
    }
    return true
  }
}
