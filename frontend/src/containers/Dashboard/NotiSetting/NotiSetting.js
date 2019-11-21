import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import SettingItem from './SettingItem';

const tempSetting = [
  { id: 1, name: 'Enable notification', index: 'enable_noti' },
  { id: 2, name: 'Enable hourly notification', index: 'enable_segregate' },
  { id: 3, name: 'Enable Kakaotalk notification', index: 'enable_kakao' },
];

class NotiSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }


  render() {
    const settingList = tempSetting.map((item) => (
      <SettingItem key={item.id} id={item.id} name={item.name} index={item.index} />
    ));
    return (
      <div className="NotiSetting">
        <Typography variant="h1" align="left"> Notification Settings </Typography>
        <Divider />
        <div className="settings">{settingList}</div>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  current_user: state.user.current_user,
});
/*
const mapDispatchToProps = (dispatch) => ({
  onGetUser: () => dispatch(userActionCreators.getUser()),
  onGetNoti: () => dispatch(userActionCreators.getNoti()),
}); */
export default connect(mapStateToProps)(NotiSetting);
