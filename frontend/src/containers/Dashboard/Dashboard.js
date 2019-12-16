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

import AboutDevelopers from './AboutDevelopers/AboutDevelopers';

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
  listItemText: {
    color: 'black',
    fontWeight: 800,
  },
  toolbar: theme.mixins.toolbar,
});


function dashboardDisplay(itemNo) {
  switch (itemNo) {
    case '0':
      return <MyPills />;
    case '1':
      return <NotiSetting />;
    case '2':
      return <TelegramSetting />;
    case '3':
      return <AccountSetting />;
    case '4':
      return <PillDetail />;
    case '5':
      return <AboutDevelopers />;
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
        <ListItem button id={itemName} onClick={() => { this.props.history.push(`/dashboard/${itemNo}`); }}>
          <ListItemIcon>
            {listIcon}
          </ListItemIcon>
          <ListItemText primary={itemName} style={{ color: 'black' }} />
        </ListItem>
      </div>
    );
  }

  mainListItems() {
    return (
      <div>
        {this.listItemCreator('My Pills', 0, <LocalHospitalIcon />)}
        {this.listItemCreator('Notification Settings', 1, <SettingsIcon />)}
        {this.listItemCreator('Telegram Settings', 2, <SettingsIcon />)}
        {this.listItemCreator('Account Settings', 3, <SettingsIcon />)}
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    if(this.props.match.params.itemNo !== '4' && this.props.match.params.pillId) {
      this.props.history.push(`/dashboard/0`)
    }
    const text = dashboardDisplay(this.props.match.params.itemNo);
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <List component="nav">{this.mainListItems()}</List>
        <Divider />
        <List>
          <ListItem button key='About Developers' onClick={() => { this.props.history.push('/dashboard/5'); }}>
            <ListItemIcon><MailIcon /></ListItemIcon>
            <ListItemText primary='About Developers' />
          </ListItem>
        </List>
      </div >
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

export default connect(mapStateToProps, null)(withTheme((withStyles(styles)(Dashboard))));
