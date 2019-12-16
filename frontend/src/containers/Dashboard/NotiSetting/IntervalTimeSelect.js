import React from 'react';
import { connect } from 'react-redux';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import MenuItem from '@material-ui/core/MenuItem';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import { postInterval } from '../../../store/actions/intervalSettingAction';

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h2: {
      fontWeight: 500,
      fontSize: 55,
      // fontStyle: "italic"
    },
    h3: {
      fontWeight: 500,
    },
    h6: {
      [breakpoints.down('sm')]: {
        fontSize: 15,
      },
    },
  },
});

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

  validateInterval = (interval) => {
    const INTERVAL_ERROR = 'End time should be earlier than start time.';
    const RANGE_ERROR = 'Intervals should be mutually disjoint.';

    // Assure end hour/min is later than start hour/min
    const startDate = new Date(2019, 12, 20, interval.startHour, interval.startMin);
    const endDate = new Date(2019, 12, 20, interval.endHour, interval.endMin);

    if (startDate > endDate) {
      return INTERVAL_ERROR;
    }

    const currentDateList = this.props.intervalsList.map((e) => ({
      id: e.id,
      startDate: new Date(
        2019, 12, 20,
        parseInt(e.start_time.split(':')[0]),
        parseInt(e.start_time.split(':')[1]),
      ),
      endDate: new Date(
        2019, 12, 20,
        parseInt(e.end_time.split(':')[0]),
        parseInt(e.end_time.split(':')[1]),
      ),
    }));

    for (const date of currentDateList) {
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

    return 'OK';
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

  handleChangeSendHour = (event) => {
    this.setState({ sendHour: event.target.value });
  };

  handleChangeSendMin = (event) => {
    this.setState({ sendMin: event.target.value });
  };

  onSaveInterval = () => {
    const interval = {
      startHour: this.ensureTwoDigitNumber(this.state.startHour),
      startMin: this.ensureTwoDigitNumber(this.state.startMin),
      endHour: this.ensureTwoDigitNumber(this.state.endHour),
      endMin: this.ensureTwoDigitNumber(this.state.endMin),
      sendHour: this.ensureTwoDigitNumber(this.state.sendHour),
      sendMin: this.ensureTwoDigitNumber(this.state.sendMin),
    };

    const result = this.validateInterval(interval);
    if (result !== 'OK') {
      alert(result);
    } else {
      this.props.postInterval({
        start_time: `${interval.startHour}:${interval.startMin}`,
        end_time: `${interval.endHour}:${interval.endMin}`,
        send_time: `${interval.sendHour}:${interval.sendMin}`,
      });
    }

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
      <ThemeProvider theme={theme}>
        <Grid container direction="column">
          <form noValidate autoComplete="off">
            <Grid item xs={12} container alignItems="flex-end" align="right" style={{ height: 60 }}>
              <Grid item xs={6} lg={10} style={{ paddingRight: 15 }}>
                <Typography variant="h6">
                  Interval Start
                </Typography>
              </Grid>
              <Grid item xs={3} lg={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="demo-customized-select"
                  select
                  disabled={false}
                  label="Start-H"
                  value={this.state.startHour}
                  // onChange={this.handleChangeStartHour}
                  onChange={this.handleChangeStartHour}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {hours.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3} lg={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="start-minute"
                  select
                  disabled={false}
                  label="Start-M"
                  value={this.state.startMin}
                  onChange={this.handleChangeStartMin}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {minutes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="flex-end" align="right" style={{ height: 60 }}>
              <Grid item xs={6} sm={10} style={{ paddingRight: 15 }}>
                <Typography variant="h6">
                  Interval End
                </Typography>
              </Grid>
              <Grid item xs={3} sm={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="end-hour"
                  select
                  disabled={false}
                  label="Start-H"
                  value={this.state.endHour}
                  // onChange={this.handleChangeStartHour}
                  onChange={this.handleChangeEndHour}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {hours.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3} sm={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="end-minute"
                  select
                  disabled={false}
                  label="Start-M"
                  value={this.state.endMin}
                  onChange={this.handleChangeEndMin}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {minutes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} container alignItems="flex-end" align="right" style={{ height: 60 }}>
              <Grid item xs={6} sm={10} style={{ paddingRight: 15 }}>
                <Typography variant="h6">
                  Notification Time
                </Typography>
              </Grid>
              <Grid item xs={3} sm={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="send-hour"
                  select
                  disabled={false}
                  label="Send-H"
                  value={this.state.sendHour}
                  // onChange={this.handleChangeStartHour}
                  onChange={this.handleChangeSendHour}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {hours.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={3} sm={1}>
                <TextField
                  // labelId="demo-customized-select-label"
                  id="send-minute"
                  select
                  disabled={false}
                  label="Send-M"
                  value={this.state.sendMin}
                  onChange={this.handleChangeSendMin}
                  // variant="outlined"
                  style={{ width: 80, marginTop: 30 }}
                  // input={<BootstrapInput />}
                >
                  {minutes.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </form>
          <Grid item xs={12} align="right" style={{ marginTop: 30 }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              // className={classes.button}
              onClick={() => this.onSaveInterval()}
              style={{ marginTop: 20, background: 'black' }}
            >
              Save New Interval Notification
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  intervalsList: state.interval.intervalsList,
});

export default connect(mapStateToProps, {
  postInterval,
})(IntervalTimeSelect);
