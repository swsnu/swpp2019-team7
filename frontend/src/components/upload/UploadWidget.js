import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginValidateSize from 'filepond-plugin-file-validate-size';
import FilePondPluginValidateType from 'filepond-plugin-file-validate-type';
import FilePondImagePreview from 'filepond-plugin-image-preview';
import FilePondImageCrop from 'filepond-plugin-image-crop';

import './UploadWidget.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css';
import 'filepond/dist/filepond.min.css';


registerPlugin(
  FilePondPluginValidateSize,
  FilePondPluginValidateType,
  FilePondImageCrop,
  FilePondImagePreview,
);

class UploadWidget extends Component {
  render() {
    return (
      <div className="ui middle aligned center aligned grid container">
        <div className="ui fluid column card">
          <div className="content">
            <h3 className="ui header">
            Upload your image!
            </h3>
            <FilePond
              ref={(ref) => { this.pond = ref; }}
              instantUpload={false}
              server={
              // TODO change below to real server location
              {
                url: 'NOT-VALID-URL',
                process: {
                  url: '/API-POST-NAME',
                  method: 'POST',
                  withCredentials: false,
                  headers: {
                    // TODO add needed properties (such as user srl) as header
                  },
                  timeout: 7000,
                },
                revert: {
                  url: '/API-DELETE-NAME',
                  method: 'DELETE',
                  headers: {

                  },
                },
              }
            }
              // onaddfilestart={(fileItem) => {
              //   // console.log(fileItem.filename);
              //   // console.log(fileItem.fileSize);
              // }}
              // onupdatefiles={(fileItem) => {
              //   this.setState({
              //     // file: fileItem.file,
              //   });
              //   // console.log(`ON UPDATE FILES: ${this.state.file}`);
              // }}
              maxFileSize="50MB"
              labelMaxFileSize="Maximum file size is 50MB"
              acceptedFileTypes={['image/*']}
              labelFileTypeNotAllowed="Can only upload image files"
              imagePreviewMinHeight="100"
              allow-multiple="false"
            />
            <button
              className="ui button"
              type="button"
              id="button-id"
              onClick={() => {
                // this.pond.processFiles()
              }}
            >
            Confirm
            </button>
          </div>

        </div>
      </div>
    );
  }
}

export default connect()(UploadWidget);
