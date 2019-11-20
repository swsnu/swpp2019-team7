import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { connect } from 'react-redux';
import PillNoti from './PillNoti';
import * as notiActionCreators from '../../../store/actions/notiAction';

/*
const tempSetting = [
  { id: 1, name: 'Enable notification', index: 'enable_noti' },
  { id: 2, name: 'Enable hourly notification', index: 'enable_segregate' },
  { id: 3, name: 'Enable Kakaotalk notification', index: 'enable_kakao' },
];
*/

class NotiSetting extends Component {
  componentDidMount() {
    this.props.onGetWebNoti();
  }
  content() {
    if (this.props.webnoti_list !== null) {
      const pillNotiSettingList = this.props.webnoti_list;
      console.log('pillNotiSettingList in NotiSetting.js is :')
      console.log(pillNotiSettingList);
      const renderedList = pillNotiSettingList.map((pillNotiSetting) => (<PillNoti key={pillNotiSetting.id} pillNotiSetting={pillNotiSetting} nmTimes={pillNotiSetting.time.length}/>));
      return (
        <div className="NotiSetting">
          <div className="title">
            <Typography variant="h3" align="left"> Notification Times </Typography>
          </div>
          <Divider />
          <div className="settings">{renderedList}</div>
        </div>
      );
    }
    else {
      return <div className="temp">No pills</div>
    }
  }
  render() {
    return <div className="NotiSetting">{this.content()}</div>
  }
}

const mapStateToProps = (state) => ({
  current_user: state.user.current_user,
  webnoti_list: state.noti.webnoti_list,
});
const mapDispatchToProps = (dispatch) => ({
  onGetWebNoti: () => { dispatch(notiActionCreators.getWebnoti()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotiSetting);
