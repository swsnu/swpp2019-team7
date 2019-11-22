import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Avatar,
} from '@material-ui/core';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import IconButton from '@material-ui/core/IconButton';

import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';

import { deleteUserPill } from '../../../store/actions/pillAction';

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
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
  cover: {
    width: 151,
  },
});

class Pill extends Component {
  deletePill(id) {
    this.props.deleteUserPill(id);
    this.props.history.push('/dashboard');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Pill">
        <ThemeProvider theme={theme}>
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardMedia
                className={classes.cover}
                image={this.props.file}
                title="Live from space album cover"
              />
              <CardContent>
                <Grid container alignItems="center" spacing={1}>
                  {/*<Grid item xs={3}>*/}
                  {/*  <Avatar src={this.props.file} className={classes.avatar} />*/}
                  {/*</Grid>*/}
                  <Grid item xs={6}>
                    <Typography variant="h5">
                      {this.props.name}
                    </Typography>
                    <Typography variant="h6">
                      {this.props.takemethod}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="h6" style={{ color: '#53a5e0' }}>Detail</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton id="delete-button" className={classes.margin} onClick={() => this.deletePill(this.props.id)} style={{ padding: 0 }}>
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
                  </Grid>
                </Grid>
              </CardContent>
            </div>
          </Card>
        </ThemeProvider>
      </div>
    );
  }
}

export default connect(null, {
  deleteUserPill,
})(withRouter((withStyles(styles)(Pill))));
