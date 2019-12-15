import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography, withStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddIcon from '@material-ui/icons/Add';

import Pill from './Pill';
import LoggedInWidget from './LoggedInWidget/LoggedInWidget';
import { getUserPills, addUserPill } from '../../../store/actions/pillAction';
import { handleDialogReset } from '../../../store/actions/dialogAction';

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

// style for Material UI button
const styles = (myTheme) => ({
  fab: {
    margin: myTheme.spacing(3),
  },
  greenAvatar: {
    // margin: 10,
    color: '#fff',
    backgroundColor: '#f8bbd0',
  },
  myPillTitle: {
    marginTop: '10%',
    marginBottom: '4%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: '8%',
    },
  },
  closeModal: {
    marginTop: myTheme.spacing(22),
    color: 'white',
  },
});

const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
Transition.displayName = 'Transition';

class MyPills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.getUserPills();
  }

  handleAddPill() {
    this.setState(() => ({ open: true }));
    this.props.handleDialogReset();
  }

  handleClose() {
    this.setState(() => ({ open: false }));
  }

  handleAddPillManually() {
    this.props.history.push('/manuallyadd');
  }

  render() {
    const { classes } = this.props;
    const pillList = this.props.pillList.map((pill) => (
      <Grid item key={pill.id} xs={12} md={6} style={{ marginBottom: '2%' }}>
        <Pill key={pill.id} id={pill.id} name={pill.product_name} file={pill.file} takemethod={pill.take_method_preprocessed} />
      </Grid>
    ));
    return (
      <div className="MyPills">
        <ThemeProvider theme={theme}>
          <Grid container>
            <Grid item xs={12}>
              <Typography variant="h3" align="left" style={{ marginTop: '10%', marginBottom: '6%' }}> My Pills </Typography>
            </Grid>
          </Grid>
          {/* Pill List */}
          <Grid container spacing={4}>
            {pillList}
          </Grid>
          <Fab id="addpill" color="primary" aria-label="add" variant="extended" className={classes.fab} onClick={() => this.handleAddPill()}>
            <AddIcon />
            Add by photo
          </Fab>
          <Fab id="addpillManually" color="secondary" aria-label="add" variant="extended" className={classes.fab} onClick={() => this.handleAddPillManually()}>
            <AddIcon />
            Add manually
          </Fab>
          <Dialog
            id="dialog"
            fullScreen
            // onBackdropClick
            open={this.state.open && this.props.dialogOpened}
            // onClose={this.handleClose}
            TransitionComponent={Transition}
            PaperProps={{
              style: {
                backgroundColor: 'rgba(32,32,32,1)',
                // boxShadow: 'none',
              },
            }}
          >
            <IconButton id="close-dialog" className={classes.closeModal} color="inherit" onClick={() => this.handleClose()} aria-label="close">
              <CloseIcon fontSize="large" />
            </IconButton>
            <LoggedInWidget />
          </Dialog>
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pillList: state.pill.pill_list,
  loggedIn: state.user.logged_in,
  dialogOpened: state.dialog.open,
});
export default connect(mapStateToProps, {
  getUserPills,
  addUserPill,
  handleDialogReset,
})(withRouter((withStyles(styles)(MyPills))));
