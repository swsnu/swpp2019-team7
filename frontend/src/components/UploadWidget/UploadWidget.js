import React, {Component} from 'react'
import {connect} from 'react-redux';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import FilePondImagePreview from 'filepond-plugin-image-preview';
import FilePondImageCrop from 'filepond-plugin-image-crop';

import {makeStyles, withStyles} from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import './UploadWidget.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css'
import styled from "styled-components";

// import styled from 'styled-components'
// import { ReactComponent as UploadCloud} from '../../images/cloud-computing.svg'
// const StyledUloadCloud = styled(UploadCloud)`
// height:16rem;
// width:10rem;
// // display:block;
// margin:auto;
// `;

const UploadWrapper = styled.section`
  padding: 4em;
  background-color: 'white';
`;

registerPlugin(
  FilePondPluginValidateSize,
  FilePondPluginValidateType,
  FilePondImageCrop,
  FilePondImagePreview);
//
// const styles = theme => ({
//   card: {
//     maxWidth: 345,
//   },
//   media: {
//     height: 0,
//     paddingTop: '56.25%', // 16:9
//   },
//   expand: {
//     transform: 'rotate(0deg)',
//     marginLeft: 'auto',
//     transition: theme.transitions.create('transform', {
//       duration: theme.transitions.duration.shortest,
//     }),
//   },
//   expandOpen: {
//     transform: 'rotate(180deg)',
//   },
//   avatar: {
//     backgroundColor: red[500],
//   },
//   button: {
//     borderColor: 'white !important'
//   }
// });


class UploadWidget extends Component {
  render() {
    const {classes} = this.props;

    return (
        <div>
      {/*<div className="ui middle aligned center aligned grid container">*/}
        {/*<div className="ui fluid column card">*/}
        {/*  <div className="content">*/}
        {/*  <Grid*/}
        {/*      container*/}
        {/*      direction="column"*/}
        {/*      justify="center"*/}
        {/*      // alignItems="center"*/}
        {/*  >*/}
              <Grid container spacing={7}>
                <Grid item xs={1}>
                </Grid>

                <Grid item xs={4} justify="center">
                  <Grid item>
                    <Typography variant="h2" gutterBottom className="title" style={{color: 'white', textAlign: 'right'}}>
                        Get your pills
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2" gutterBottom className="title" style={{color: 'white', textAlign: 'right'}}>
                      managed
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography variant="h2" gutterBottom className="title" style={{color: 'white', textAlign: 'right'}}>
                      right away
                    </Typography>
                  </Grid>
                </Grid>

                <Grid item xs={5} justify="center">
                  {/*<Grid container direction="column" alignItems="center">*/}
                    {/*<Grid item>*/}
                    {/*<UploadWrapper>*/}
                  <Container fixed align="center" style={{ backgroundColor: '#cfe8fc', padding: 30, borderRadius:20}}>
                    <FilePond
                      ref={ref => this.pond = ref}
                      instantUpload={false}
                      server={
                        {
                          url: 'http://localhost:8000/api',
                          process: {
                            url: '/vision/',
                            method: 'POST',
                            withCredentials: false,
                            headers: {
                            },
                            timeout: 9000,
                            onload: response => {
                              response = JSON.parse(response);
                              console.log(JSON.stringify(response));
                              this.props.updateProductInfo({file: response.file, ...response.product});
                              this.props.toggleResultModal(true);
                            },
                          },
                          delete: {
                            url: '/vision/',
                            method: 'POST',
                          }
                        }
                      }
                      onupdatefiles={fileItem => {
                        this.setState({
                          file: fileItem.file
                        });
                      }}
                      maxFileSize="50MB"
                      labelMaxFileSize="Maximum file size is 50MB"
                      acceptedFileTypes={['image/*']}
                      labelFileTypeNotAllowed="Can only upload image files"
                      imagePreviewMinHeight="100"
                      allow-multiple="false"
                      labelIdle='Drag & Drop your pill images'
                    />
                    {/*</Grid>*/}
                    {/*<Grid item>*/}
                    <Button
                        className="confirm-button"
                          variant="outlined" color="secondary"
                          onClick={() => {this.pond.processFiles()}}
                    >
                        Confirm
                    </Button>
                    {/*</Grid>*/}
                    {/*</UploadWrapper>*/}
                  </Container>
                  </Grid>
                  <Grid item xs={2}>
                  </Grid>
                  {/*</Grid>*/}

        {/*</div>*/}
            </Grid>
          {/*</Grid>*/}

        {/*</div>*/}
      </div>
    );
  }
}
// withStyles(styles)
export default connect()(UploadWidget);
