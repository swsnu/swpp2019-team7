import React, { Component } from 'react';
import styled from 'styled-components';

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
