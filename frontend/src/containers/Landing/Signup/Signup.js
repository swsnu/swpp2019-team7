/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';

import * as userActionCreators from '../../../store/actions/userAction';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright ©
      <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const useStyles = makeStyles(theme => ({
const styles = (theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});


class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email_input: '',
      pw_input: '',
      username_input: '',
    };
  }

    credentialChecker = (e) => {
      e.preventDefault();
      console.log('email: ', this.state.email_input);
      console.log('pw: ', this.state.pw_input);
    };

    onSignupButtonClick = () => {
      const user = {
        email: this.state.email_input,
        password: this.state.pw_input,
        name: this.state.username_input,
      };
      this.props.onSignupUser(user);
    };

    render() {
      const { classes } = this.props;

      return (
        <div className="Signup">
          <h1>PillBox - Manage Your Pills With Ease</h1>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                            Sign up
              </Typography>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="name"
                      name="Name"
                      variant="outlined"
                      required
                      fullWidth
                      id="Name"
                      label="Name"
                      autoFocus
                      onChange={(event) => this.setState({ username_input: event.target.value })}
                    />
                  </Grid>
                  {/* <Grid item xs={12} sm={6}> */}
                  {/*    <TextField */}
                  {/*        variant="outlined" */}
                  {/*        required */}
                  {/*        fullWidth */}
                  {/*        id="lastName" */}
                  {/*        label="Last Name" */}
                  {/*        name="lastName" */}
                  {/*        autoComplete="lname" */}
                  {/*    /> */}
                  {/* </Grid> */}
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      onChange={(event) => this.setState({ email_input: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      onChange={(event) => this.setState({ pw_input: event.target.value })}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControlLabel
                      control={<Checkbox value="allowExtraEmails" color="primary" />}
                      label="I want to receive inspiration, marketing promotions and updates via email."
                    />
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={(event) => {
                    this.credentialChecker(event);
                    this.onSignupButtonClick();
                  }}
                >
                                Sign Up
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link href="#" variant="body2">
                                        Already have an account? Sign in
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={5}>
              <Copyright />
            </Box>
          </Container>
        </div>

      // <div className="Signup">
      //     <h1>PillBox - Manage Your Pills With Ease</h1>
      //     <h2>Login</h2>
      //     <input type="input" id='email-input' value={this.state.email_input}
      //             onChange={(event) => this.setState({email_input: event.target.value })} />
      //     <input type="password" id='pw-input' value={this.state.pw_input}
      //             onChange={(event) => this.setState({pw_input: event.target.value })} />
      //     <input type="username" id='username-input' value={this.state.username_input}
      //             onChange={(event) => this.setState({username_input: event.target.value })} />
      //     <button id='signup-button' onClick={() => this.credentialChecker()}>Sign up</button>
      // </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  onSignupUser: (user) => { dispatch(userActionCreators.signupUser(user)); },
});

// export default Signup
export default connect(null, mapDispatchToProps)(withStyles(styles)(Signup));

//
// export default function SignUp() {
//     const classes = useStyles();
//
//     return (
//         <Container component="main" maxWidth="xs">
//             <CssBaseline />
//             <div className={classes.paper}>
//                 <Avatar className={classes.avatar}>
//                     <LockOutlinedIcon />
//                 </Avatar>
//                 <Typography component="h1" variant="h5">
//                     Sign up
//                 </Typography>
//                 <form className={classes.form} noValidate>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 autoComplete="fname"
//                                 name="firstName"
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="firstName"
//                                 label="First Name"
//                                 autoFocus
//                             />
//                         </Grid>
//                         <Grid item xs={12} sm={6}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="lastName"
//                                 label="Last Name"
//                                 name="lastName"
//                                 autoComplete="lname"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 id="email"
//                                 label="Email Address"
//                                 name="email"
//                                 autoComplete="email"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 variant="outlined"
//                                 required
//                                 fullWidth
//                                 name="password"
//                                 label="Password"
//                                 type="password"
//                                 id="password"
//                                 autoComplete="current-password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <FormControlLabel
//                                 control={<Checkbox value="allowExtraEmails" color="primary" />}
//                                 label="I want to receive inspiration, marketing promotions and updates via email."
//                             />
//                         </Grid>
//                     </Grid>
//                     <Button
//                         type="submit"
//                         fullWidth
//                         variant="contained"
//                         color="primary"
//                         className={classes.submit}
//                     >
//                         Sign Up
//                     </Button>
//                     <Grid container justify="flex-end">
//                         <Grid item>
//                             <Link href="#" variant="body2">
//                                 Already have an account? Sign in
//                             </Link>
//                         </Grid>
//                     </Grid>
//                 </form>
//             </div>
//             <Box mt={5}>
//                 <Copyright />
//             </Box>
//         </Container>
//     );
// }