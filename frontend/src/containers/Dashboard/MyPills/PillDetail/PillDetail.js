import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as dashboardActionCreators from '../../../../store/actions/dashboardAction';
import * as pillActions from '../../../../store/actions/pillAction';

const mapStateToProps = (state) => ({
  pill: state.pill,
  selected_pill: state.pill.selected_pill,
});
const mapDispatchToProps = (dispatch) => ({
  onGetPill: (id) => dispatch(pillActions.getPill(id)),
  onChangeDashboard: (number) => dispatch(dashboardActionCreators.changeDashboard(number)),
});

class PillDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // this.props.onGetPill(1);//this.props.location.state.id);
  }

    goBackHandler = () => {
      this.props.onChangeDashboard(0);
    }

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
        <div className="PillDetail">
          <h1>pill_id</h1>
          <h3 id="pill-id">{pillId}</h3>
          <h1>take-method</h1>
          <h3 id="take-method">{takeMethod}</h3>
          <h1>product-name</h1>
          <h3 id="product-name">{productName}</h3>
          <h1>expiration-date</h1>
          <h3 id="expiration-date">{expirationDate}</h3>
          <h1>functions</h1>
          <h3 id="functions">{functions}</h3>
          <h1>store-method</h1>
          <h3 id="store-method">{storeMethod}</h3>
          <h1>company-name</h1>
          <h3 id="company-name">{companyName}</h3>
          <h1>standards</h1>
          <h3 id="standards">{standards}</h3>
          <h1>precautions</h1>
          <h3 id="precautions">{precautions}</h3>
          <h1>take-method-preprocessed</h1>
          <h3 id="take-method-preprocessed">{takeMethodPreprocessed}</h3>
          <button id="back-detail-article-button" type="button" onClick={() => this.goBackHandler()}>Back</button>
        </div>
      );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PillDetail));
