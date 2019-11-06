import React, { Component } from 'react';

import { Typography, withStyles } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Pill from './Pill';

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

const tempPills = [
  {
    id: 1, name: '홍삼정', prescription: 'Next: 19:00 PM', image: 'asdf',
  },
  {
    id: 2, name: '마이락토 씨 플러스', prescription: 'Next: 09:00 AM', image: 'asdf',
  },
];

class MyPills extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    const pillList = tempPills.map((pill) => (
      <Pill key={pill.id} id={pill.id} name={pill.name} image={pill.image} prescription={pill.prescription} />
    ));
    return (
      <div className="MyPills">
        <ThemeProvider theme={theme}>
          <div className="title">
            <Typography variant="h3" align="left"> My Pills </Typography>
          </div>
          <Divider />
          <div className="pills">{pillList}</div>
          <Fab color="primary" aria-label="add" className={classes.fab}>
            <AddIcon />
          </Fab>
        </ThemeProvider>
      </div>
    );
  }
}
export default (withStyles(styles)(MyPills));
