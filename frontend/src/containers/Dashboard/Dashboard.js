import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Header from '../Header/Header';

import MyPills from './MyPills/MyPills';
import NotiSetting from './NotiSetting/NotiSetting';
import AccountSetting from './AccountSetting/AccountSetting';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: 1400,
    position: 'absolute',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    top: 30,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
});


function dashboardDisplay(itemNo) {
  switch (itemNo) {
    case 0:
      return <MyPills />;
    case 1:
      return <AccountSetting />;
    case 2:
      return <NotiSetting />;
    default:
      return <MyPills />;
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemNumber: 0,
    };
  }

  listItemCreator(itemName, itemNo) {
    return (
      <div>
        <ListItem button id={itemName} onClick={() => { console.log(itemNo); this.setState({ itemNumber: itemNo }); }}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={itemName} />
        </ListItem>
      </div>
    );
  }

  mainListItems() {
    return (
      <div>
        {this.listItemCreator('MyPills', 0)}
        {this.listItemCreator('AccountSettings', 1)}
        {this.listItemCreator('NotificationSettings', 2)}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const text = dashboardDisplay(this.state.itemNumber);
    return (
      <div className={classes.root}>
        <Header />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.toolbar} />
          <List>{this.mainListItems()}</List>
          <Divider />
          <List>
            {['Customer Service', 'App Info'].map((name, index) => (
              <ListItem button key={name}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {text}
        </main>
      </div>
    );
  }
}

export default ((withStyles(styles)(Dashboard)));
