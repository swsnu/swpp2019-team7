import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card, CardContent, Grid, Typography, Avatar,
} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    flex: 2,
    padding: '10',
    marginTop: 50,
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 900,
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
  deleteText: {
    color: 'red',
  },
}));

const Pill = (props) => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          alignItems="center"
        >
          <Grid item>
            <Avatar className={classes.avatar}>
              <LocalHospitalIcon className={classes.icon} />
            </Avatar>
          </Grid>
          <Grid item>
            {/* <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              Pill No.
              {' '}
              {props.id}
            </Typography> */}
            <Typography variant="h5">{props.name}</Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.caption}
              variant="h5"
            >
              {props.prescription}
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              className={classes.deleteText}
            >
              Delete
            </Typography>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};

export default Pill;
