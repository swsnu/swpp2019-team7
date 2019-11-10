import React, { Component } from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Grid, Typography, Avatar, withStyles,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { FormGroup } from 'react-bootstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsIcon from '@material-ui/icons/Notifications';

const styles = (theme) => ({
  root: {
    height: '100%',
    marginTop: 50,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
});


class SettingItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true
    }
  }

  toggleChecked(){
    if(this.state.checked === true)
      this.setState({checked: false})
    else
      this.setState({checked: true})
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      <Card
      >
        <CardContent>
          <Grid
            container
            justify="space-between"
            alignItems="flex-end"
          >
            <Grid item>
              <Avatar className={classes.avatar}>
                <NotificationsIcon className={classes.icon} />
              </Avatar>
            </Grid>
            <Grid item>
              <Typography variant="h3">{this.props.name}</Typography>
            </Grid>
            <Grid item>
              <Switch 
                checked={this.state.checked}
                onChange={(event) => this.toggleChecked()}
              />
              {/*<FormGroup>
                <FormControlLabel
                  control={<input type="checkbox" checked={checked} onChange={toggleChecked} />}
                  labelPlacement="end"
                  label="On"
                  size="large"
                />
              </FormGroup>*/}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      </div>
    );
  }
}

export default (withStyles(styles)(SettingItem))