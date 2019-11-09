import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import SettingItem from './SettingItem';

const tempSetting = [
  { id: 1, name: 'Enable Notification' },
  { id: 2, name: 'Enable Hourly Notification' },
  { id: 3, name: 'Use KakaoTalk Notification' },
];

class NotiSetting extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const settingList = tempSetting.map((item) => (
      <SettingItem key={item.id} id={item.id} name={item.name} />
    ));
    return (
      <div className="NotiSetting">
        <div className="title">
          <Typography variant="h1" align="left"> Notification Settings </Typography>
        </div>
        <Divider />
        <div className="settings">{settingList}</div>
      </div>
    );
  }
}
export default NotiSetting;