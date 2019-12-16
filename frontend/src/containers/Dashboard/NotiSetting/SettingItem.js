import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  Card, CardContent, Grid, Typography, withStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';

import * as userActionCreators from '../../../store/actions/userAction';

const breakpoints = createBreakpoints({});
const styles = (theme) => ({
  root: {
    height: '100%',
    marginTop: 50,
  },
  card: {
    borderRadius: 10,
  },
  cardContent: {
    padding: 16,
    '&:last-child': {
      paddingBottom: 16,
    },
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    height: 48,
    width: 48,
  },
  icon: {
    height: 36,
    width: 36,
    color: '#fd163f',
    marginLeft: 20,
    [breakpoints.down('xs')]: {
      marginLeft: 10,
    },
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
});


class SettingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  /*
  componentDidMount() {
    this.props.onGetUser();
    this.props.onGetNoti();
  } */

  toggleChecked() {
    const { noti } = this.props;
    console.log(noti);
    noti[this.props.index] = !noti[this.props.index];
    this.props.onEditNoti(noti);
  }

  render() {
    let checked = false;
    let disabled = false;
    checked = this.props.noti[this.props.index];
    if (this.props.index !== 'enable_noti') {
      disabled = !this.props.noti.enable_noti;
    }
    const { classes } = this.props;
    return (
      <div className="SettingItem">
        <Card elevation={2} className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Grid
              container
              justify="space-between"
              alignItems="center"
            >
              <Grid item xs={2}>
                <NotificationsNoneIcon className={classes.icon} />
              </Grid>
              <Grid item xs={1} />
              <Grid item xs={7}>
                <Typography variant="h5">{this.props.name}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Switch
                  id="onoff-switch"
                  checked={checked}
                  onChange={() => this.toggleChecked()}
                  disabled={disabled}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  noti: state.user.noti_setting,
});

const mapDispatchToProps = (dispatch) => ({
  onEditNoti: (noti) => dispatch(userActionCreators.editNoti(noti)),
});
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(SettingItem)));
