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
     0~5 indicate the input field id for changing the time.
     If there are 3 notification times, there are 2 input fields for each, which are for hour and minute respectively.
    */
    0: (0 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][0].substring(0, 2) : '',
    1: (0 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][0].substring(2, 4) : '',
    2: (2 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][1].substring(0, 2) : '',
    3: (2 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][1].substring(2, 4) : '',
    4: (4 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][2].substring(0, 2) : '',
    5: (4 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][2].substring(2, 4) : '',
  }

  //When the user presses the confirm button for changing the schedule
  passesCredential() {
    var i;
    var isValidNum = true;
    const numReg = /^\d{1,2}$/;
    for (i = 0; i < this.props.nmTimes * 2; i = i + 2) {
      if (!numReg.test(this.state[i]) || !numReg.test(this.state[i + 1]) || !(this.state[i] >= 0 && this.state[i] <= 23) || !(this.state[i + 1] >= 0 && this.state[i + 1] <= 59)) {
        isValidNum = false;
        break;
      }
    }
    return isValidNum;
  }

  onConfirm() {
    var timeList = [];
    var i;
    for (i = 0; i < this.props.nmTimes * 2; i = i + 2) {
      timeList.push((this.state[i].length == 1 ? '0' + this.state[i] : this.state[i]) + (this.state[i + 1].length == 1 ? '0' + this.state[i + 1] : this.state[i + 1]))
    }
    console.log(timeList);
    //id should be the pill id
    const webNotiItem = { id: this.props.pillNotiSetting['pill-id'], activated: true, time: timeList };
    if (this.passesCredential()) {
      this.props.onEditWebNoti(webNotiItem);
    }
    else {
      alert('Hour should be between 00 and 23. Minute should be between 00 and 59')
      this.setState({
        0: (0 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][0].substring(0, 2) : '',
        1: (0 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][0].substring(2, 4) : '',
        2: (2 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][1].substring(0, 2) : '',
        3: (2 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][1].substring(2, 4) : '',
        4: (4 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][2].substring(0, 2) : '',
        5: (4 < 2 * this.props.nmTimes) ? this.props.pillNotiSetting['time'][2].substring(2, 4) : '',
      })
    }
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  render() {
    var inputFieldIndex = 0;
    const { classes } = this.props;
    //Assuming 'time' is a string like 0900, 1200
    const timesList = (this.props.pillNotiSetting['time']).map((time) => (time.substring(0, 2) + ':' + time.substring(2, 4) + " "))
    const timesInputList = (this.props.pillNotiSetting['time']).map((time) => (<div key={time}><input id={inputFieldIndex++} size='2' value={this.state[inputFieldIndex - 1]} onChange={this.handleInputChange}></input>:<input id={inputFieldIndex++} size='2' value={this.state[inputFieldIndex - 1]} onChange={this.handleInputChange}></input> </div>));
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
                <IconButton id="delete-button" aria-label="delete" className={classes.margin} onClick={() => { this.setState({ edit_mode: 1 }) }}>
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
                {timesInputList}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="check-button" aria-label="delete" className={classes.margin} onClick={() => this.onConfirm()}>
                <CheckIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="cancel-button" aria-label="delete" className={classes.margin} onClick={() => this.setState({ edit_mode: 0 })}>
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
