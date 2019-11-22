import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { withStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Avatar,
} from '@material-ui/core';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import { deleteUserPill } from '../../../store/actions/pillAction';
import { changeDashboard } from '../../../store/actions/dashboardAction';
import { getPill } from '../../../store/actions/pillAction';
// const useStyles = makeStyles((theme) => ({
const styles = (theme) => ({
  root: {
    height: '100%',
    flex: 2,
    padding: '10',
    marginTop: 50,
  },
  card: {
    display: 'flex',
    marginBottom: theme.spacing(1),
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
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
});

const PillItemWrapper = styled.section`
  margin-bottom: 2em;
  // background: #f7daad;
`;

class Pill extends Component {
  deletePill(id) {
    this.props.deleteUserPill(id);
    this.props.history.push('/dashboard');
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Pill">
        <PillItemWrapper>
          <Grid
            container
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={1}>
              <Avatar className={classes.avatar}>
                <LocalHospitalIcon className={classes.icon} />
              </Avatar>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="h5">{this.props.name}</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography
                className={classes.caption}
                variant="h5"
              >
                {this.props.takemethodpreprocessed}
              </Typography>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="delete-button" aria-label="delete" className={classes.margin} onClick={() => this.deletePill(this.props.id)}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Grid>
            <Grid item xs={1}>
              <IconButton id="delete-button" aria-label="delete" className={classes.margin} onClick={() => {
                this.props.getPill(this.props.id);
                this.props.changeDashboard(4)}}>
                <DeleteIcon fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        </PillItemWrapper>
      </div>
    );
  }
}
// const Pill = (props) => {
//   const { className, ...rest } = props;
//   const classes = useStyles();
//   // TODO add dropdown in Pill component for user noti customization
//   return (
//     <Card
//       {...rest}
//       className={clsx(classes.root, className)}
//     >
//       <CardContent>
//         <Grid
//           container
//           justify="space-between"
//           alignItems="center"
//         >
//           <Grid item>
//             <Avatar className={classes.avatar}>
//               <LocalHospitalIcon className={classes.icon} />
//             </Avatar>
//           </Grid>
//           <Grid item>
//             <Typography variant="h5">{props.name}</Typography>
//           </Grid>
//           <Grid item>
//             <Typography
//               className={classes.caption}
//               variant="h5"
//             >
//               {props.takemethodpreprocessed}
//             </Typography>
//           </Grid>
//           <Grid item>
//             <IconButton aria-label="delete" className={classes.margin} onClick={()=>deletePill()}>
//               <DeleteIcon fontSize="large" />
//             </IconButton>
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// };

export default connect(null, {
  deleteUserPill,
  changeDashboard,
  getPill
})(withRouter((withStyles(styles)(Pill))));

