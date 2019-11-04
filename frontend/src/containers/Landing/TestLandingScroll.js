import React, { Component } from 'react';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ThemeProvider } from '@material-ui/core/styles';

import './TestLanding.css'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: 6em;
  background: #fafafa;
`;

const InstructionWrapper = styled.section`
  padding: 4em;
  background: #f7daad;
`;
// background: #3272a3;
const InstructionWrapper2 = styled.section`
  padding: 4em;
  background: #D9EAD3;
`;

const InstructionWrapper3 = styled.section`
  padding: 4em;
  background: #ffcdbc;
`;

// eslint-disable-next-line react/prefer-stateless-function
class TestLandingScroll extends Component {
  render() {
    return (
      <div>
        <Wrapper>
          <Title />
        </Wrapper>
        <ThemeProvider theme={this.props.theme}>
          <InstructionWrapper>
            <Grid container spacing={0}>
              <Grid item xs={7}>
                <div style={{ margin: 25 }}>
                  <Typography variant="h4" gutterBottom className="title">
                    1. Snap a photo or upload an image of your pill bottle name.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </InstructionWrapper>

          <InstructionWrapper2>
            <Grid container spacing={0}>
              <Grid item xs={5} />
              <Grid item xs={7}>
                <div style={{ margin: 25 }}>
                  <Typography variant="h4" gutterBottom className="title">
                    2. Save parsed information about your pill.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </InstructionWrapper2>

          <InstructionWrapper3>
            <Grid container spacing={0}>
              <Grid item xs={7}>
                <div style={{ margin: 25 }}>
                  <Typography variant="h4" gutterBottom className="title">
                    3. Set customized notification so that you never miss out on your pills.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </InstructionWrapper3>
        </ThemeProvider>
      </div>
    );
  }
}

export default TestLandingScroll;
