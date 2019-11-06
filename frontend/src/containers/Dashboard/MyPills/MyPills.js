import React, { Component } from 'react';

import { Typography } from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import Pill from './Pill';

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
        <div className="title">
          <Typography variant="h1" align="left"> My Pills </Typography>
        </div>
        <Divider />
        <div className="pills">{pillList}</div>
      </div>
    );
  }
}
export default MyPills;
