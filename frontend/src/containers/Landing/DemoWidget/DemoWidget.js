import React, { Component } from 'react';
import { connect } from 'react-redux';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Typography, withStyles } from '@material-ui/core';

import { withRouter } from 'react-router-dom';
import UploadWidget from '../../../components/UploadWidget/UploadWidget';
import './DemoWidget.css';
import {
  addUserPill, setImageId, setRenderCustomPill, setNewPill,
} from '../../../store/actions/pillAction';

const styles = () => ({
  card: {
    // maxWidth: 335,
    // maxWidth: 345,
  },
  media: {
    maxWidth: 335,
    // height: 0,
    // paddingTop: '56.25%', // 16:9
  },
  cardButtons: {
    justifyContent: 'center',
  },
});

class DemoWidget extends Component {
  constructor(props) {
    super(props);

    this.state = {
      productInfo: {
        imageUrl: '',
        takeMethod: '',
        productName: '',
        expirationDate: '',
        functions: '',
        storeMethod: '',
        companyName: '',
        precautions: '',
      },
      resultModalOpen: false,
      newPillId: -1,
    };
  }

  getNewPillId(id) {
    this.props.setNewPill(id);
  }

  getImageId(id) {
    this.props.setImageId(id);
  }

  addNewPill() {
    this.props.addUserPill(this.props.newPillId);
  }

  toggleAcceptPill() {
    this.props.history.push('/login');
  }

  toggleResultModal(open) {
    this.setState({ resultModalOpen: open });
  }

  toggleCustomPill() {
    this.props.setRenderCustomPill(true);
    this.props.history.push('/custompilladd');
  }

  updateProductInfo(data) {
    this.setState({
      productInfo:
        { imageUrl: data.file },
    });

    if (data.product_name) {
      this.setState((previousState) => ({
        productInfo: {
          takeMethod: data.take_method,
          productName: data.product_name,
          expirationDate: data.expiration_date,
          functions: data.functions,
          storeMethod: data.store_method,
          companyName: data.company_name,
          precautions: data.precautions,
          ...previousState.productInfo,
        },
      }));
    }
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="DemoWidget">
        {this.state.resultModalOpen
          ? (
            // shows parsed results
            <Box id="resultmodal" align="center">
              <Card className={classes.card}>
                {/* <Box maxWidth="335"> */}
                <CardHeader
                  title={this.state.productInfo.productName ? 'We found your product!' : 'Failed to Match Product'}
                  style={{ marginTop: 24, marginBottom: 24, fontSize: 28 }}
                />
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={`http://localhost:8000${this.state.productInfo.imageUrl}`}
                  title="Pill"
                />
                {this.state.productInfo.productName
                  ? (
                    <CardContent style={{ maxWidth: 335 }}>
                      {/* <Box align="left" maxLength="335"> */}
                      <Grid container>
                        <Grid item xs={12}>
                          <Typography align="left" gutterBottom variant="h4" component="h2">
                            {this.state.productInfo.productName}
                          </Typography>
                        </Grid>
                        {' '}
                        <br />
                        <Grid item xs={12}>
                          <Typography align="left" variant="h6">
                          제조사:
                            {' '}
                            {' '}
                            {this.state.productInfo.companyName}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography align="left" variant="h6" component="p">
                          복용방법:
                            {' '}
                            {' '}
                            {this.state.productInfo.takeMethod}
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography align="left" variant="h6" component="p">
                          유통기한:
                            {' '}
                            {' '}
                            {this.state.productInfo.expirationDate}
                          </Typography>
                        </Grid>
                      </Grid>
                      {/* </Box> */}
                    </CardContent>
                  )
                  : (
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        We couldn&apos;t find your product...
                      </Typography>
                    </CardContent>
                  )}
                {/* card actions */}
                {this.state.productInfo.productName
                  ? (
                    <CardActions className={classes.cardButtons}>
                      {this.props.loggedIn
                        ? (
                          <Button id="add-new-pill" variant="contained" color="primary" style={{ margin: 16 }} onClick={() => { this.addNewPill(); }}>
                            {/* <Icon name="checkmark" /> */}
                            Save
                          </Button>
                        )
                        : (
                          <Button id="login-to-save" variant="contained" color="primary" onClick={() => { this.toggleAcceptPill(); }}>
                            {/* <Icon name="checkmark" /> */}
                            Log in to Save
                          </Button>
                        )}
                      <Button id="retry" variant="contained" color="primary" style={{ margin: 16 }} onClick={() => { this.toggleResultModal(false); }}>
                        Retry
                      </Button>
                    </CardActions>
                  )
                  : (
                    <CardActions className={classes.cardButtons}>
                      <Button id="go-back" variant="contained" color="primary" onClick={() => { this.toggleResultModal(false); }}>
                        Go Back
                      </Button>
                      <Button id="newCustom" onClick={() => { this.toggleCustomPill(false); }}>
                  Custom Pill
                      </Button>
                    </CardActions>
                  )}
                {/* </Box> */}
              </Card>
            </Box>
          )
          : (
            // shows uploading widget
            <UploadWidget
              updateProductInfo={this.updateProductInfo.bind(this)}
              toggleResultModal={this.toggleResultModal.bind(this)}
              getNewPillId={this.getNewPillId.bind(this)}
              backgroundColor={this.props.backgroundColor}
              getImageId={this.getImageId.bind(this)}
            />
          )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.logged_in,
  newPillId: state.pill.new_pill_id,
});
export default connect(mapStateToProps, {
  addUserPill, setImageId, setRenderCustomPill, setNewPill,
})(withRouter(withStyles(styles)(DemoWidget)));
