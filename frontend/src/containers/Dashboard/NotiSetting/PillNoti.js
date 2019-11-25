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

import 'date-fns';
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
      /*
       I assumed that the maximum number of notifications per day are 10 times.
       0~9 indicate the KeyboardTimePicker field id for changing the time.
       1998-01-04 === Jeehoon's Birthday : )
      */
      0: (this.props.nmTimes > 0) ? `1998-01-04T${this.props.pillNotiSetting.time[0].substring(0, 2)}:${this.props.pillNotiSetting.time[0].substring(2, 4)}` : '',
      1: (this.props.nmTimes > 1) ? `1998-01-04T${this.props.pillNotiSetting.time[1].substring(0, 2)}:${this.props.pillNotiSetting.time[1].substring(2, 4)}` : '',
      2: (this.props.nmTimes > 2) ? `1998-01-04T${this.props.pillNotiSetting.time[2].substring(0, 2)}:${this.props.pillNotiSetting.time[2].substring(2, 4)}` : '',
      3: (this.props.nmTimes > 3) ? `1998-01-04T${this.props.pillNotiSetting.time[3].substring(0, 2)}:${this.props.pillNotiSetting.time[3].substring(2, 4)}` : '',
      4: (this.props.nmTimes > 4) ? `1998-01-04T${this.props.pillNotiSetting.time[4].substring(0, 2)}:${this.props.pillNotiSetting.time[4].substring(2, 4)}` : '',
      5: (this.props.nmTimes > 5) ? `1998-01-04T${this.props.pillNotiSetting.time[5].substring(0, 2)}:${this.props.pillNotiSetting.time[5].substring(2, 4)}` : '',
      6: (this.props.nmTimes > 6) ? `1998-01-04T${this.props.pillNotiSetting.time[6].substring(0, 2)}:${this.props.pillNotiSetting.time[6].substring(2, 4)}` : '',
      7: (this.props.nmTimes > 7) ? `1998-01-04T${this.props.pillNotiSetting.time[7].substring(0, 2)}:${this.props.pillNotiSetting.time[7].substring(2, 4)}` : '',
      8: (this.props.nmTimes > 8) ? `1998-01-04T${this.props.pillNotiSetting.time[8].substring(0, 2)}:${this.props.pillNotiSetting.time[8].substring(2, 4)}` : '',
      9: (this.props.nmTimes > 9) ? `1998-01-04T${this.props.pillNotiSetting.time[9].substring(0, 2)}:${this.props.pillNotiSetting.time[9].substring(2, 4)}` : '',
    };
  }

  onDateChange = (id) => (date) => {
    this.setState({
      [id]: `1998-01-04T${String(date).substring(16, 21)}`,
    });
  };

  onConfirm() {
    const timeList = [];
    let i;
    for (i = 0; i < this.props.nmTimes; i += 1) {
      timeList.push((this.state[i].substring(11, 13) + (this.state[i].substring(14, 16))));
    }
    // id should be the pill id
    const webNotiItem = { id: this.props.pillNotiSetting['pill-id'], activated: true, time: timeList };
    this.props.onEditWebNoti(webNotiItem);
  }

  onCancel() {
    this.setState({
      0: (this.props.nmTimes > 0) ? `1998-01-04T${this.props.pillNotiSetting.time[0].substring(0, 2)}:${this.props.pillNotiSetting.time[0].substring(2, 4)}` : '',
      1: (this.props.nmTimes > 1) ? `1998-01-04T${this.props.pillNotiSetting.time[1].substring(0, 2)}:${this.props.pillNotiSetting.time[1].substring(2, 4)}` : '',
      2: (this.props.nmTimes > 2) ? `1998-01-04T${this.props.pillNotiSetting.time[2].substring(0, 2)}:${this.props.pillNotiSetting.time[2].substring(2, 4)}` : '',
      3: (this.props.nmTimes > 3) ? `1998-01-04T${this.props.pillNotiSetting.time[3].substring(0, 2)}:${this.props.pillNotiSetting.time[3].substring(2, 4)}` : '',
      4: (this.props.nmTimes > 4) ? `1998-01-04T${this.props.pillNotiSetting.time[4].substring(0, 2)}:${this.props.pillNotiSetting.time[4].substring(2, 4)}` : '',
      5: (this.props.nmTimes > 5) ? `1998-01-04T${this.props.pillNotiSetting.time[5].substring(0, 2)}:${this.props.pillNotiSetting.time[5].substring(2, 4)}` : '',
      6: (this.props.nmTimes > 6) ? `1998-01-04T${this.props.pillNotiSetting.time[6].substring(0, 2)}:${this.props.pillNotiSetting.time[6].substring(2, 4)}` : '',
      7: (this.props.nmTimes > 7) ? `1998-01-04T${this.props.pillNotiSetting.time[7].substring(0, 2)}:${this.props.pillNotiSetting.time[7].substring(2, 4)}` : '',
      8: (this.props.nmTimes > 8) ? `1998-01-04T${this.props.pillNotiSetting.time[8].substring(0, 2)}:${this.props.pillNotiSetting.time[8].substring(2, 4)}` : '',
      9: (this.props.nmTimes > 9) ? `1998-01-04T${this.props.pillNotiSetting.time[9].substring(0, 2)}:${this.props.pillNotiSetting.time[9].substring(2, 4)}` : '',
    });
  }

  render() {
    let inputFieldIndex = 0;
    const { classes } = this.props;
    // Assuming 'time' is a string like 0900, 1200
    // const timesList = (this.props.pillNotiSetting.time).map((time) => (`${time.substring(0, 2)}:${time.substring(2, 4)} `));
    const timesInputList = (this.props.pillNotiSetting.time).map(() => (
      <div key={inputFieldIndex += 1}>
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
          <IconButton id="close-button" aria-label="close" className={classes.margin} onClick={() => { this.onCancel(); this.setState({ edit_mode: 0 }); }}>
            <DeleteForeverIcon fontSize="small" />
          </IconButton>
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
            value={this.state[inputFieldIndex - 1]}
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
            <Grid item xs={4}>
              <Typography
                // className={classes.caption}
                variant="h5"
              >
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  {timesInputList}
                </MuiPickersUtilsProvider>
                <IconButton id="close-button" aria-label="close" className={classes.margin} onClick={() => { this.onCancel(); this.setState({ edit_mode: 0 }); }}>
                  <AddAlertIcon fontSize="large" />
                </IconButton>
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="done-button" aria-label="check" className={classes.margin} onClick={() => { this.onConfirm(); this.setState({ edit_mode: 0 }); }}>
                <DoneOutlineIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="close-button" aria-label="close" className={classes.margin} onClick={() => { this.onCancel(); this.setState({ edit_mode: 0 }); }}>
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
