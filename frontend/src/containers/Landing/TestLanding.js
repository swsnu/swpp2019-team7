import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {
  createMuiTheme, ThemeProvider, makeStyles,
} from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import styled from 'styled-components';

import Header from '../Header/Header';
import DemoWidget from './DemoWidget/DemoWidget';
import './TestLanding.css';
import { ReactComponent as VitaminD3 } from '../../images/VitaminD3.svg';
import { ReactComponent as Biotin } from '../../images/Biotin.svg';
import { ReactComponent as SuperB } from '../../images/SuperB.svg';


const StyledVitaminD3 = styled(VitaminD3)`
width: 100%;
height:auto;
margin:auto;
`;

const StyledBiotin = styled(Biotin)`
width: 100%;
height:auto;
margin:auto;
`;

const StyledSuperB = styled(SuperB)`
width: 100%;
height:auto;
margin:auto;
`;

const breakpoints = createBreakpoints({});
const mytheme = createMuiTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    h2: {
      fontWeight: 500,
      fontSize: '4rem',
      [breakpoints.down('sm')]: {
        fontSize: '3.4rem',
      },
      [breakpoints.down('xs')]: {
        fontSize: '3rem',
      },
    },
    h3: {
      fontWeight: 500,
      fontSize: '4rem',
      [breakpoints.down('sm')]: {
        fontSize: '3rem',
      },
      [breakpoints.down('xs')]: {
        fontSize: '2.8rem',
      },
    },
    h4: {
      [breakpoints.down('xs')]: {
        fontSize: '1.45rem',
      },
      [breakpoints.down('sm')]: {
        fontSize: '1.65rem',
      },
    },
  },
});


const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  widgetContent: {
    backgroundColor: '#202020',
  },
  tutorialsContent: {
    padding: theme.spacing(0, 0, 0, 0),
  },
}));

function TestLanding() {
  const classes = useStyles();
  return (
    <div>
      {/* Header */}
      <Header logged_in />
      {/* Landing Title & Images Section */}
      <Container>
        <ThemeProvider theme={mytheme}>
          <div style={{ marginTop: '11%' }}>
            <Typography variant="h2" gutterBottom className="title" style={{ fontStyle: 'italic' }}>
              Keep Your Pills Managed
            </Typography>
          </div>
        </ThemeProvider>
        <div style={{ marginTop: 100 }}>
          <Grid container>
            <Grid item lg={4} md={3} xs={2} />
            <Grid item container lg={4} md={6} xs={8} justify="center" mt={60}>
              <Grid key="0" item xs style={{ marginRight: '1.5%' }}><StyledVitaminD3 /></Grid>
              <Grid key="1" item xs style={{ marginRight: '1.5%' }}><StyledBiotin /></Grid>
              <Grid key="2" item xs><StyledSuperB /></Grid>
            </Grid>
            <Grid item lg={4} md={3} xs={2} />
          </Grid>
        </div>
      </Container>
      {/* Tutorials Section */}
      <Container maxWidth={false} className={classes.tutorialsContent}>
        <Grid container spacing={0} style={{ backgroundColor: '#f7daad', paddingTop: '2%', paddingBottom: '2%' }}>
          <Grid item md={2} xs={1} />
          <Grid item md={6} xs={7}>
            <Typography variant="h4" gutterBottom className="title">
              1. Snap a photo or upload an image of your pill bottle name.
            </Typography>
          </Grid>
          <Grid item md={4} xs={4} />
        </Grid>
        <Grid container spacing={0} style={{ backgroundColor: '#D9EAD3', paddingTop: '2%', paddingBottom: '2%' }}>
          <Grid item md={4} xs={4} />
          <Grid item md={6} xs={7}>
            <Typography variant="h4" gutterBottom className="title">
              2. Check parsed information about your pill and save it.
            </Typography>
          </Grid>
          <Grid item md={2} xs={1} />
        </Grid>
        <Grid container spacing={0} style={{ backgroundColor: '#ffcdbc', paddingTop: '2%', paddingBottom: '2%' }}>
          <Grid item md={2} xs={1} />
          <Grid item md={6} xs={7}>
            <Typography variant="h4" gutterBottom className="title">
              3. Set customized notification so you never miss your pills.
            </Typography>
          </Grid>
          <Grid item md={4} xs={4} />
        </Grid>
      </Container>
      {/* DemoWidget Section */}
      <div className={classes.widgetContent}>
        <Container>
          <Grid container justify="center" style={{ paddingTop: '7%', paddingBottom: '7%' }}>
            <Grid item style={{ paddingBottom: '5%' }}>
              <Grid item>
                <Typography variant="h3" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                  Get your pills
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                  managed
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h3" gutterBottom className="title" style={{ color: 'white', textAlign: 'right' }}>
                  right away
                </Typography>
              </Grid>
            </Grid>
            <Grid item xs={8} sm={5} md={4} style={{ paddingLeft: '3%' }}>
              <DemoWidget backgroundColor="#cfe8fc" />
            </Grid>
          </Grid>
        </Container>
      </div>
    </div>
  );
}

export default TestLanding;
