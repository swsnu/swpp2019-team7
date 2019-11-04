import React, {Component} from 'react'
import {connect} from 'react-redux';
import {FilePond, registerPlugin} from "react-filepond";
import FilePondPluginValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import FilePondImagePreview from 'filepond-plugin-image-preview';
import FilePondImageCrop from 'filepond-plugin-image-crop';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import './UploadWidget.css'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css'

registerPlugin(
  FilePondPluginValidateSize,
  FilePondPluginValidateType,
  FilePondImageCrop,
  FilePondImagePreview);

class UploadWidget extends Component {
  render() {
    const {classes} = this.props;

    return (
      <div>
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
              />
              <Button
                  className="confirm-button"
                    variant="outlined" color="secondary"
                    onClick={() => {this.pond.processFiles()}}>
                  Confirm
              </Button>
            </Container>
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>
    </div>
    );
  }
}

export default connect()(UploadWidget);
