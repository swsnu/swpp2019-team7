import React, { Component } from 'react';
import styled from 'styled-components';

import UploadWidget from '../../../../components/UploadWidget/UploadWidget';
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
          <UploadWidget />
        </Wrapper>
      </div>
    );
  }
}

export default LoggedInWidget;
