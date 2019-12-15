import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';

import { postInterval } from '../../../store/actions/intervalSettingAction';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

// const useStyles = makeStyles(theme => ({
//   margin: {
//     margin: theme.spacing(1),
//   },
// }));

class IntervalTimeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startHour: '', startMin: '', endHour: '', endMin: '',
    };
  }

  ensureTwoDigitNumber = (num) => {
    if (num < 10) {
      return `0${num}`;
    }
    return num;
  };

  handleChangeStartHour = (event) => {
    this.setState({ startHour: event.target.value });
  };

  handleChangeStartMin = (event) => {
    this.setState({ startMin: event.target.value });
  };

  handleChangeEndHour = (event) => {
    this.setState({ endHour: event.target.value });
  };

  handleChangeEndMin = (event) => {
    this.setState({ endMin: event.target.value });
  };

  onSaveInterval = () => {
    const a = this.ensureTwoDigitNumber(this.state.startHour);
    const b = this.ensureTwoDigitNumber(this.state.startMin);
    const c = this.ensureTwoDigitNumber(this.state.endHour);
    const d = this.ensureTwoDigitNumber(this.state.endMin);
    this.props.postInterval({
      start_time: `${a}:${b}`,
      end_time: `${c}:${d}`,
    });
  };

  render() {
    return (
      <div align="right">
        {/* className={classes.margin} */}
        {/*        Start Time: */}
        {/*        {' '} */}
        {/*        { this.state.startHour } */}
        {/*        {' '} */}
        {/*: */}
        {/*        {' '} */}
        {/*        { this.state.startMin } */}
        {/*        <br /> */}
        {/*        End Time: */}
        {/*        {' '} */}
        {/*        { this.state.endHour } */}
        {/*        {' '} */}
        {/*        : */}
        {/*        {' '} */}
        {/*        { this.state.endMin } */}
        {/*        <br /> */}
        {/* start time */}
        {/* <Grid container alignItems="center"> */}
        {/*  <Grid item > */}
        {/* <Typography variant="h6">Set interval notification from: {'  '}</Typography> */}
        {/*  </Grid> */}
        {/*  <Grid item> */}
        <FormControl style={{ width: 100 }}>
          <InputLabel id="demo-customized-select-label">Hr</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.startHour}
            onChange={this.handleChangeStartHour}
            input={<BootstrapInput />}
          >
            <MenuItem value="10:00">
              {/* <em>10:00AM</em> */}
            </MenuItem>
            <MenuItem value={0}>00</MenuItem>
            <MenuItem value={1}>01</MenuItem>
            <MenuItem value={2}>02</MenuItem>
            <MenuItem value={3}>03</MenuItem>
            <MenuItem value={4}>04</MenuItem>
            <MenuItem value={5}>05</MenuItem>
            <MenuItem value={6}>06</MenuItem>
            <MenuItem value={7}>07</MenuItem>
            <MenuItem value={8}>08</MenuItem>
            <MenuItem value={9}>09</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: 100 }}>
          <InputLabel id="demo-customized-select-label">Minute</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.startMin}
            onChange={this.handleChangeStartMin}
            input={<BootstrapInput />}
          >
            <MenuItem value="10:00AM">
              {/* <em>10:00AM</em> */}
            </MenuItem>
            <MenuItem value={0}>00</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
          </Select>
        </FormControl>
        <br />
        {/*  </Grid> */}
        {/* </Grid> */}
        {/* end time */}
        <FormControl style={{ width: 100 }}>
          <InputLabel id="demo-customized-select-label">Hr</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.endHour}
            onChange={this.handleChangeEndHour}
            input={<BootstrapInput />}
          >
            <MenuItem value="10:00">
              {/* <em>10:00AM</em> */}
            </MenuItem>
            <MenuItem value={0}>00</MenuItem>
            <MenuItem value={1}>01</MenuItem>
            <MenuItem value={2}>02</MenuItem>
            <MenuItem value={3}>03</MenuItem>
            <MenuItem value={4}>04</MenuItem>
            <MenuItem value={5}>05</MenuItem>
            <MenuItem value={6}>06</MenuItem>
            <MenuItem value={7}>07</MenuItem>
            <MenuItem value={8}>08</MenuItem>
            <MenuItem value={9}>09</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={11}>11</MenuItem>
            <MenuItem value={12}>12</MenuItem>
            <MenuItem value={13}>13</MenuItem>
            <MenuItem value={14}>14</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={16}>16</MenuItem>
            <MenuItem value={17}>17</MenuItem>
            <MenuItem value={18}>18</MenuItem>
            <MenuItem value={19}>19</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={21}>21</MenuItem>
            <MenuItem value={22}>22</MenuItem>
            <MenuItem value={23}>23</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: 100 }}>
          <InputLabel id="demo-customized-select-label">Minute</InputLabel>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            value={this.state.endMin}
            onChange={this.handleChangeEndMin}
            input={<BootstrapInput />}
          >
            <MenuItem value="10:00AM">
              {/* <em>10:00AM</em> */}
            </MenuItem>
            <MenuItem value={0}>00</MenuItem>
            <MenuItem value={15}>15</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={45}>45</MenuItem>
          </Select>
        </FormControl>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          // className={classes.button}
          // startIcon={<SaveIcon />}
          onClick={() => this.onSaveInterval()}
          style={{ marginTop: 20 }}
        >
          Save New Interval
        </Button>

      </div>
    );
  }
}

export default connect(null, {
  postInterval,
})(IntervalTimeSelect);
