import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import * as pillActions from '../../../../store/actions/pillAction';


const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

class PillDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };
  }

  componentDidMount() {
    this.props.onGetPill(this.props.id);
  }

  goBackHandler = () => {
    this.props.history.push('/dashboard');
  }

  handleClickOpen = () => { console.log('open'); this.setState({ open: true }); console.log(this.state.open); };

  handleClose = () => this.setState({ open: false });

  render() {
    let pillId = '';
    let takeMethod = '';
    let productName = '';
    let expirationDate = '';
    let functions = '';
    let storeMethod = '';
    let companyName = '';
    let standards = '';
    let precautions = '';
    let takeMethodPreprocessed = '';

    if (this.props.selected_pill) {
      pillId = this.props.selected_pill.id;
      takeMethod = this.props.selected_pill.take_method;
      productName = this.props.selected_pill.product_name;
      expirationDate = this.props.selected_pill.expiration_date;
      functions = this.props.selected_pill.functions;
      storeMethod = this.props.selected_pill.store_method;
      companyName = this.props.selected_pill.company_name;
      standards = this.props.selected_pill.standards;
      precautions = this.props.selected_pill.precautions;
      takeMethodPreprocessed = this.props.selected_pill.take_method_preprocessed;
    }

    return (
      <div>
        <Button variant="outlined" color="secondary" onClick={() => this.handleClickOpen()}>
          Open dialog
        </Button>
        <Dialog onClose={() => this.handleClose()} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle id="customized-dialog-title" onClose={() => this.handleClose()}>
            Modal title
          </DialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>pillId</Typography>
            <Typography gutterBottom id="pill-id">{pillId}</Typography>
            <Typography gutterBottom>`take`-method</Typography>
            <Typography gutterBottom id="take-method">{takeMethod}</Typography>
            <Typography gutterBottom>product-name</Typography>
            <Typography gutterBottom id="product-name">{productName}</Typography>
            <Typography gutterBottom>expiration-date</Typography>
            <Typography gutterBottom id="expiration-date">{expirationDate}</Typography>
            <Typography gutterBottom>functions</Typography>
            <Typography gutterBottom id="functions">{functions}</Typography>
            <Typography gutterBottom>store-method</Typography>
            <Typography gutterBottom id="store-method">{storeMethod}</Typography>
            <Typography gutterBottom>company-name</Typography>
            <Typography gutterBottom id="company-name">{companyName}</Typography>
            <Typography gutterBottom>standards</Typography>
            <Typography gutterBottom id="standards">{standards}</Typography>
            <Typography gutterBottom>precautions</Typography>
            <Typography gutterBottom id="precautions">{precautions}</Typography>
            <Typography gutterBottom>take-method-preprocessed</Typography>
            <Typography gutterBottom id="take-method-preprocessed">{takeMethodPreprocessed}</Typography>
          </DialogContent>
          <DialogActions>
            <Button id="back-detail-article-button" autoFocus onClick={() => this.handleClose()} color="primary">
              Go Back
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  pill: state.pill,
  selected_pill: state.pill.selected_pill,
});
const mapDispatchToProps = (dispatch) => ({
  onGetPill: (id) => dispatch(pillActions.getPill(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PillDetail));
