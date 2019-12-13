import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const styles = () => ({
  root: {
    width: '100%',
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
});

function createData(name, time, pills) {
  return { name, time, pills };
}

const rows = [
  createData('Interval 1', '10AM - 12:30PM', 'Vitamin C, Teardrops,Teardrops, Teardrops',),
  createData('Interval 2', '2:00PM - 5:00PM', 'Vitamin C, Teardrops',),
];

class SimpleTable extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Intervals</TableCell>
              <TableCell align="right" />
              <TableCell align="right">Time</TableCell>
              <TableCell align="right">Pills</TableCell>
              <TableCell align="right">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row" style={{ background: 'yellow' }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ padding: 1 }} />
                <TableCell align="right" style={{ background: 'pink', marginRight: 10 }}>
                  {/* <Paper style={{background: 'pink', padding: 10}}> */}
                  {row.time}
                  {/* </Paper> */}
                </TableCell>
                <TableCell align="right">{row.pills}</TableCell>
                <TableCell align="right"><EditIcon /></TableCell>
                <TableCell align="right"><DeleteIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default (withStyles(styles)(SimpleTable));
