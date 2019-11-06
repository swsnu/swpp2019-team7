import React, { Component } from 'react';

import { Typography } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Pill from './Pill';

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


const tempPills = [
  {
    id: 1, name: 'Mock Pill 1', prescription: 'Next: 19:00 PM', image: 'asdf',
  },
  {
    id: 2, name: 'Mock Pill 2', prescription: 'Next: 16:00 PM', image: 'asdf',
  },
];

class MyPills extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const pillList = tempPills.map((pill) => (
      <Pill key={pill.id} id={pill.id} name={pill.name} image={pill.image} prescription={pill.prescription} />
    ));
    return (
      <div className="MyPills">
        <ThemeProvider theme={theme}>
          <div className="title">
            <Typography variant="h2" align="left"> My Pills </Typography>
          </div>
          <Divider />
          <div className="pills">{pillList}</div>
        </ThemeProvider>
      </div>
    );
  }
}
export default MyPills;
