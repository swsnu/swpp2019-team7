import React, { Component } from 'react';

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
          <h1> My Pills </h1>
        </div>
        <div className="pills">{pillList}</div>
      </div>
    );
  }
}
export default MyPills;
