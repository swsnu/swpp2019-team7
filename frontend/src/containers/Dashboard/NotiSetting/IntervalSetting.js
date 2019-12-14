import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import IntervalSlider from './IntervalSlider';
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

  onClickAddInterval=() => {
    // this.props.postInterval();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.margin} />
        <IntervalSlider />
        {/*<Fab color="primary" aria-label="add">*/}
        {/*  <AddIcon onClick={() => this.onClickAddInterval()} />*/}
        {/*</Fab>*/}
        <IntervalTimeSelect />
      </div>
    );
  }
}

export default connect(null, {
  // postInterval,
})(withStyles(styles)(IntervalSetting));
