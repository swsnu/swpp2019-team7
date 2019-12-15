import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import SimpleTable from './IntervalSlider';
import IntervalTimeSelect from './IntervalTimeSelect';

const styles = (theme) => ({
  root: {
    width: '100%',
  },
  margin: {
    height: theme.spacing(8),
  },
});

class IntervalSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = { intervalStart: '', intervalEnd: '' };
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.margin} />
        <SimpleTable />
        <IntervalTimeSelect
          id="interval-time-select"
          startHour="10"
          startMin="0"
          endHour="0"
          endMin="0"
        />
      </div>
    );
  }
}

export default connect(null, {
})(withStyles(styles)(IntervalSetting));
