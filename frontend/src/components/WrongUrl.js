import React, { Component } from 'react';
import { connect } from 'react-redux';


class WrongUrl extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  
  componentDidMount() {
    this.props.history.push('/landing');
  }
  render() {
    return (
        <div id='wrong-url'></div>
    );
  }
}

export default connect(null, null)(WrongUrl);
