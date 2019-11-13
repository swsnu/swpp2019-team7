import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { Typography, withStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
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
    h4: {
    },
  },
});

// style for Material UI button
const styles = (myTheme) => ({
  fab: {
    margin: myTheme.spacing(3),
  },
  extendedIcon: {
    marginRight: myTheme.spacing(1),
  },
});

const PillListWrapper = styled.section`
  margin: 2em;
  // background: #f7daad;
`;
// const tempPills = [
//   {
//     id: 1, name: '홍삼정', prescription: 'Next: 19:00 PM', image: 'asdf',
//   },
//   {
//     id: 2, name: '마이락토 씨 플러스', prescription: 'Next: 09:00 AM', image: 'asdf',
//   },
// ];

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
      <Pill key={pill.id} id={pill.id} name={pill.product_name} image={pill.image} takemethodpreprocessed={pill.take_method_preprocessed} />
    ));
    return (
      <div className="MyPills">
        <ThemeProvider theme={theme}>
          <div className="title">
            <Typography variant="h3" align="left"> My Pills </Typography>
          </div>
          <Divider />
          <PillListWrapper>{pillList}</PillListWrapper>
          <Fab color="primary" aria-label="add" className={classes.fab} onClick={() => this.handleAddPill()}>
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
