import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


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
    // color: 'red',
  },
  rail: {
    height: 15,
    borderRadius: 4,
    // color: 'rgba(0,0,0,100)',
  },
})(Slider);


function valueLabelFormat(value) {
  // return marks.findIndex(mark => mark.value === value) + 1;
  return `${parseInt(parseInt(value) / 60)}:${parseInt(value) % 60}`;
}


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

class IntervalSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { intervalStart: '', intervalEnd: '' };
  }

  componentDidMount() {
    /* const node = ReactDOM.findDOMNode(this);
    const tmp = node.getElementsByClassName('MuiSlider-thumb WithStyles(ForwardRef(Slider))-thumb-824 MuiSlider-thumbColorPrimary PrivateValueLabel-open-852 PrivateValueLabel-thumb-851');
    tmp[0].style.color = 'blue';
    tmp[0].style.backgroundColor = '#5178d9'; */
  }

  updateIntervalValue(e, value) {
    console.log(e);
    console.log(e.target.dataset.index);
    // console.log(e.toElement)
    console.log(value);
    this.setState({ intervalStart: value[0] });
    this.setState({ intervalEnd: value[1] });
    // if (e.target.dataset.index == 0) {
    //   this.setState({intervalStart: value})
    // }
  }

  render() {
    console.log('render');
    return (
      <div className="IntervalSlider">
        <SelectIntervalSlider
          // valueLabelDisplay="auto"
          className="SelectIntervalSlider"
          id="select-interval-slider"
          min={0}
          max={1440}
          // step={0}
          // aria-label="pretto slider"
          marks={marks}
          defaultValue={[360, 1080, 900, 500]}
          valueLabelDisplay="on"
          valueLabelFormat={valueLabelFormat}
          onChange={(e, value) => { console.log('change'); this.updateIntervalValue(e, value); }}
          track={false}
        // onDragStop={ (e) => this.props.update(e, control.id, this.val)}
        />
        Start:
        {`${parseInt(this.state.intervalStart / 60)}:${parseInt(this.state.intervalStart % 60)}`}
        <br />
        End:
        {this.state.intervalEnd}
      </div>
    );
  }
}

export default IntervalSlider;
