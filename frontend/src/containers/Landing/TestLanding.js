import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components';

import Header from '../Header/Header';
import Scroll from './TestLandingScroll';
import DemoWidget from './DemoWidget/DemoWidget';
import './TestLanding.css';
import { ReactComponent as VitaminD3 } from '../../images/VitaminD3.svg';
import { ReactComponent as Biotin } from '../../images/Biotin.svg';
import { ReactComponent as SuperB } from '../../images/SuperB.svg';


const StyledVitaminD3 = styled(VitaminD3)`
height:16rem;
width:10rem;
// display:block;
margin:auto;
`;

const StyledBiotin = styled(Biotin)`
height:16rem;
width:10rem;
// display:block;
margin:auto;
`;

const StyledSuperB = styled(SuperB)`
height:16rem;
width:10rem;
// display:block;
margin:auto;
`;

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

const WidgetWrapper = styled.section`
  padding: 3em;
  background: #202020;
`;

const WidgetNestedWrapper = styled.section`
  margin: 2em;
  padding: 5em;
  background: #202020;
`;

const TestLanding = () => (
  <div>
    <Header logged_in />
    <ThemeProvider theme={theme}>
      <div style={{ marginTop: 140 }}>
        <Typography variant="h2" gutterBottom className="title" style={{ fontStyle: 'italic' }}>
                          Keep Your Pills Managed
        </Typography>
      </div>
    </ThemeProvider>
    <div style={{ marginTop: 100 }}>
      <Grid item xs={12}>
        <Grid container justify="center" mt={60}>
          <Grid key="0" item><StyledVitaminD3 /></Grid>
          <Grid key="1" item><StyledBiotin /></Grid>
          <Grid key="2" item><StyledSuperB /></Grid>
        </Grid>
      </Grid>
    </div>
    <Scroll theme={theme} />

    <WidgetWrapper>
      <WidgetNestedWrapper>
        <Grid container spacing={7}>
          <Grid item xs={1} />
          <Grid item xs={4}>
            <Grid item>
              <Typography variant="h2" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                Get your pills
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                managed
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="h2" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                right away
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            <DemoWidget />
          </Grid>
          <Grid item xs={2} />
        </Grid>
      </WidgetNestedWrapper>
    </WidgetWrapper>
  </div>
);

export default TestLanding;
