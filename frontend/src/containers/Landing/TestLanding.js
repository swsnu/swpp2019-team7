import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import Header from '../Header/Header'
import './TestLanding.css'
import { ReactComponent as VitaminD3} from '../../images/VitaminD3.svg'
import { ReactComponent as Biotin} from '../../images/Biotin.svg'
import { ReactComponent as SuperB} from '../../images/SuperB.svg'
import styled from 'styled-components'


const StyledVitaminD3 = styled(VitaminD3)`
height:18rem;
width:14rem;
// display:block;
margin:auto;
`;

const StyledBiotin = styled(Biotin)`
height:18rem;
width:14rem;
// display:block;
margin:auto;
`;

const StyledSuperB = styled(SuperB)`
height:18rem;
width:14rem;
// display:block;
margin:auto;
`;

const theme = createMuiTheme({
    typography: {
        h2: {
            fontWeight: 600,
        },
    },
});

class TestLanding extends Component {
    render() {
        return (
            <div>
                <Header />
                <ThemeProvider theme={theme}>
                    <div style={{marginTop: 140, fontWeight: 600}}>
                        <Typography variant="h2" gutterBottom className="title">
                            Keep Your Pills Managed
                        </Typography>
                    </div>
                </ThemeProvider>
                <div style={{marginTop: 90}}>
                <Grid item xs={12} >
                    <Grid container justify="center" mt={60}>
                        <Grid key="0" item><StyledVitaminD3 /></Grid>
                        <Grid key="1" item><StyledBiotin /></Grid>
                        <Grid key="2" item><StyledSuperB/></Grid>
                    </Grid>
                </Grid>
            </div>
            </div>
        )

    }
}

export default TestLanding