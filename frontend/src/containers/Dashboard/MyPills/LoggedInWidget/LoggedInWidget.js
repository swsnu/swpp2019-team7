import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';

import DemoWidget from '../../../Landing/DemoWidget/DemoWidget';
import Header from '../../../Header/Header';

const Wrapper = styled.section`
  margin-top: 15em;
  margin-right: 33em;
  margin-left: 33em;
  // background: #f7daad;
`;
// eslint-disable-next-line react/prefer-stateless-function
class LoggedInWidget extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   this.state = {
  //     newPillId: -1,
  //   };
  // }
  //
  // getNewPillId(id) {
  //   this.setState({ newPillId: id });
  // }

  // eslint-disable-next-line class-methods-use-this
  render() {
    return (
      <div>
        <Header />
        <Wrapper>
          <DemoWidget backgroundColor="#ffa184" />
          logged in widget
        </Wrapper>
      </div>
    );
  }
}

export default LoggedInWidget;
