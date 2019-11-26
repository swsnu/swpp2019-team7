import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Avatar,
} from '@material-ui/core';
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
      pillNotiSetting: this.props.pillNotiSetting,
      // parsedTimes is a container for changing times in edit mode
      parsedTimes: [(this.props.pillNotiSetting.time.length > 0) ? `1998-01-04T${this.props.pillNotiSetting.time[0].substring(0, 2)}:${this.props.pillNotiSetting.time[0].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 1) ? `1998-01-04T${this.props.pillNotiSetting.time[1].substring(0, 2)}:${this.props.pillNotiSetting.time[1].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 2) ? `1998-01-04T${this.props.pillNotiSetting.time[2].substring(0, 2)}:${this.props.pillNotiSetting.time[2].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 3) ? `1998-01-04T${this.props.pillNotiSetting.time[3].substring(0, 2)}:${this.props.pillNotiSetting.time[3].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 4) ? `1998-01-04T${this.props.pillNotiSetting.time[4].substring(0, 2)}:${this.props.pillNotiSetting.time[4].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 5) ? `1998-01-04T${this.props.pillNotiSetting.time[5].substring(0, 2)}:${this.props.pillNotiSetting.time[5].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 6) ? `1998-01-04T${this.props.pillNotiSetting.time[6].substring(0, 2)}:${this.props.pillNotiSetting.time[6].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 7) ? `1998-01-04T${this.props.pillNotiSetting.time[7].substring(0, 2)}:${this.props.pillNotiSetting.time[7].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 8) ? `1998-01-04T${this.props.pillNotiSetting.time[8].substring(0, 2)}:${this.props.pillNotiSetting.time[8].substring(2, 4)}` : '',
        (this.props.pillNotiSetting.time.length > 9) ? `1998-01-04T${this.props.pillNotiSetting.time[9].substring(0, 2)}:${this.props.pillNotiSetting.time[9].substring(2, 4)}` : ''],
    };
  }

  onConfirm() {
    /*
    compare all times
    var hi = this.props.pillNotiSetting.time.length
    */
    if (this.isRedundant()) {
      alert('Redundant notification times are not allowed. Please set unique times only.');
      return;
    }
    const timeList = [];
    let i;
    for (i = 0; i < this.state.pillNotiSetting.time.length; i += 1) {
      timeList.push((this.state.parsedTimes[i].substring(11, 13) + (this.state.parsedTimes[i].substring(14, 16))));
    }
    // id should be the pill id
    const webNotiItem = { id: this.props.pillNotiSetting['pill-id'], activated: true, time: timeList };
    this.props.onEditWebNoti(webNotiItem);
    this.setState({ edit_mode: 0 });
  }

  onCancel() {
    if (this.isRedundant()) {
      alert('You can\'t cancel editing unless you remove the redundancy of notification times.');
      return;
    }
    this.setState({
      edit_mode: 0,
    });
  }

  onDateChange = (id) => (date) => {
    this.setState((currentState) => {
      currentState.parsedTimes[id] = `1998-01-04T${String(date).substring(16, 21)}`;
      return { parsedTimes: currentState.parsedTimes };
    });
  };

  onAddPillNoti() {
    this.setState((currentState) => {
      currentState.parsedTimes[currentState.pillNotiSetting.time.length] = '1998-01-04T00:00';
      currentState.pillNotiSetting.time.push('0000');
      console.log(currentState);
      return {
        parsedTimes: currentState.parsedTimes,
        pillNotiSetting: currentState.pillNotiSetting,
      };
    });
  }

  onDeletePillNoti(time) {
    const isMatchingTime = (element) => element === time;
    const id = this.state.pillNotiSetting.time.findIndex(isMatchingTime);

    const time2 = `1998-01-04T${time.substring(0, 2)}:${time.substring(2, 4)}`;
    const isMatchingTime2 = (element) => element === time2;
    const id2 = this.state.parsedTimes.findIndex(isMatchingTime2);
    this.setState((currentState) => {
      currentState.pillNotiSetting.time.splice(id, 1);
      currentState.parsedTimes.splice(id2, 1);
      return {
        pillNotiSetting: currentState.pillNotiSetting,
        parsedTimes: currentState.parsedTimes,
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
        if (this.state.parsedTimes[iterator1] === this.state.parsedTimes[iterator2]) {
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
    const timesInputList = (this.state.pillNotiSetting.time).map((time) => (
      <div key={inputFieldIndex++}>
        <Grid container justify="space-around" alignItems="flex-end">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            key={inputFieldIndex - 1}
            value={this.state.parsedTimes[inputFieldIndex - 1]}
            onChange={this.onDateChange(inputFieldIndex - 1)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
          <IconButton id="delete-pillnoti-button" aria-label="close" className={classes.margin} onClick={() => { this.onDeletePillNoti(time); }}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
        </Grid>
      </div>
    ));
    inputFieldIndex = 0;
    const timesInputListReadOnly = (this.props.pillNotiSetting.time).map(() => (
      <div key={inputFieldIndex += 1}>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          key={inputFieldIndex - 1}
          value={this.state.parsedTimes[inputFieldIndex - 1]}
          onChange={this.onDateChange(inputFieldIndex - 1)}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
          disabled
        />
      </div>
    ));
    if (this.state.edit_mode === 0) {
      return (
        <div className="Pill">
          <PillItemWrapper>
            <Grid
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={1}>
                <Avatar className={classes.avatar}>
                  <LocalHospitalIcon className={classes.icon} />
                </Avatar>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="h5">{this.props.pillNotiSetting['pill-name']}</Typography>
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
        </div>
      );
    }
    return (
      <div className="Pill">
        <PillItemWrapper>
          <Grid
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Avatar className={classes.avatar}>
                <LocalHospitalIcon className={classes.icon} />
              </Avatar>
            </Grid>
            <Grid item xs={1}>
              <Typography variant="h5">{this.props.pillNotiSetting['pill-name']}</Typography>
            </Grid>
            <Grid item container alignItems="center" xs={4}>
              <Grid item xs={12}>
                <Typography
                  // className={classes.caption}
                  variant="h5"
                >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    {timesInputList}
                  </MuiPickersUtilsProvider>
                </Typography>
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
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onEditWebNoti: (webnotiItem) => { dispatch(notiActionCreators.editWebnoti(webnotiItem)); },
});

export default connect(null, mapDispatchToProps)(withRouter((withStyles(styles)(PillNoti))));
