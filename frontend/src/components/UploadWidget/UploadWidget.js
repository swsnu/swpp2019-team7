/* istanbul ignore file */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import FilePondImagePreview from 'filepond-plugin-image-preview';
import FilePondImageCrop from 'filepond-plugin-image-crop';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImageTransform from 'filepond-plugin-image-transform';

import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import './UploadWidget.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';
import { addUserPill } from '../../store/actions/pillAction';

registerPlugin(
  FilePondPluginValidateSize,
  FilePondPluginValidateType,
  FilePondPluginImageResize,
  FilePondPluginImageTransform,
  FilePondImageCrop,
  FilePondImagePreview,
);


class UploadWidget extends Component {
  render() {
    console.log('call render');
    return (
      <div className="UploadWidget">
        <Box align="center" style={{ backgroundColor: this.props.backgroundColor, padding: '10%', borderRadius: '6%' }}>
          <FilePond
            ref={(ref) => { this.pond = ref; }}
            instantUpload={false}
            server={
              {
		            url: 'https://www.pillbox.me/api',
                process: {
                  url: '/vision/',
                  method: 'POST',
                  withCredentials: true,
                  headers: {
                  },
                  timeout: 9000,
                  onload: (response) => {
                    const parsedResponse = JSON.parse(response);
                    console.log(JSON.stringify(parsedResponse.product));
                    if (parsedResponse.product != null) this.props.getNewPillId(parsedResponse.product.id);
                    this.props.updateProductInfo({ file: parsedResponse.file, ...parsedResponse.product });
                    this.props.toggleResultModal(true);
                  },
                },
                delete: {
                  url: '/vision/',
                  method: 'POST',
                },
              }
            }
            maxFileSize="50MB"
            labelMaxFileSize="Maximum file size is 50MB"
            acceptedFileTypes={['image/png', 'image/jpeg', 'image/bmp', 'image/gif']}
            labelFileTypeNotAllowed="Can only upload image files"
            imagePreviewMinHeight="100"
            allow-multiple="false"
            imageResizeTargetWidth="800"
            imageResizeTargetHeight="600"
            imageResizeMode="cover"
            allowImageTransform="true"
          />
          <Button
            className="confirm-button"
            variant="outlined"
            color="secondary"
            id="confirm-button"
            onClick={() => {
              this.pond.processFiles();
            }}
          >
              Confirm
          </Button>
        </Box>
      </div>
    );
  }
}

export default connect(null, {
  addUserPill,
})(UploadWidget);
