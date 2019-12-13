import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import IntervalSlider from './IntervalSlider';

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
        <IntervalSlider />
      </div>
    );
  }
}

export default (withStyles(styles)(IntervalSetting));
