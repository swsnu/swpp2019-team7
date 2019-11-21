import React, { Component } from 'react';
import {
  Card, CardContent, Grid, Typography, Avatar, withStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { connect } from 'react-redux';

import * as userActionCreators from '../../../store/actions/userAction';

const styles = (theme) => ({
  root: {
    height: '100%',
    marginTop: 50,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
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
    noti[this.props.index] = !noti[this.props.index];
    this.props.onEditNoti(noti);
  }

  render() {
    console.log('rerender')
    console.log(this.props.index)
    let checked = false;
    let disabled = false;
    const one = 1;
    if (this.props.noti) {
      checked = this.props.noti[this.props.index];
      if (this.props.index !== 'enable_noti') {
        disabled = !this.props.noti['enable_noti'];
      }
    }
    const { classes } = this.props;
    return (
      <div className="SettingItem">
        <Card>
          <CardContent>
            <Grid
              container
              justify="space-between"
              alignItems="flex-end"
            >
              <Grid item>
                <Avatar className={classes.avatar}>
                  <NotificationsIcon className={classes.icon} />
                </Avatar>
              </Grid>
              <Grid item>
                <Typography variant="h3">{this.props.name}</Typography>
              </Grid>
              <Grid item>
                <Switch
                  id="onoff-switch"
                  checked={checked}
                  onChange={() => this.toggleChecked()}
                  disabled={disabled}
                />
                {/* <FormGroup>
                <FormControlLabel
                  control={<input type="checkbox" checked={checked} onChange={toggleChecked} />}
                  labelPlacement="end"
                  label="On"
                  size="large"
                />
              </FormGroup> */}
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
  // onGetUser: () => dispatch(userActionCreators.getUser()),
  // onGetNoti: () => dispatch(userActionCreators.getNoti()),
  onEditNoti: (noti) => dispatch(userActionCreators.editNoti(noti)),
});
export default connect(mapStateToProps, mapDispatchToProps)((withStyles(styles)(SettingItem)));
