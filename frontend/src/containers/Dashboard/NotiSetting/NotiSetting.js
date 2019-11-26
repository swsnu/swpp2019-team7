import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import PillNoti from './PillNoti';
import * as notiActionCreators from '../../../store/actions/notiAction';
import SettingItem from './SettingItem';


const tempSetting = [
  { id: 1, name: 'Enable notification', index: 'enable_noti' },
  { id: 2, name: 'Enable hourly notification', index: 'enable_segregate' },
  { id: 3, name: 'Enable Kakaotalk notification', index: 'enable_kakao' },
];


class NotiSetting extends Component {
  componentDidMount() {
    this.props.onGetWebNoti();
  }

  usersSetting(settingList) {
    return (
      <div className="UserNotiSetting">
        <Typography variant="h1" align="left"> Notification Settings </Typography>
        <Divider />
        <div className="settings">{settingList}</div>
      </div>
    );
  }

  content() {
    if (this.props.webnoti_list !== null) {
      const pillNotiSettingList = this.props.webnoti_list;
      console.log(pillNotiSettingList);
      const renderedList = pillNotiSettingList.map((pillNotiSetting) => (<PillNoti key={pillNotiSetting.id} pillNotiSetting={pillNotiSetting} />));
      return (
        <div className="WebnotiListSetting">
          <div className="title">
            <Typography variant="h3" align="left"> Notification Times </Typography>
          </div>
          <Divider />
          <div className="settings">{renderedList}</div>
        </div>
      );
    }

    return <div className="temp">No pills</div>;
  }

  render() {
    const settingList = tempSetting.map((item) => (
      <SettingItem key={item.id} id={item.id} name={item.name} index={item.index} />
    ));
    return (
      <div className="NotiSetting">
        {this.usersSetting(settingList)}
        {this.content()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  webnoti_list: state.noti.webnoti_list,
});
const mapDispatchToProps = (dispatch) => ({
  onGetWebNoti: () => { dispatch(notiActionCreators.getWebnoti()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotiSetting);
