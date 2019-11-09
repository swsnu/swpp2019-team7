import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Grid, Typography, Avatar,
} from '@material-ui/core';
import Switch from '@material-ui/core/Switch';
import { FormGroup } from 'react-bootstrap';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme) => ({
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
}));

const SettingItem = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();
  let checked = true;
  function toggleChecked() {
    if (checked === true) checked = false;
    else checked = true;
  }
  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
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
            <Typography variant="h3">{props.name}</Typography>
          </Grid>
          <Grid item>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={checked} onChange={toggleChecked} />}
                labelPlacement="end"
                label="On"
                size="large"
              />
            </FormGroup>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default SettingItem;
