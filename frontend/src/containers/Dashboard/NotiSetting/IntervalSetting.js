import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

import IntervalSlider from './IntervalSlider';

const styles = (theme) => ({
  root: {
    // width: 300 + theme.spacing(3) * 2,
    width: '90%',
  },
  margin: {
    height: theme.spacing(8),
  },
});

const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  // mark: {
  //   height: 24,
  //   width: 24,
  //   backgroundColor: '#fff',
  //   border: '2px solid currentColor',
  //   borderRadius: '100%',
  //   marginTop: -15,
  //   marginLeft: -15,
  //   '&:focus,&:hover,&$active': {
  //     boxShadow: 'inherit',
  //   },
  // },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    // color: 'rgba(0,0,0,100)',
  },
})(Slider);


const PrettoSlider2 = withStyles({
  root: {
    color: '#5178d9',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  // mark: {
  //   height: 24,
  //   width: 24,
  //   backgroundColor: '#fff',
  //   border: '2px solid currentColor',
  //   borderRadius: '100%',
  //   marginTop: -15,
  //   marginLeft: -15,
  //   '&:focus,&:hover,&$active': {
  //     boxShadow: 'inherit',
  //   },
  // },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
    // color: 'rgba(0,0,0,100)',
  },
})(Slider);


function valueLabelFormat(value) {
  // return marks.findIndex(mark => mark.value === value) + 1;
  return `${parseInt(parseInt(value) / 60)}:${parseInt(value) % 60}`;
}


class IntervalSetting extends React.Component {
  updateIntervalValue(e) {
    console.log(e.target.dataset.index);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.margin} />
        {/* <Typography gutterBottom>Your Current Pills</Typography> */}
        {/* <ThemeProvider theme={muiTheme}> */}
        <div className={classes.margin} />
        <div className={classes.margin} />
        <IntervalSlider />
        {/* <SelectIntervalSlider */}
        {/*  // valueLabelDisplay="auto" */}
        {/*  className="Select Interval Slider" */}
        {/*  min={0} */}
        {/*  max={1440} */}
        {/*  // step={0} */}
        {/*  // aria-label="pretto slider" */}
        {/*  marks={marks} */}
        {/*  defaultValue={[360, 1080]} */}
        {/*  valueLabelDisplay="on" */}
        {/*  valueLabelFormat={valueLabelFormat} */}
        {/*  onChange={(e, value) => this.updateIntervalValue(e, value)} */}
        {/*  // onDragStop={ (e) => this.props.update(e, control.id, this.val)} */}
        {/* /> */}
        <div className={classes.margin} />
        <PrettoSlider
          // valueLabelDisplay="auto"
          className="Pretto Slider"
          min={0}
          max={1440}
          step={0}
          // aria-label="pretto slider"
          // marks={marks}
          defaultValue={[0, 1440, 400, 800]}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
          // onDragStop={ (e) => this.props.update(e, control.id, this.val)}
        />
        <div className={classes.margin} />
        <PrettoSlider2
          // valueLabelDisplay="auto"
          className="Pretto Slider2"
          min={0}
          max={1440}
          step={0}
          // aria-label="pretto slider"
          // marks={marks}
          defaultValue={[0, 1440, 1000, 600]}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
          // onDragStop={ (e) => this.props.update(e, control.id, this.val)}
        />
        {/* </ThemeProvider> */}
        <div className={classes.margin} />
      </div>
    );
  }
}

export default (withStyles(styles)(IntervalSetting));


/*

const SelectIntervalSlider = withStyles({
  root: {
    color: '#ff788d',
    height: 14,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  mark: {
    width: 0,
    height: 0,
    borderLeft: '5px solid transparent',
    borderRight: '5px solid transparent',
    borderBottom: '10px solid currentColor',
    // height: 15,
    // width: 2,
    backgroundColor: 'transparent',
    // border: '2px solid currentColor',
    // borderRadius: '20%',
    marginTop: 14,
    marginLeft: -5,
    '&:focus,&:hover,&$active': {
      boxShadow: 'inherit',
    },
  },
  markLabel: {
    marginTop: 20,
    marginLeft: '0.01%',
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 14,
    borderRadius: 4,
  },
  rail: {
    height: 15,
    borderRadius: 4,
    // color: 'rgba(0,0,0,100)',
  },
})(Slider);
const marks = [
  {
    value: 0,
    label: '0AM',
  },
  {
    value: 180,
    label: '3AM',
  },
  {
    value: 360,
    label: '6AM',
  },
  {
    value: 540,
    label: '9AM',
  },
  {
    value: 720,
    label: '12PM',
  },
  {
    value: 900,
    label: '3PM',
  },
  {
    value: 1080,
    label: '6PM',
  },
  {
    value: 1260,
    label: '9PM',
  },
  {
    value: 1440,
    label: '0AM',
  },
];
*/
