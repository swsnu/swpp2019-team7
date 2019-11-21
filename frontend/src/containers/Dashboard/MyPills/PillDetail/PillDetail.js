import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as dashboardActionCreators from '../../../../store/actions/dashboardAction';
import * as pillActions from '../../../../store/actions/pillAction';

const mapStateToProps = state => {
    return {
        pill: state.pill,
        selected_pill: state.pill.selected_pill,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onGetPill: (id) => dispatch(pillActions.getPill(id)),
        onChangeDashboard: (number) => dispatch(dashboardActionCreators.changeDashboard(number)),
    }
}

class PillDetail extends Component {
    state = {
    }
    componentDidMount(){
        //this.props.onGetPill(1);//this.props.location.state.id);
    }
    goBackHandler = () => {
        this.props.onChangeDashboard(0)
    }
    render () {
        let pill_id = '';
        let take_method = '';
        let product_name = '';
        let expiration_date = '';
        let functions = '';
        let store_method = '';
        let company_name = '';
        let standards = '';
        let precautions = '';
        let take_method_preprocessed = '';
        if(this.props.selected_pill){
            pill_id= this.props.selected_pill.id;
            take_method= this.props.selected_pill.take_method;
            product_name= this.props.selected_pill.product_name;
            expiration_date= this.props.selected_pill.expiration_date;
            functions= this.props.selected_pill.functions;
            store_method= this.props.selected_pill.store_method;
            company_name= this.props.selected_pill.company_name;
            standards= this.props.selected_pill.standards;
            precautions= this.props.selected_pill.precautions;
            take_method_preprocessed= this.props.selected_pill.take_method_preprocessed
            
        }
        return (
            <div className="PillDetail">
                <h1>pill_id</h1>
                <h3 id='pill-id'>{pill_id}</h3>
                <h1>take-method</h1>
                <h3 id='take-method'>{take_method}</h3>
                <h1>product-name</h1>
                <h3 id='product-name'>{product_name}</h3>
                <h1>expiration-date</h1>
                <h3 id='expiration-date'>{expiration_date}</h3>
                <h1>functions</h1>
                <h3 id='functions'>{functions}</h3>
                <h1>store-method</h1>
                <h3 id='store-method'>{store_method}</h3>
                <h1>company-name</h1>
                <h3 id='company-name'>{company_name}</h3>
                <h1>standards</h1>
                <h3 id='standards'>{standards}</h3>
                <h1>precautions</h1>
                <h3 id='precautions'>{precautions}</h3>
                <h1>take-method-preprocessed</h1>
                <h3 id='take-method-preprocessed'>{take_method_preprocessed}</h3>
                <button id='back-detail-article-button' onClick={() => this.goBackHandler()}>Back</button>
            </div>
        )
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PillDetail));