import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';

import { deleteUserPill, getPill } from '../../../store/actions/pillAction';
import { changeDashboard } from '../../../store/actions/dashboardAction';


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
      fontSize: 28,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

const styles = () => ({
  title: {
    fontWeight: 900,
  },
  avatar: {
    width: 60,
    height: 60,
  },
  icon: {
    height: 32,
    width: 32,
  },
  deleteText: {
    color: 'red',
  },
  card: {
    display: 'flex',
    borderRadius: 20,
  },
  cardDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 40,
    paddingBottom: 40,
    paddingRight: 20,
    paddingLeft: 20,
  },
  cardMedia: {
    width: 160,
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  content: {
    // padding: 0
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 10,
    paddingLeft: 10,
    // flex: '1 0 auto',
  },


  //
  // root: {
  //   flexGrow: 1,
  // },
  // paper: {
  //   // padding: theme.spacing(2),
  //   margin: 16,
  //   maxWidth: 500,
  // },
  // image: {
  //   // width: 150,
  //   height: "",
  // },
  // img: {
  //   // margin: 'auto',
  //   display: 'block',
  //   maxWidth: '100%',
  //   maxHeight: '100%',
  // },
});

class Pill extends Component {
  deletePill(id) {
    console.log('asdf');
    this.props.deleteUserPill(id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Pill">
        <ThemeProvider theme={theme}>
          {/* <Paper className={classes.paper}> */}
          {/*  <Grid container spacing={2}> */}
          {/*    <Grid item style={{padding: 0}}> */}
          {/*      <ButtonBase className={classes.image}> */}
          {/*        <img className={classes.img} alt="complex" src={this.props.file} /> */}
          {/*      </ButtonBase> */}
          {/*    </Grid> */}
          {/*    <Grid item xs sm container alignItems="center"> */}
          {/*      <Grid item xs container direction="column" spacing={2}> */}
          {/*        <Grid item xs> */}
          {/*          <Typography variant="h5"> */}
          {/*            {this.props.name} */}
          {/*          </Typography> */}
          {/*          <Typography variant="body2" gutterBottom> */}
          {/*            {this.props.takemethod} */}
          {/*          </Typography> */}
          {/*        </Grid> */}
          {/*      </Grid> */}
          {/*      <Grid item> */}
          {/*        <IconButton id="delete-button" className={classes.margin} onClick={() => this.deletePill(this.props.id)} style={{ padding: 0 }}> */}
          {/*          <DeleteForeverOutlinedIcon */}
          {/*            fontSize="large" */}
          {/*            component={(svgProps) => ( */}
          {/*              <svg {...svgProps}> */}
          {/*                {React.cloneElement(svgProps.children[0], { */}
          {/*                  fill: '#ff7043', */}
          {/*                })} */}
          {/*              </svg> */}
          {/*            )} */}
          {/*          /> */}
          {/*        </IconButton> */}
          {/*      </Grid> */}
          {/*    </Grid> */}
          {/*  </Grid> */}
          {/* </Paper> */}


          <CardActionArea
            component="a"
            href="#"
            onClick={() => {
              this.props.getPill(this.props.id);
              this.props.changeDashboard(4);
            }}
          >
            <Card className={classes.card} align="center">
              <CardMedia
                component="img"
                className={classes.cover}
                image={this.props.file}
                title={this.props.file}
              />
              <div className={classes.cardDetails} align="center">
                {/* <CardContent className={classes.content}> */}
                <Grid container justify="center" alignItems="center">
                  <Grid item xs={9}>
                    <Typography variant="h5" align="left">
                      {this.props.name}
                    </Typography>
                    <Typography variant="h6" align="left">
                      {this.props.takemethod}
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    {/* <div className={classes.controls}> */}
                    {/*  <Typography */}
                    {/*    variant="h6" */}
                    {/*    style={{ color: '#53a5e0' }} */}
                    {/*    onClick={() => { */}
                    {/*      this.props.getPill(this.props.id); */}
                    {/*      this.props.changeDashboard(4); */}
                    {/*    }} */}
                    {/*  > */}
                    {/*    Detail */}
                    {/*  </Typography> */}
                    <IconButton
                      id="delete-button"
                      className={classes.margin}
                      style={{ padding: 0 }}
                      onClick={(event) => { event.stopPropagation(); this.deletePill(this.props.id); }}
                    >
                      <DeleteForeverOutlinedIcon
                        fontSize="large"
                        component={(svgProps) => (
                          <svg {...svgProps}>
                            {React.cloneElement(svgProps.children[0], {
                              fill: '#ff7043',
                            })}
                          </svg>
                        )}
                      />
                    </IconButton>
                    {/* </div> */}
                  </Grid>
                </Grid>
                {/* </CardContent> */}

              </div>
            </Card>
          </CardActionArea>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect(null, {
  deleteUserPill,
  changeDashboard,
  getPill,
})(withRouter((withStyles(styles)(Pill))));
