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
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import * as notiActionCreators from '../../../store/actions/notiAction';

import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
} from '@material-ui/pickers';

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
  state = {
    edit_mode: 0,
    /*
     I assumed that the maximum number of notifications per day are 3 times.
     0~2 indicate the KeyboardTimePicker field id for changing the time.
    */
    0: (0 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][0].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][0].substring(2, 4) : '',
    1: (1 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][1].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][1].substring(2, 4) : '',
    2: (2 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][2].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][2].substring(2, 4) : '',
  }

  onDateChange = id => date => {
    console.log('this.onDateChange Called! date is ');
    console.log(String(date));
    console.log(String(date).substring(16, 21));
    console.log('index is ' + id);
    this.setState({
      [id]: '1998-01-04T' + String(date).substring(16, 21)
    })
  };

  onConfirm() {
    var timeList = [];
    var i;
    for (i = 0; i < this.props.nmTimes; i++) {
      timeList.push((this.state[i].substring(11, 13) + (this.state[i].substring(14, 16))))
    }
    console.log(timeList);
    //id should be the pill id
    const webNotiItem = { id: this.props.pillNotiSetting['pill-id'], activated: true, time: timeList };
    this.props.onEditWebNoti(webNotiItem);
  }

  onCancel() {
    this.setState({
      0: (0 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][0].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][0].substring(2, 4) : '',
      1: (1 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][1].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][1].substring(2, 4) : '',
      2: (2 < this.props.nmTimes) ? '1998-01-04T' + this.props.pillNotiSetting['time'][2].substring(0, 2) + ':' + this.props.pillNotiSetting['time'][2].substring(2, 4) : '',
    })
  }

  render() {

    var inputFieldIndex = 0;
    const { classes } = this.props;
    //Assuming 'time' is a string like 0900, 1200
    const timesList = (this.props.pillNotiSetting['time']).map((time) => (time.substring(0, 2) + ':' + time.substring(2, 4) + " "))
    //const timesInputList = (this.props.pillNotiSetting['time']).map((time) => (<div key={time}><input id={inputFieldIndex++} size='2' value={this.state[inputFieldIndex - 1]} onChange={this.handleInputChange}></input>:<input id={inputFieldIndex++} size='2' value={this.state[inputFieldIndex - 1]} onChange={this.handleInputChange}></input> </div>));
    const timesInputList = (this.props.pillNotiSetting['time']).map((time) => (
      <div key={inputFieldIndex++}>
        <Grid container justify="space-around">
          <KeyboardTimePicker
            margin="normal"
            id="time-picker"
            label="Time picker"
            key={inputFieldIndex - 1}
            value={this.state[inputFieldIndex - 1]}
            onChange={this.onDateChange(inputFieldIndex - 1)}
            KeyboardButtonProps={{
              'aria-label': 'change time',
            }}
          />
        </Grid>
      </div>
    ))
    console.log('inputFieldIndex: ' + inputFieldIndex)
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
                  //className={classes.caption}
                  variant="h5"
                >
                  {timesList}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <IconButton id="edit-button" aria-label="edit" className={classes.margin} onClick={() => { this.setState({ edit_mode: 1 }) }}>
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
            <Grid item xs={2}>
              <Typography variant="h5">{this.props.pillNotiSetting['pill-name']}</Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography
                //className={classes.caption}
                variant="h5"
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {timesInputList}
                </MuiPickersUtilsProvider>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="check-button" aria-label="check" className={classes.margin} onClick={() => { this.onConfirm(); this.setState({ edit_mode: 0 }) }}>
                <CheckIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="close-button" aria-label="close" className={classes.margin} onClick={() => { this.onCancel(); this.setState({ edit_mode: 0 }) }}>
                <CloseIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </PillItemWrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  onEditWebNoti: (webnotiItem) => { dispatch(notiActionCreators.editWebnoti(webnotiItem)) },
});

export default connect(null, mapDispatchToProps)(withRouter((withStyles(styles)(PillNoti))));
