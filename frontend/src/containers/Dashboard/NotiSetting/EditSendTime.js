import React from 'react';
import { connect } from 'react-redux';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { editSendTime } from '../../../store/actions/intervalSettingAction';

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

class EditSendTime extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sendHour: props.sendHour,
      sendMin: props.sendMin,
    };
  }

  handleChangeSendHour = (event) => {
    const newNum = event.target.value;
    this.setState({ sendHour: newNum });
    this.props.editSendTime({
      sendHour: newNum,
      sendMin: this.state.sendMin,
    });
  };

  handleChangeSendMin = (event) => {
    const newNum = event.target.value;
    this.setState({ sendMin: newNum });
    this.props.editSendTime({
      sendHour: this.state.sendHour,
      sendMin: newNum,
    });
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
              value={this.state.sendHour}
              onChange={this.handleChangeSendHour}
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
              value={this.state.sendMin}
              onChange={this.handleChangeSendMin}
              style={{ width: 60, marginBottom: 5 }}
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
      </div>
    );
  }
}

export default connect(null, {
  editSendTime,
})(EditSendTime);
