import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {withStyles} from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});


class Header extends Component {
    clickLoginHandler = () => {
        this.props.history.push('/login')
    };
    clickSignupHandler = () => {
        this.props.history.push('/signup')
    };
    clickRedirectToLanding = () => {
        this.props.history.push('/testlanding')
    }

    render () {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <AppBar position="static" style={{ background: 'transparent', boxShadow: 'black'}}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            onClick={() => this.clickRedirectToLanding()}
                            color="black"
                            aria-label="menu">
                            {/*<MenuIcon />*/}
                            <Typography variant="h6" className={classes.title} style={{color: 'black'}} >
                                PillBox
                            </Typography>
                        </IconButton>
                        <Typography variant="h6" className={classes.title} style={{color: 'black'}}>
                        </Typography>
                        <Button color="inherit" style={{color: 'black'}} onClick={() => this.clickLoginHandler()}>Log in</Button>
                        <Button color="inherit" style={{color: 'black'}} onClick={() => this.clickSignupHandler()}>Sign Up</Button>
                    </Toolbar>
                </AppBar>
            </div>

            // <div className="Login">
            //     {/*<div className="center-container">*/}
            //     <h1> PillBox - Manage Your Pills With Ease </h1>
            //     <button id='login-button' onClick={() => this.clickLoginHandler()}>Log in</button>
            //     <button id='signup-button' onClick={() => this.clickSignupHandler()}>Sign in</button>
            //     {/*</div>*/}
            //
            // </div>
        )
    }
}

export default withRouter((withStyles(styles)(Header)))