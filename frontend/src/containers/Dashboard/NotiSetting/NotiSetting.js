import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import {
  Grid, Typography,
} from '@material-ui/core';
import PillNoti from './PillNoti';
import * as notiActionCreators from '../../../store/actions/notiAction';
import * as pillActionCreators from '../../../store/actions/pillAction';
import SettingItem from './SettingItem';

const styles = () => ({
  settingList: {
    height: '30%',
  },
  content: {
    height: '70%',
  },
});

const tempSetting = [
  { id: 1, name: 'Enable notification', index: 'enable_noti' },
  { id: 2, name: 'Enable hourly notification', index: 'enable_segregate' },
  { id: 3, name: 'Enable Kakaotalk notification', index: 'enable_kakao' },
];


class NotiSetting extends Component {
  componentDidMount() {
    this.props.onGetWebNoti();
    this.props.onGetUserPills();
  }

  usersSetting(settingList) {
    return (
      <div className="UserNotiSetting">
        <Typography variant="h3" align="left"> Notification Settings </Typography>
        <Divider />
        <div className="settings">{settingList}</div>
      </div>
    );
  }

  content() {
    if (this.props.webnoti_list !== null && this.props.pillList.length !== 0) {
      // console.log(this.props.webnoti_list);
      // console.log(this.props.pillList);
      const pillNotiSettingList = this.props.webnoti_list;
      console.log('this.props.pillList: ');
      console.log(this.props.pillList);
      const renderedList = pillNotiSettingList.map((pillNotiSetting) => {
        function checkPill(pill) {
          return pill.id === pillNotiSetting['pill-id'];
        }
        return <PillNoti key={pillNotiSetting.id} pillNotiSetting={pillNotiSetting} pill={this.props.pillList.find(checkPill)} />;
      });
      return (
        <div className="WebnotiListSetting">
          <div className="title">
            <Typography variant="h3" align="left"> Notification Times </Typography>
            <Divider />
          </div>
          <Divider />
          <div className="settings">{renderedList}</div>
        </div>
      );
    }
    return <div className="loading" />;
  }

  render() {
    const { classes } = this.props;
    const settingList = tempSetting.map((item) => (
      <SettingItem key={item.id} id={item.id} name={item.name} index={item.index} />
    ));
    return (
      <div className="NotiSetting">
        <Grid container alignItems="center">
          <Grid item xs={12} className={classes.settingList}>
            {this.usersSetting(settingList)}
          </Grid>
          <Grid item xs={12} className={classes.content}>
            {this.content()}
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webnoti_list: state.noti.webnoti_list,
  pillList: state.pill.pill_list,
});

const mapDispatchToProps = (dispatch) => ({
  onGetWebNoti: () => { dispatch(notiActionCreators.getWebnoti()); },
  onGetUserPills: () => { dispatch(pillActionCreators.getUserPills()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(NotiSetting));
