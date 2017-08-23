import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';

import { InputLabel, InputGroup, Base, InputError } from 'components/FormComponents/Input/input.theme';
import { DEFAULT_MOMENT_DATE_FORMAT_SPEC, DEFAULT_MOMENT_TIME_FORMAT_SPEC } from 'containers/App/constants';

import DP from 'react-datepicker';

const DPHolder = styled.div`
  width: 50%;
`;

const DatePicker = styled(DP)`
  ${Base}
`;

const OccurrenceDatePickerStyle = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom:40px;
  }
`;

const DisplayTitle = styled.div`
  font-weight: bold;
  width: 140px;
`;

const DateTimeHolder = styled.div`
  flex-grow: 1;
`;

const DisplayDate = styled.div`
  display: inline-block;
  margin-right: 10px;
`;
const DisplayTime = styled.div`
  display: inline-block;
  margin-right: 10px;
`;

const CancelEditButton = styled.div`
  color: blue;
  cursor: pointer;
  text-align: right;
  text-decoration: underline;
`;

const EditDateTimeHolder = styled.div`
  display: flex;
  flex-direction: row;
`;

const TimeInput = styled.input`
  ${Base}
`;

export const isValidTime = (t) => moment(t, DEFAULT_MOMENT_TIME_FORMAT_SPEC).format(DEFAULT_MOMENT_TIME_FORMAT_SPEC) === t;
export const isValidDate = (d) => moment(d, DEFAULT_MOMENT_DATE_FORMAT_SPEC).format(DEFAULT_MOMENT_DATE_FORMAT_SPEC) === d;

class OccurrenceDateTimePicker extends React.Component {
  static propTypes = {
    locale: PropTypes.string,
    editable: PropTypes.bool,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
    }),
    title: PropTypes.string,
  }

  static defaultProps = {
    locale: 'en',
    placeholder: '',
    title: '',
    editable: false,
  }

  constructor(props) {
    super(props);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleBlurDate = this.handleBlurDate.bind(this);
    this.handleChangeTime = this.handleChangeTime.bind(this);
    this.toggleEditing = this.toggleEditing.bind(this);
    this.state = { date: moment(), editing: false, selectedDate: null, selectedTime: '', errors: { time: '', date: '' } };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      5 * 1000
    );
    // Execute tick immediately component mounts to ensure dates & times displayed in correct format
    // as soon as component is displayed.
    this.tick();
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: moment(),
    });
  }

  handleBlurDate(event) {
    const dateString = event.target.value;
    const error = !isValidDate(dateString);
    const errors = { time: this.state.errors.time, date: error };
    this.setState({ selectedDateString: dateString, errors });
    this.runInputChange(dateString, this.state.selectedTime, errors);
  }

  handleChangeDate(dateMoment) {
    const dateString = dateMoment.format(DEFAULT_MOMENT_DATE_FORMAT_SPEC);
    const error = !isValidDate(dateString);
    const errors = { date: error, time: this.state.errors.time };
    this.setState({ selectedDate: dateMoment, selectedDateString: dateString, errors });
    this.runInputChange(dateString, this.state.selectedTime, errors);
  }

  handleChangeTime(event) {
    const time = event.target.value;
    const error = !isValidTime(time);
    const errors = { time: error, date: this.state.errors.date };
    this.setState({ selectedTime: time, errors });
    this.runInputChange(this.state.selectedDateString, time, errors);
    event.preventDefault();
  }

  runInputChange(date, time, errors) {
    if (date === '' && time === '') {
      this.props.input.onChange('');
    } else if (!errors.date && !errors.time) {
      // Not the prettiest way to get the ISO 1806 format as needed...
      const dtString = moment(`${date} ${time}`, `${DEFAULT_MOMENT_DATE_FORMAT_SPEC} ${DEFAULT_MOMENT_TIME_FORMAT_SPEC}`);
      this.props.input.onChange(dtString.format('YYYY-MM-DDTHH:mm:ss'));
    } else {
      this.props.input.onChange('error');
    }
  }

  toggleEditing() {
    if (this.state.editing) {
      this.setState({ editing: false, selectedDate: null, selectedDateString: '', selectedTime: '' });
      this.runInputChange('', '');
    } else {
      this.setState({ editing: true });
      this.runInputChange(null, null, { date: true, time: true });
    }
  }

  render() {
    const {
      // input,
      // placeholder,
      // meta,
      locale,
      editable,
      title,
    } = this.props;

    moment.locale(locale);

    // const { touched, error } = meta;
    if (this.state.editing) {
      const date = this.state.selectedDate;
      const time = this.state.selectedTime;
      const errors = this.state.errors;
      const errorString = [errors.date ? `incorrect date format (${moment().format(DEFAULT_MOMENT_DATE_FORMAT_SPEC)})` : '', errors.time ? `incorrect time format (${moment().format(DEFAULT_MOMENT_TIME_FORMAT_SPEC)})` : ''].filter((x) => x !== '').join(' and ');

      return (<InputGroup error={errorString}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <InputLabel>{title}</InputLabel>
          <CancelEditButton onClick={this.toggleEditing} role="button">cancel</CancelEditButton>
        </div>
        <InputError error={errorString}>{errorString ? `I${errorString.slice(1)}` : null}</InputError>
        <EditDateTimeHolder>
          <DPHolder>
            <DatePicker
              placeholderText="Select Date"
              selected={date}
              onChange={this.handleChangeDate}
              onBlur={this.handleBlurDate}
            />
          </DPHolder>
          <TimeInput value={time} placeholder={'Set Time'} onChange={this.handleChangeTime} onBlur={this.handleChangeTime} />
        </EditDateTimeHolder>

      </InputGroup>);
    }

    return (
      <OccurrenceDatePickerStyle>
        <DisplayTitle>{title}</DisplayTitle>
        <DateTimeHolder>
          <DisplayDate>{this.state.date.format(DEFAULT_MOMENT_DATE_FORMAT_SPEC)}</DisplayDate>
          <DisplayTime>{this.state.date.format(DEFAULT_MOMENT_TIME_FORMAT_SPEC)}</DisplayTime>
        </DateTimeHolder>
        {editable ? <CancelEditButton onClick={this.toggleEditing} role="button">{this.state.editing ? 'cancel' : 'edit'}</CancelEditButton> : null}
      </OccurrenceDatePickerStyle>
    );
  }
}

export default OccurrenceDateTimePicker;
