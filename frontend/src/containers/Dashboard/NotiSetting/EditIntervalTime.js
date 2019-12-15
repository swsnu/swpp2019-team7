import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { editInterval } from '../../../store/actions/intervalSettingAction';

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

class EditIntervalTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startHour: props.startHour,
      startMin: props.startMin,
      endHour: props.endHour,
      endMin: props.endMin,
    };
  }

  validateInterval = (interval) => {
    const INTERVAL_ERROR = "End time should be earlier than start time.";
    const RANGE_ERROR = "Intervals should be mutually disjoint.";

    // Assure end hour/min is later than start hour/min
    const startDate = new Date(2019, 12, 20, interval.startHour, interval.startMin);
    const endDate = new Date(2019, 12, 20, interval.endHour, interval.endMin);

    if (startDate > endDate) {
      return INTERVAL_ERROR;
    }

    const currentDateList = this.props.intervalsList.map((e) => {
      return {
        id: e.id,
        startDate: new Date(
          2019, 12, 20,
          parseInt(e.start_time.split(":")[0]),
          parseInt(e.start_time.split(":")[1])
        ),
        endDate: new Date(
          2019, 12, 20,
          parseInt(e.end_time.split(":")[0]),
          parseInt(e.end_time.split(":")[1])
        )
      };
    });

    for (let date of currentDateList) {
      if (date.id !== interval.id) {
        if (+date.startDate === +startDate || +date.startDate === +endDate) {
          return RANGE_ERROR;
        }
        if (date.startDate < startDate) {
          if (date.endDate > startDate) {
            return RANGE_ERROR;
          }
        } else if (date.startDate < endDate) {
          return RANGE_ERROR;
        }
      }
    }

    return "OK";
  };

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

  onSaveInterval = () => {
    const interval = {
      id: this.props.intervalId,
      startHour: this.ensureTwoDigitNumber(this.state.startHour),
      startMin: this.ensureTwoDigitNumber(this.state.startMin),
      endHour: this.ensureTwoDigitNumber(this.state.endHour),
      endMin: this.ensureTwoDigitNumber(this.state.endMin),
    };

    let result;
    if ((result = this.validateInterval(interval)) !== "OK") {
      alert(result);
    } else {
      this.props.editInterval({
        id:this.props.intervalId,
        start_time: `${interval.startHour}:${interval.startMin}`,
        end_time: `${interval.endHour}:${interval.endMin}`,
        send_time: `${this.ensureTwoDigitNumber(this.props.newSendHour)}:${this.ensureTwoDigitNumber(this.props.newSendMin)}`,
      });
      this.props.loseFocus();
    }
  };

  render() {
    return (
      <div>
        <form noValidate autoComplete="off">
          <div>
            <TextField
              id="demo-customized-select"
              select
              disabled={this.props.deactivate}
              value={this.state.startHour}
              onChange={this.handleChangeStartHour}
              style={{ width: 60, marginBottom: 5 }}
            >
              {hours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="start-minute"
              select
              disabled={this.props.deactivate}
              value={this.state.startMin}
              onChange={this.handleChangeStartMin}
              style={{ width: 60, marginBottom: 5 }}
            >
              {minutes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <div>
            <TextField
              id="end-hour"
              select
              disabled={this.props.deactivate}
              value={this.state.endHour}
              onChange={this.handleChangeEndHour}
              style={{ width: 60 }}
            >
              {hours.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="end-minute"
              select
              disabled={this.props.deactivate}
              value={this.state.endMin}
              onChange={this.handleChangeEndMin}
              style={{ width: 60 }}
            >
              {minutes.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>
        </form>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => this.onSaveInterval()}
          style={{ marginTop: 20 }}
        >
          Save
        </Button>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    newSendHour: state.interval.editSendHour,
    newSendMin: state.interval.editSendMin,
    intervalsList: state.interval.intervalsList,
};};

export default connect(mapStateToProps, {
  editInterval,
})(EditIntervalTime);
