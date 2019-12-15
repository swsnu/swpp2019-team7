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

import EditIntervalTime from './EditIntervalTime';
import EditSendTime from './EditSendTime';
import { deleteInterval, editInterval } from '../../../store/actions/intervalSettingAction';

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
  constructor(props) {
    super(props);
    this.state = { expanded: true, expandedItem: -1 };
  }

  componentDidMount() {
    console.log('expanded changed: ', this.state.expanded);
  }

  handleDelete(id) {
    const tmp = { id };
    this.props.deleteInterval(tmp);
  }

  handleEdit(id) {
    this.setState((prevState) => ({
      expanded: !prevState.expanded,
      expandedItem: id,
    }));
  }

  submitEdit(intervalItem) {
    this.props.editInterval(intervalItem);
  }

  formatTime(str) {
    if (str < 10) {
      return str.split('')[1];
    }
    return str;
  }

  render() {
    console.log(this.props.intervalsList)
    const { classes } = this.props;
    const intervalList = this.props.intervalsList.map((row) => (
      <TableRow key={row.id}>
        <TableCell component="th" scope="row" align="right" style={{ minWidth: 100, fontWeight: 600 }}>
          interval
          {' '}
          { row.id }
        </TableCell>
        <TableCell align="right" style={{ minWidth: 200, marginRight: 10 }}>
          <EditIntervalTime
            deactivate={this.state.expandedItem !== row.id}
            intervalId={row.id}
            startHour={this.formatTime(row.start_time.split(':')[0])}
            startMin={this.formatTime(row.start_time.split(':')[1])}
            endHour={this.formatTime(row.end_time.split(':')[0])}
            endMin={this.formatTime(row.end_time.split(':')[1])}
          />
        </TableCell>
        <TableCell align="right" style={{ minWidth: 150 }}>
          <EditSendTime
            deactivate={this.state.expandedItem !== row.id}
            sendHour={this.formatTime(row.send_time.split(':')[0])}
            sendMin={this.formatTime(row.send_time.split(':')[1])}
          />
        </TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>pills</TableCell>
        <TableCell align="right" style={{ minWidth: 100 }}>
          <IconButton
            aria-label="edit"
            onClick={() => this.handleEdit(row.id)}
            aria-expanded={this.state.expanded}
          >
            <EditIcon />
          </IconButton>
        </TableCell>
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
  editInterval,
})(withStyles(styles)(SimpleTable));
