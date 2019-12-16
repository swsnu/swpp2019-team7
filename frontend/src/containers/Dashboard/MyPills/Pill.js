import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import createBreakpoints from '@material-ui/core/styles/createBreakpoints';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Avatar, Typography } from '@material-ui/core';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import IconButton from '@material-ui/core/IconButton';

import CardActionArea from '@material-ui/core/CardActionArea';

import './Pill.css';
import { deleteUserPill, getPill } from '../../../store/actions/pillAction';

const breakpoints = createBreakpoints({});
const theme = createMuiTheme({
  typography: {
    fontFamily: "'Nanum Gothic', sans-serif",
    h5: {
      fontSize: 21,
      fontWeight: 700,
      [breakpoints.down('sm')]: {
        fontSize: 18,
      },
    },
    h6: {
      fontWeight: 500,
      fontSize: 15,
      [breakpoints.down('sm')]: {
        fontSize: 16,
      },
    },
  },
});

const styles = () => ({
  title: {
    fontWeight: 900,
  },
  avatar: {
    width: 151,
    height: 151,
    borderRadius: 10,
    [breakpoints.down('sm')]: {
      width: 140,
      height: 140,
      borderRadius: 10,
    },
  },
  deleteText: {
    color: 'red',
  },
  card: {
    boxShadow: 3,
    borderRadius: 20,
  },
  deleteIcon: {
    fontSize: 36,
    [breakpoints.down('sm')]: {
      fontSize: 32,
    },
  },
  cardDescription: {
    paddingLeft: 32,
    paddingRight: 15,
    paddingTop: 26,
    [breakpoints.down('sm')]: {
      paddingLeft: 40,
      paddingRight: 15,
    },
  },
  hideOverflow: {
    maxHeight: 54,
    overflow: 'hidden',
    [breakpoints.down('sm')]: {
      maxHeight: 46,
    },
  },
});

class Pill extends Component {
  deletePill(id) {
    this.props.deleteUserPill(id);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Pill">
        <Paper elevation={2} style={{ borderRadius: 10 }}>
          <ThemeProvider theme={theme}>
            <CardActionArea
              // component={this.props.name}
              href="#"
              onClick={() => {
                this.props.history.push(`/dashboard/4/${this.props.id}`);
              }}
            >
              <Grid container direction="row">
                <Grid item xs={4}>
                  <Avatar backgroundcolor="rgba(0,0,0,0)" src={this.props.file} className={classes.avatar} variant="square" />
                </Grid>
                <Grid item xs={8} container padding={1} justify="flex-end" alignItems="center" className={classes.cardDescription}>
                  <Grid item xs={12} align="right">
                    <Typography variant="h5" className={classes.hideOverflow}>
                      {this.props.name}
                    </Typography>
                    <Typography variant="h6">
                      {this.props.takemethod}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align="right">
                    <IconButton
                      id="delete-button"
                      className={classes.margin}
                      style={{ padding: 0 }}
                      onClick={(event) => { event.stopPropagation(); this.deletePill(this.props.id); }}
                    >
                      <DeleteOutlineOutlinedIcon
                        className={classes.deleteIcon}
                        component={(svgProps) => (
                          <svg {...svgProps}>
                            {React.cloneElement(svgProps.children[0], {
                              fill: '#fd163f',
                            })}
                          </svg>
                        )}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            </CardActionArea>
          </ThemeProvider>
        </Paper>
      </div>
    );
  }
}

export default connect(null, {
  deleteUserPill,
  getPill,
})(withRouter((withStyles(styles)(Pill))));
