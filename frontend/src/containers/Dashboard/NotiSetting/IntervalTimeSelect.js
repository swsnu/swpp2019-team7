import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { postInterval } from '../../../store/actions/intervalSettingAction';


const hours = [
  { value: '0', label: '00' },
  { value: '1', label: '01' },
  { value: '2', label: '02' },
  { value: '3', label: '03' },
  { value: '4', label: '04' },
  { value: '5', label: '05' },
  { value: '6', label: '06' },
  { value: '7', label: '07' },
  { value: '8', label: '08' },
  { value: '9', label: '09' },
  { value: '10', label: '10' },
  { value: '11', label: '11' },
  { value: '12', label: '12' },
  { value: '13', label: '13' },
  { value: '14', label: '14' },
  { value: '15', label: '15' },
  { value: '16', label: '16' },
  { value: '17', label: '17' },
  { value: '18', label: '18' },
  { value: '19', label: '19' },
  { value: '20', label: '20' },
  { value: '21', label: '21' },
  { value: '22', label: '22' },
  { value: '23', label: '23' },
];

const minutes = [
  { value: '0', label: '00' },
  { value: '15', label: '15' },
  { value: '30', label: '30' },
  { value: '45', label: '45' },
];

class IntervalTimeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startHour: '',
      startMin: '',
      endHour: '',
      endMin: '',
      sendHour: '',
      sendMin: '',
    };
  }

  ensureTwoDigitNumber = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  handleChangeStartHour = (event) => {
    this.setState({ startHour: event.target.value });
  };

  handleChangeStartMin = (event) => {
    this.setState({ startMin: event.target.value });
  };

  handleChangeEndHour = (event) => {
    this.setState({ endHour: event.target.value });
  };

  handleChangeEndMin = (event) => {
    this.setState({ endMin: event.target.value });
  };

  handleChangeSendHour = (event) => {
    this.setState({ sendHour: event.target.value });
  };

  handleChangeSendMin = (event) => {
    this.setState({ sendMin: event.target.value });
  };



  onSaveInterval = () => {
    const a = this.ensureTwoDigitNumber(this.state.startHour);
    const b = this.ensureTwoDigitNumber(this.state.startMin);
    const c = this.ensureTwoDigitNumber(this.state.endHour);
    const d = this.ensureTwoDigitNumber(this.state.endMin);
    const e = this.ensureTwoDigitNumber(this.state.sendHour);
    const f = this.ensureTwoDigitNumber(this.state.sendMin);
    this.props.postInterval({
      start_time: `${a}:${b}`,
      end_time: `${c}:${d}`,
      send_time: `${e}:${f}`,
    });
    this.setState({
      startHour: '',
      startMin: '',
      endHour: '',
      endMin: '',
      sendHour: '',
      sendMin: '',
    });
  };

  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <TextField
            // labelId="demo-customized-select-label"
            id="demo-customized-select"
            select
            disabled={false}
            label="From"
            value={this.state.startHour}
            // onChange={this.handleChangeStartHour}
            onChange={this.handleChangeStartHour}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {hours.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // labelId="demo-customized-select-label"
            id="start-minute"
            select
            disabled={false}
            label="To"
            value={this.state.startMin}
            onChange={this.handleChangeStartMin}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {minutes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // labelId="demo-customized-select-label"
            id="end-hour"
            select
            disabled={false}
            label="From"
            value={this.state.endHour}
            // onChange={this.handleChangeStartHour}
            onChange={this.handleChangeEndHour}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {hours.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // labelId="demo-customized-select-label"
            id="end-minute"
            select
            disabled={false}
            label="To"
            value={this.state.endMin}
            onChange={this.handleChangeEndMin}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {minutes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // labelId="demo-customized-select-label"
            id="send-hour"
            select
            disabled={false}
            label="From"
            value={this.state.sendHour}
            // onChange={this.handleChangeStartHour}
            onChange={this.handleChangeSendHour}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {hours.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            // labelId="demo-customized-select-label"
            id="send-minute"
            select
            disabled={false}
            label="To"
            value={this.state.sendMin}
            onChange={this.handleChangeSendMin}
            // variant="outlined"
            style={{ width: 60, marginTop: 30 }}
            // input={<BootstrapInput />}
          >
            {minutes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </form>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          onClick={() => this.onSaveInterval()}
          style={{ marginTop: 20 }}
        >
          Save New Interval Notification
        </Button>
      </div>
    );
  }
}

export default connect(null, {
  postInterval,
})(IntervalTimeSelect);
