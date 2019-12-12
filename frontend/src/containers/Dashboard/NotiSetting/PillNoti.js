import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import {
  withStyles,
  createMuiTheme, ThemeProvider,
} from '@material-ui/core/styles';
import {
  Grid, Typography, Avatar,
} from '@material-ui/core';

import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import AddAlertIcon from '@material-ui/icons/AddAlert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';
import * as notiActionCreators from '../../../store/actions/notiAction';

// const useStyles = makeStyles((theme) => ({
const styles = (theme) => ({
  root: {
    height: '100%',
    flex: 2,
    padding: '10',
    marginTop: 50,
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 900,
  },
  avatar: {
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
  deleteText: {
    color: 'red',
  },
  selected: {
    background: '#e1f5fe',
  },
});

const breakpoints = createBreakpoints({});
const mytheme = createMuiTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h5: {
      [breakpoints.down('xs')]: {
        fontSize: '0.9rem',
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.1rem',
      },
    },
  },
});

const PillItemWrapper = styled.section`
  margin-bottom: 2em;
  // background: #f7daad;
`;

class PillNoti extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edit_mode: 0,
      pillNotiSetting: { ...this.props.pillNotiSetting },
    };
  }

  onConfirm() {
    if (this.isRedundant()) {
      alert('Redundant notification times are not allowed. Please set unique times only.');
      return;
    }
    const timeList = [...this.state.pillNotiSetting.time];
    // id should be the pill id
    const webNotiItem = { id: this.state.pillNotiSetting['pill-id'], activated: true, time: timeList };
    this.props.onEditWebNoti(webNotiItem);
    this.setState({ edit_mode: 0 });
  }

  onCancel() {
    if (this.isRedundant()) {
      alert('You can\'t cancel editing unless you remove the redundancy of notification times.');
      return;
    }
    this.setState((currentState) => {
      currentState.edit_mode = 0;

      return { edit_mode: currentState.edit_mode };
    });
  }

  onDateChange = (id) => (date) => {
    this.setState((currentState) => {
      currentState.pillNotiSetting.time[id] = String(date).substring(16, 18) + String(date).substring(19, 21);
      return { pillNotiSetting: currentState.pillNotiSetting };
    });
  };

  onAddPillNoti() {
    this.setState((currentState) => {
      currentState.pillNotiSetting.time.push('0000');
      return {
        pillNotiSetting: currentState.pillNotiSetting,
      };
    });
  }

  onDeletePillNoti(time) {
    const isMatchingTime = (element) => element === time;
    const id = this.state.pillNotiSetting.time.findIndex(isMatchingTime);
    this.setState((currentState) => {
      currentState.pillNotiSetting.time.splice(id, 1);
      return {
        pillNotiSetting: currentState.pillNotiSetting,
      };
    });
  }

  /*
  Function that checks redundancy
  true if redundant.
  false if not redundant.
  */
  isRedundant() {
    let iterator1;
    let iterator2;
    for (iterator1 = 0; iterator1 < (this.state.pillNotiSetting.time.length); iterator1 += 1) {
      for (iterator2 = iterator1 + 1; iterator2 < (this.state.pillNotiSetting.time.length); iterator2 += 1) {
        if (this.state.pillNotiSetting.time[iterator1] === this.state.pillNotiSetting.time[iterator2]) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    let inputFieldIndex = 0;
    const { classes } = this.props;
    // Assuming 'time' is a list of strings like [0900, 1200]
    const timesInputListEdit = (this.state.pillNotiSetting.time).map((time) => (
      <Grid item key={inputFieldIndex++} container alignItems="center">
        <Grid item>
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            key={inputFieldIndex - 1}
            value={`1998-01-04T${time.substring(0, 2)}:${time.substring(2, 4)}`}
            onChange={this.onDateChange(inputFieldIndex - 1)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
        <Grid item>
          <IconButton id="delete-pillnoti-button" aria-label="close" className={classes.margin} onClick={() => { this.onDeletePillNoti(time); }}>
            <DeleteForeverIcon fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    ));
    inputFieldIndex = 0;
    const timesInputListReadOnly = (this.props.pillNotiSetting.time).map((time) => (
      <div key={inputFieldIndex += 1}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          key={inputFieldIndex - 1}
          value={`1998-01-04T${time.substring(0, 2)}:${time.substring(2, 4)}`}
          onChange={this.onDateChange(inputFieldIndex - 1)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          disabled
        />
      </div>
    ));
    if (this.state.edit_mode === 0) {
      if (this.props.pill !== undefined) {
        return (
          <PillItemWrapper>
            <Grid
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={1}>
                <Avatar className={classes.avatar} src={this.props.pill.file}>
                  <LocalHospitalIcon className={classes.icon} />
                </Avatar>
              </Grid>
              <Grid item xs={2}>
                <ThemeProvider theme={mytheme}><Typography variant="h5">{this.state.pillNotiSetting['pill-name']}</Typography></ThemeProvider>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  // className={classes.caption}
                  variant="h5"
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {timesInputListReadOnly}
                  </MuiPickersUtilsProvider>
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton id="edit-button" aria-label="edit" className={classes.margin} onClick={() => { this.setState({ edit_mode: 1 }); }}>
                  <EditIcon fontSize="large" />
                </IconButton>
              </Grid>
            </Grid>
          </PillItemWrapper>
        );
      }

      return (<div />);
    }
    return (
      <PillItemWrapper className="PillNoti">
        <Grid
          container
          justify="space-between"
          alignItems="center"
          className={classes.selected}
        >
          <Grid item xs={1}>
            <Avatar className={classes.avatar} src={this.props.pill.file}>
              <LocalHospitalIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item xs={1}>
            <ThemeProvider theme={mytheme}><Typography variant="h5">{this.state.pillNotiSetting['pill-name']}</Typography></ThemeProvider>
          </Grid>
          <Grid item container justify="center" xs={4}>
            <Typography
              // className={classes.caption}
              variant="h5"
            >
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                {timesInputListEdit}
              </MuiPickersUtilsProvider>
            </Typography>
            <Grid item>
              <IconButton id="add-button" disabled={this.state.pillNotiSetting.time.length >= 10} aria-label="close" className={classes.margin} onClick={() => { this.onAddPillNoti(); }}>
                <AddAlertIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <IconButton id="done-button" aria-label="check" className={classes.margin} onClick={() => { this.onConfirm(); }}>
              <DoneOutlineIcon fontSize="large" />
            </IconButton>
          </Grid>
          <Grid item xs={1}>
            <IconButton id="cancel-edit-button" aria-label="close" className={classes.margin} onClick={() => { this.onCancel(); }}>
              <CancelIcon fontSize="large" />
            </IconButton>
          </Grid>
        </Grid>
      </PillItemWrapper>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onEditWebNoti: (webnotiItem) => { dispatch(notiActionCreators.editWebnoti(webnotiItem)); },
});

export default connect(null, mapDispatchToProps)(withRouter((withStyles(styles)(PillNoti))));
