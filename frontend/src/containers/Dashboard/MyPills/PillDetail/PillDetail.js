import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createMuiTheme, ThemeProvider, withStyles,
} from '@material-ui/core/styles';
import { Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import '../../../Landing/TestLanding.css';
import * as pillActionCreators from '../../../../store/actions/pillAction';
import * as dashboardActionCreators from '../../../../store/actions/dashboardAction';


// let theme = createMuiTheme();
// theme = responsiveFontSizes(theme);

const theme = createMuiTheme({
  typography: {
    fontFamily: "'DM Sans', sans-serif",
    // h2: {
    //   fontWeight: 500,
    //   fontSize: '4rem',
    //   [breakpoints.down('sm')]: {
    //     fontSize: '3.4rem',
    //   },
    //   [breakpoints.down('xs')]: {
    //     fontSize: '3rem',
    //   },
    // },
    // h3: {
    //   fontWeight: 500,
    //   fontSize: '4rem',
    //   [breakpoints.down('sm')]: {
    //     fontSize: '3rem',
    //   },
    //   [breakpoints.down('xs')]: {
    //     fontSize: '2.8rem',
    //   },
    // },
    // h4: {
    //   [breakpoints.down('xs')]: {
    //     fontSize: '1.45rem',
    //   },
    //   [breakpoints.down('sm')]: {
    //     fontSize: '1.65rem',
    //   },
    // },
  },
});
const mapStateToProps = (state) => ({
  pill: state.pill,
  selected_pill: state.pill.selected_pill,
});
const mapDispatchToProps = (dispatch) => ({
  onChangeDashboard: (number) => dispatch(dashboardActionCreators.changeDashboard(number)),
  onUploadPhoto: (image, id) => dispatch(pillActionCreators.addUserPillImage(image, id)),
});

const styles = () => ({
  avatar: {
    width: 240,
    height: 240,
    border: 0,
    borderRadius: '100%',
    objectFit: 'cover',
  },
});

class PillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedImage: null,
    };
  }

  goBackHandler = () => {
    this.props.onChangeDashboard(0);
  }

  onChange = () => {
    // if (e.target.files.length !== 0) {
    //   if (e.target.files[0].size > 50000000) {
    //     alert(`'${e.target.files[0].name}' is too large, please pick a smaller file`);
    //     return;
    //   }
    //   // Test if image is valid
    //   const File = e.target.files[0];
    //
    //   const url = window.URL || window.webkitURL;
    //   const image = new Image();
    //   image.onerror = () => {
    //     alert('Invalid image. Please upload a valid image');
    //   };
    //   image.onload = () => {
    //     this.setState({ selectedImage: File }, () => {
    //       const formData = new FormData();
    //       formData.append(
    //         'pillImage',
    //         File,
    //       );
    //       this.props.onUploadPhoto(formData, this.props.selected_pill.id);
    //     });
    //   };
    //   image.src = url.createObjectURL(File);
    // }
  }

  /*
  uploadHandler = () => {
    const formData = new FormData();
    formData.append(
      'pillImage',
      this.state.selectedImage,
    );
    this.props.onUploadPhoto(formData, this.props.selected_pill.id);
  }
*/
  breakLine(text) {
    if (text === null) {
      return text;
    }
    const regex = /(\n)/g;
    const uuidv1 = require('uuid/v1');
    return text.split(regex).map((line) => (line.match(regex) ? <br key={uuidv1()} /> : line));
  }

  render() {
    const { classes } = this.props;
    let takeMethod = '';
    let productName = '';
    let expirationDate = '';
    let functions = '';
    let storeMethod = '';
    let companyName = '';
    let standards = '';
    let precautions = '';
    let takeMethodPreprocessed = '';
    let file = '';
    if (this.props.selected_pill) {
      takeMethod = this.breakLine(this.props.selected_pill.take_method);
      productName = this.props.selected_pill.product_name;
      expirationDate = this.props.selected_pill.expiration_date;
      functions = this.breakLine(this.props.selected_pill.functions);
      storeMethod = this.breakLine(this.props.selected_pill.store_method);
      companyName = this.props.selected_pill.company_name;
      standards = this.breakLine(this.props.selected_pill.standards);
      precautions = this.breakLine(this.props.selected_pill.precautions);
      takeMethodPreprocessed = this.props.selected_pill.take_method_preprocessed;
      file = this.props.selected_pill.file;
    }
    const askUpload = (
      <Button
        variant="contained"
        component="label"
        id="askUpload"
      >
        <input
          type="file"
          id="image"
          accept="image/png, image/jpeg, image/pjpeg, image/gif"
          onChange={this.onChange}
          style={{ display: 'none' }}
        />
        Upload An Image!
      </Button>
    );
    /*
     <div>
       <input
         type="file"
         id='image'
         accept="image/png, image/jpeg, image/pjpeg, image/gif"
         onChange={this.onChange}
       />
       <Button onClick={this.uploadHandler}>Upload!</Button>
     </div>
     */
    return (

      <div className="PillDetail">
        <Button variant="contained" style={{ marginLeft: 40, marginTop: 60 }} color="primary" id="back-detail-article-button" type="button" onClick={() => this.goBackHandler()}>Back</Button>
        <Paper style={{
          background: '#F0FAF1', marginRight: 40, marginLeft: 40, marginTop: 80, marginBottom: 60, padding: 40,
        }}
        >
          <br />
          <br />
          <div align="center">
            {file !== '' ? <Avatar backgroundColor="rgba(0,0,0,0)" src={file} className={classes.avatar} variant="square" /> : askUpload}
          </div>
          <br />
          <br />
          <ThemeProvider theme={theme}>
            {/* <Typography variant="h3">Pill ID</Typography> */}
            {/* <br /> */}
            {/* <Typography variant="h6" id="pill-id">{pillId}</Typography> */}
            {/* <br /> */}
            <div style={{ marginLeft: 20, marginRight: 20 }} align="center">
              <Typography variant="h4">
Product :
                {productName}
              </Typography>
              {/* <Typography style={{marginLeft: 10, marginRight: 10 }} variant="h4" id="product-name">{productName}</Typography> */}
              <br />
              <Typography variant="h4">Take Method</Typography>
              <br />
              <Typography style={{ marginLeft: 20, marginRight: 10 }} variant="h6" id="take-method">{takeMethod}</Typography>
              <br />
              <Typography variant="h4">Expiration Date</Typography>
              <br />
              <Typography variant="h6" id="expiration-date">{expirationDate}</Typography>
              <br />
              <Typography variant="h4">Functions</Typography>
              <br />
              <Typography variant="h6" id="functions">{functions}</Typography>
              <br />
              <Typography variant="h4">Store Method</Typography>
              <br />
              <Typography variant="h6" id="store-method">{storeMethod !== null ? storeMethod : 'Not in the database'}</Typography>
              <br />
              <Typography variant="h4">Company Name</Typography>
              <br />
              <Typography variant="h6" id="company-name">{companyName}</Typography>
              <br />
              <Typography variant="h4">Standards</Typography>
              <br />
              <Typography variant="h6" id="standards">{standards}</Typography>
              <br />
              <Typography variant="h4">Precautions</Typography>
              <br />
              <Typography variant="h6" id="precautions">{precautions}</Typography>
              <br />
              <Typography variant="h4">Recommended Times To Take Per Day</Typography>
              <br />
            </div>
            <Typography variant="h6" id="take-method-preprocessed">{takeMethodPreprocessed}</Typography>
          </ThemeProvider>
        </Paper>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(PillDetail)));
