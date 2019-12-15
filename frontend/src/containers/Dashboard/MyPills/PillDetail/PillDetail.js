import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  createMuiTheme, ThemeProvider, withStyles,
} from '@material-ui/core/styles';
import { Typography, Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import LocalDrinkOutlinedIcon from '@material-ui/icons/LocalDrinkOutlined';
import EventAvailableOutlinedIcon from '@material-ui/icons/EventAvailableOutlined';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import StorageOutlinedIcon from '@material-ui/icons/StorageOutlined';
import PictureInPictureAltOutlinedIcon from '@material-ui/icons/PictureInPictureAltOutlined';
import ErrorOutlineOutlinedIcon from '@material-ui/icons/ErrorOutlineOutlined';
import RestoreOutlinedIcon from '@material-ui/icons/RestoreOutlined';

import './PillDetail.css';
import * as pillActionCreators from '../../../../store/actions/pillAction';
import * as dashboardActionCreators from '../../../../store/actions/dashboardAction';

const koreanTheme = createMuiTheme({
  typography: {
    fontFamily: "'Nanum Gothic', sans-serif",
    h2: {
      fontWeight: 500,
      fontSize: 55,
    },
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontSize: 22,
      fontWeight: 700,
    },
    h6: {
      fontSize: 15,
    },
    caption: {
      fontSize: 13,
      fontWeight: 700,
    },
    body1: {
      color: 'rgba(0, 0, 0, 100)',
    },
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
  descriptionBox: {
    marginLeft: 5,
    marginRight: 5,
  },
  descriptionIcon: {
    fontSize: 60,
  },
  descriptionTitle: {
    marginTop: 8,
    marginBottom: 6,
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

  onChange = (e) => {
    if (e.target.files.length !== 0) {
      if (e.target.files[0].size > 50000000) {
        alert(`'${e.target.files[0].name}' is too large, please pick a smaller file`);
        return;
      }
      // Test if image is valid
      const File = e.target.files[0];
      console.log(File);

      const url = window.URL || window.webkitURL;
      const image = new Image();
      image.onerror = () => {
        alert('Invalid image. Please upload a valid image');
      };
      image.onload = () => {
        console.log('Valid image');
        this.setState({ selectedImage: File }, () => {
          const formData = new FormData();
          formData.append(
            'pillImage',
            File,
          );
          this.props.onUploadPhoto(formData, this.props.selected_pill.id);
        });
      };
      image.src = url.createObjectURL(File);
    }
  }

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
    return (
      <div className="PillDetail" style={{ marginLeft: 20, marginRight: 20, marginTop: 50 }}>
        <ThemeProvider theme={koreanTheme}>
          <Grid container direction="column" spacing={1}>
            <Grid item align="center" style={{ marginBottom: 25 }}>
              {file !== '' ? <Avatar backgroundColor="rgba(0,0,0,0)" src={file} className={classes.avatar} variant="square" /> : askUpload}
            </Grid>
            <Grid
              item
              align="center"
              style={{ marginBottom: 55 }}
            >
              <Typography variant="h3" style={{ marginTop: 10, marginBottom: 10 }}>
                {productName}
              </Typography>
              <Typography variant="caption" id="company-name" style={{ marginBottom: 10 }}>
                {companyName}
              </Typography>
            </Grid>
            <Grid item container spacing={4}>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <LocalDrinkOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">복용 방법 </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="take-method">{takeMethod}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <EventAvailableOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">유통 기한</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="expiration-date">{expirationDate}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <ThumbUpAltOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">기능</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="functions">{functions}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <StorageOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">보관 방법: </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="store-method">{storeMethod !== null ? storeMethod : 'Not in the database'}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <PictureInPictureAltOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">표준 형태</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="standards">{standards}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <ErrorOutlineOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">주의</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="precautions">{precautions}</Typography>
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} container direction="column" justify="flex-start" alignItems="center">
                <Grid item>
                  <RestoreOutlinedIcon className={classes.descriptionIcon} />
                </Grid>
                <Grid item className={classes.descriptionTitle}>
                  <Typography variant="h4">하루 권장 복용 횟수</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="h6" id="take-method-preprocessed">{takeMethodPreprocessed}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(withStyles(styles)(PillDetail)));
