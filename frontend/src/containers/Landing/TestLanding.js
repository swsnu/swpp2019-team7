import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import styled from 'styled-components'

import Header from '../Header/Header'
import Scroll from './TestLandingScroll'
import './TestLanding.css'
import { ReactComponent as VitaminD3} from '../../images/VitaminD3.svg'
import { ReactComponent as Biotin} from '../../images/Biotin.svg'
import { ReactComponent as SuperB} from '../../images/SuperB.svg'


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
            "fontWeight": 500,
            "fontSize": 55,
            fontStyle: "italic"
        },
        h4: {
        }
    },
});

class TestLanding extends Component {
    render() {
        return (
            <div>
                <Header />
                <ThemeProvider theme={theme}>
                    <div style={{marginTop: 140, }}>
                        <Typography variant="h2" gutterBottom className="title">
                            Keep Your Pills Managed
                        </Typography>
                    </div>
                </ThemeProvider>
                <div style={{marginTop: 100}}>
                    <Grid item xs={12} >
                        <Grid container justify="center" mt={60}>
                            <Grid key="0" item><StyledVitaminD3 /></Grid>
                            <Grid key="1" item><StyledBiotin /></Grid>
                            <Grid key="2" item><StyledSuperB/></Grid>
                        </Grid>
                    </Grid>
                </div>
                <Scroll theme={theme}/>
            </div>
        )

    }
}

export default TestLanding