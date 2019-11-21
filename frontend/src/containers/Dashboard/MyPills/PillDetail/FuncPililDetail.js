/*
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
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

const DialogTitle = withStyles(styles)(props => {
  const { children, classes, onClose, ...other } = props;
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

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(id) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const goBackHandler = () => {
    this.props.history.push('/dashboard');
  };

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
    takeMethod = this.props.selected_pill.takeMethod;
    productName = this.props.selected_pill.productName;
    expirationDate = this.props.selected_pill.expirationDate;
    functions = this.props.selected_pill.functions;
    storeMethod = this.props.selected_pill.storeMethod;
    companyName = this.props.selected_pill.companyName;
    standards = this.props.selected_pill.standards;
    precautions = this.props.selected_pill.precautions;
    takeMethodPreprocessed = this.props.selected_pill.takeMethodPreprocessed;
  }
  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        Open dialog
        </Button>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
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
          <Button id="back-detail-article-button" autoFocus onClick={goBackHandler} color="primary">
            Go Back
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => ({
  pill: state.pill,
  selected_pill: state.pill.selected_pill,
});
const mapDispatchToProps = (dispatch) => ({
  onGetPill: (id) => dispatch(pillActions.getPill(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PillDetail));
*/