import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { Typography, withStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import Pill from './Pill';
import { getUserPills, addUserPill } from '../../../store/actions/pillAction';

// theme for Material UI Typography
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
});


class MyPills extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // pills: [],
    };
  }

  componentDidMount() {
    this.props.getUserPills();
  }

  handleAddPill() {
    this.props.history.push('/loggedinwidget');
  }

  render() {
    const { classes } = this.props;
    const pillList = this.props.pillList.map((pill) => (
      <Grid item key={pill.id} xs={12} md={6} style={{ marginBottom: '2%' }}>
        <CardActionArea component="a" href="#">
          <Pill key={pill.id} id={pill.id} name={pill.product_name} file={pill.file} takemethod={pill.take_method_preprocessed} />
        </CardActionArea>
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
          <Fab id="addpill" color="primary" aria-label="add" className={classes.fab} onClick={() => this.handleAddPill()}>
            <AddIcon />
          </Fab>
        </ThemeProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pillList: state.pill.pill_list,
  loggedIn: state.user.logged_in,
});
export default connect(mapStateToProps, {
  getUserPills,
  addUserPill,
})(withRouter((withStyles(styles)(MyPills))));
