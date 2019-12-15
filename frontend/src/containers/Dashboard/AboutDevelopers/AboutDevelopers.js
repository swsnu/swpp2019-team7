import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { Typography, withStyles, Avatar } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Jaehun from './Jaehun.png';
import Jeehoon from './Jeehoon.jpeg';
import Jinsun from './Jinsun.jpeg';
import Celine from './Celine.png';

// theme for Material UI Typography
const theme = createMuiTheme({
    typography: {
        fontFamily: "'DM Sans', sans-serif",
        h2: {
            fontWeight: 500,
            fontSize: 55,
            // fontStyle: "italic"
        },
        h3: {
            fontWeight: 500,
        },
        h5: {
            fontWeight: 500,
        },
    },
});

// style for Material UI button
const styles = (myTheme) => ({
    fab: {
        margin: myTheme.spacing(3),
    },
    root: {
        flexGrow: 1,
    },
    greenAvatar: {
        // margin: 10,
        color: '#fff',
        backgroundColor: '#f8bbd0',
    },
    myPillTitle: {
        marginTop: '10%',
        marginBottom: '4%',
        [theme.breakpoints.down('sm')]: {
            marginBottom: '8%',
        },
    },
    closeModal: {
        marginTop: myTheme.spacing(22),
        color: 'white',
    },
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        maxWidth: 500,
    },
    avatar: {
        width: 140,
        height: 140,
    }
});

class AboutDevelopers extends Component {
    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <ThemeProvider theme={theme}>
                    <Paper className={classes.paper}>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item sm={4} xs={12}>
                                <Avatar src={Jaehun} className={classes.avatar} />
                            </Grid>
                            <Grid item sm={8} xs={12} direction="column" container>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        Jaehun Jung
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        <a href="https://github.com/sharkmir1"> Github </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item sm={4} xs={12}>
                                <Avatar src={Jeehoon} className={classes.avatar} />
                            </Grid>
                            <Grid item sm={8} xs={12} direction="column" container>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        Jeehoon Hyun
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        <a href="https://github.com/peterhyun"> Github </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item sm={4} xs={12}>
                                <Avatar src={Jinsun} className={classes.avatar} />
                            </Grid>
                            <Grid item sm={8} xs={12} direction="column" container>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        Jinsun Yoo
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        <a href="https://github.com/jinsun1117"> Github </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Paper className={classes.paper}>
                        <Grid container direction="row" alignItems="center" justify="center">
                            <Grid item sm={4} xs={12}>
                                <Avatar src={Celine} className={classes.avatar} />
                            </Grid>
                            <Grid item sm={8} xs={12} direction="column" container>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        Jeongwon Moon
                                </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography component="h3" variant="h5">
                                        <a href="https://github.com/lookdeceline"> Github </a>
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </ ThemeProvider>
            </div>
        )
    }
}

export default (withRouter((withStyles(styles)(AboutDevelopers))));
