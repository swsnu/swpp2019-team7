import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Modal, Header, Image, Button, Icon,
} from 'semantic-ui-react';

import { withRouter } from 'react-router-dom';
import UploadWidget from '../../../components/UploadWidget/UploadWidget';
import './DemoWidget.css';
import { addUserPill, setImageId, setRenderCustomPill } from '../../../store/actions/pillAction';

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
    this.setState({ newPillId: id });
  }

  getImageId(id) {
    this.props.setImageId(id);
  }

  addNewPill() {
    this.props.addUserPill(this.state.newPillId);
  }

  toggleAcceptPill() {
    this.props.history.push('/login');
  }

  toggleResultModal(open) {
    this.setState({ resultModalOpen: open });
  }

  toggleCustomPill() {
    console.log('set render');
    this.props.setRenderCustomPill(true);
    console.log('finish set render');
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
    return (
      <div className="DemoWidget">
        <UploadWidget
          updateProductInfo={this.updateProductInfo.bind(this)}
          toggleResultModal={this.toggleResultModal.bind(this)}
          getNewPillId={this.getNewPillId.bind(this)}
          backgroundColor={this.props.backgroundColor}
          getImageId={this.getImageId.bind(this)}
        />
        <Modal
          id="Modal"
          open={this.state.resultModalOpen}
        >
          <Modal.Header>
            { this.state.productInfo.productName ? 'We found your product!' : 'Failed to Match Product'}
          </Modal.Header>
          <Modal.Content image>
            <Image wrapped size="medium" src={`http://localhost:8000${this.state.productInfo.imageUrl}`} />
            {this.state.productInfo.productName
              ? (
                <Modal.Description>
                  <Header>{this.state.productInfo.productName}</Header>
                  <p>
                    제조사:
                    {this.state.productInfo.companyName}
                  </p>
                  <p>
                    복용방법:
                    {this.state.productInfo.takeMethod}
                  </p>
                  <p>
                    유통기한:
                    {this.state.productInfo.expirationDate}
                  </p>
                </Modal.Description>
              )
              : (
                <Modal.Description>
                  We couldn&apos;t find your product...
                </Modal.Description>
              )}
          </Modal.Content>
          {this.state.productInfo.productName
            ? (
              <Modal.Actions id="actionone">
                {this.props.loggedIn
                  ? (
                    <Button id="loginGreen" color="green" onClick={() => { this.addNewPill(); }}>
                      <Icon name="checkmark" />
                      Save
                    </Button>
                  )
                  : (
                    <Button id="noLoginGreen" color="green" onClick={() => { this.toggleAcceptPill(); }}>
                      <Icon name="checkmark" />
                      Log in to Save
                    </Button>
                  )}
                <Button id="productRed" color="red" onClick={() => { this.toggleResultModal(false); }} inverted>
                  Retry
                </Button>
              </Modal.Actions>
            )
            : (
              <Modal.Actions id="actiontwo">
                <Button id="noProductRed" onClick={() => { this.toggleResultModal(false); }}>
                  Go Back
                </Button>
                <Button id="newCustom" onClick={() => { this.toggleCustomPill(false); }}>
                  Custom Pill
                </Button>
              </Modal.Actions>
            )}

        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.user.logged_in,
});
export default connect(mapStateToProps, {
  addUserPill, setImageId, setRenderCustomPill,
})(withRouter(DemoWidget));
