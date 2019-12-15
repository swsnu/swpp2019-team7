import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { deleteInterval } from '../../../store/actions/intervalSettingAction';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

const columns = [
  {
    id: 'interval', label: 'Intervals', align: 'right', minWidth: 100,
  },
  {
    id: 'fromto', label: 'From - To', align: 'right', minWidth: 200,
  },
  {
    id: 'receive', label: 'Notification At', align: 'right', minWidth: 150,
  },
  {
    id: 'pills', label: 'Pills', align: 'right', minWidth: 150,
  },
  {
    id: 'edit', label: 'Edit', align: 'right', minWidth: 80,
  },
  {
    id: 'delete', label: 'Delete', align: 'center', minWidth: 80,
  },
];

class SimpleTable extends React.Component {
  handleDelete(id) {
    console.log('interval slider: ', id);
    const tmp = {'id': id}
    console.log(tmp)
    this.props.deleteInterval(tmp)
  }

  render() {
    const { classes } = this.props;
    const intervalList = this.props.intervalsList.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" align="right" style={{ minWidth: 100, fontWeight: 600 }}>
          interval
          {' '}
          { row.id }
        </TableCell>
        <TableCell align="right" style={{ minWidth: 200, marginRight: 10 }}>
          {/* <Paper style={{background: 'pink', padding: 10}}> */}
          { row.start_time }
          {' '}
          -
          {' '}
          { row.end_time }
          {/* </Paper> */}
        </TableCell>
        <TableCell align="right" style={{ minWidth: 150 }}>{row.send_time}</TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>pills</TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}><EditIcon /></TableCell>
        <TableCell align="center" style={{ minWidth: 100 }}>
          <IconButton aria-label="delete" onClick={() => this.handleDelete(row.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    ));
    return (
      <Paper className={classes.root} id="interval-slider">
        <Table className={classes.table} aria-label="simple table">
          <TableHead style={{ background: '#f0faf1' }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ fontSize: 15, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {intervalList}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  intervalsList: state.interval.intervalsList,
});
export default connect(mapStateToProps, {
  deleteInterval,
})(withStyles(styles)(SimpleTable));
