import React from 'react'
import { render } from 'enzyme'
import { IntlProvider } from 'react-intl'
import { FormattedDate, FormattedTime, FormattedDay } from './index'

describe('Internationalized date and time components', () => {
  const dateTimeString = '2018-06-30T23:30:00.000000'

  it('FormattedDate renders ISO8601 formatted date-time string in en-gb locale', () => {
    const wrapper = render(
      <IntlProvider locale="en-gb">
        <FormattedDate value={dateTimeString} />
      </IntlProvider>
    )
    expect(wrapper.html()).toEqual('<span>30/06/2018</span>')
  })

  it('FormattedTime renders ISO8601 formatted date-time string  in en-gb locale', () => {
    const wrapper = render(
      <IntlProvider locale="en-gb">
        <FormattedTime value={dateTimeString} />
      </IntlProvider>
    )
    expect(wrapper.html()).toEqual('<span>23:30</span>')
  })

  it('FormattedDate renders date ISO8601 formatted date-time string in en-us locale', () => {
    const wrapper = render(
      <IntlProvider locale="en-us">
        <FormattedDate value={dateTimeString} />
      </IntlProvider>
    )
    expect(wrapper.html()).toEqual('<span>06/30/2018</span>')
  })

  it('FormattedTime renders ISO8601 formatted date-time string  in en-us locale', () => {
    const wrapper = render(
      <IntlProvider locale="en-us">
        <FormattedTime value={dateTimeString} />
      </IntlProvider>
    )
    expect(wrapper.html()).toEqual('<span>11:30 PM</span>')
  })

  it('FormattedDay renders the correct day name from a date', () => {
    const wrapper = render(<FormattedDay value={dateTimeString} />)
    expect(wrapper.html()).toEqual('<span>Saturday</span>')
  })
})
