import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  createMuiTheme, ThemeProvider, withStyles, withTheme,
} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import SettingsIcon from '@material-ui/icons/Settings';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

import Header from '../Header/Header';
import MyPills from './MyPills/MyPills';
import NotiSetting from './NotiSetting/NotiSetting';
import TelegramSetting from './TelegramSetting/TelegramSetting';
import AccountSetting from './AccountSetting/AccountSetting';
import './Dashboard.css';
import PillDetail from './MyPills/PillDetail/PillDetail';

import * as dashboardActionCreators from '../../store/actions/dashboardAction';

const drawerWidth = 240;

const theme = createMuiTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h2: {
      fontWeight: 500,
      fontSize: 55,
      // fontStyle: "italic"
    },
    h3: {
      fontWeight: 500,
    },
    h5: {
      fontWeight: 500,
    },
  },
});

const styles = (mytheme) => ({
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
    height: '100vh',
    overflow: 'auto',
    // padding: theme.spacing(3),
  },
  container: {
    paddingTop: mytheme.spacing(4),
    paddingBottom: mytheme.spacing(4),
    // [theme.breakpoints.down('sm')]: {
    //   marginLeft: 0,
    // },
    [theme.breakpoints.between('sm', 'md')]: {
      paddingLeft: '7%',
      paddingRight: '7%',
    },

  },
  toolbar: theme.mixins.toolbar,
});


function dashboardDisplay(itemNo) {
  switch (itemNo) {
    case 0:
      return <MyPills />;
    case 1:
      return <NotiSetting />;
    case 2:
      return <TelegramSetting />;
    case 3:
      return <AccountSetting />;
    case 4:
      return <PillDetail />;
    default:
      return <MyPills />;
  }
}


class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

  handleDrawerToggle = () => {
    this.setState((state) => ({ mobileOpen: !state.mobileOpen }));
  };

  listItemCreator(itemName, itemNo, listIcon) {
    return (
      <div>
        <ListItem button id={itemName} onClick={() => { this.props.onChangeDashboard(itemNo); }}>
          <ListItemIcon>
            {listIcon}
          </ListItemIcon>
          <ListItemText primary={itemName} />
        </ListItem>
      </div>
    );
  }

  mainListItems() {
    return (
      <div>
        {this.listItemCreator('My Pills', 0, <LocalHospitalIcon />)}
        {this.listItemCreator('Notification Settings', 1, <SettingsIcon />)}
        {this.listItemCreator('Telegram Setting', 2, <SettingsIcon />)}
        {this.listItemCreator('Account Settings', 3, <SettingsIcon />)}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    const text = dashboardDisplay(this.props.dash.itemNo);
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List>{this.mainListItems()}</List>
        <Divider />
        <List>
          {['App Info', 'About Developers'].map((name, index) => (
            <ListItem button key={name}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={name} />
            </ListItem>
          ))}
        </List>
      </div>
    );
    return (
      <div className={classes.root}>
        <ThemeProvider theme={theme}>
          <Header handleDrawerToggle={this.handleDrawerToggle} />
          {/* temporary sidebar on smaller screens */}
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={this.props.theme.direction === 'rtl' ? 'right' : 'left'}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          {/* permant sidebar on larger screens */}
          <Hidden smDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Container maxWidth="md" className={classes.container}>
              {text}
            </Container>
          </main>
        </ThemeProvider>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  dash: state.dash,
});

const mapDispatchToProps = (dispatch) => ({
  onChangeDashboard: (number) => dispatch(dashboardActionCreators.changeDashboard(number)),
});
export default connect(mapStateToProps, mapDispatchToProps)(withTheme((withStyles(styles)(Dashboard))));
