import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';


import './PillLookup.css';

import Button from '@material-ui/core/Button';
import { Grid, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

import Header from '../../Header/Header';

import * as pillActionCreators from '../../../store/actions/pillAction';

const Wrapper = styled.section`
  margin-top: 15em;
`;


class CustomPill extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // value is the pill name
      take_method: '',
      product_name: '',
      expiration_date: '',
      functions: '',
      store_method: '',
      company_name: '',
      standards: '',
      precautions: '',
    };
  }

  onConfirm = () => {
    console.log('props.image_id is');
    console.log(this.props.image_id);
    this.props.addCustomPill(this.state, this.props.image_id);
  }


  render() {
    const itemList = [
      { id: '1', itemName: 'Pill Name *', state: (event) => this.setState({ product_name: event.target.value }) },
      { id: '2', itemName: 'Take Method', state: (event) => this.setState({ take_method: event.target.value }) },
      { id: '3', itemName: 'Expiration Date', state: (event) => this.setState({ expiration_date: event.target.value }) },
      { id: '4', itemName: 'Function of the Pill', state: (event) => this.setState({ functions: event.target.value }) },
      { id: '5', itemName: 'How to Store', state: (event) => this.setState({ store_method: event.target.value }) },
      { id: '6', itemName: 'Company', state: (event) => this.setState({ company_name: event.target.value }) },
      { id: '7', itemName: 'Standards', state: (event) => this.setState({ standards: event.target.value }) },
      { id: '8', itemName: 'Precautions', state: (event) => this.setState({ precautions: event.target.value }) },
    ];
    const textboxList = (
      itemList.map((item) => (
        <div key={item.id}>
          <Grid>
            {item.itemName}
            <TextField
              id={item.id}
              onChange={item.state}
            />
          </Grid>
        </div>
      ))
    );
    if (this.props.render_custompill) {
      return (
        <div className="CustomPill">
          <Header />
          <Wrapper>

            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h3" align="left"> Tell us about your pill! </Typography>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography variant="h5" align="left"> Pill name is required </Typography>
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                {textboxList}
              </Grid>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Button variant="contained" id="confirm_button" color="primary" onClick={() => { this.onConfirm(); }} disabled={this.state.product_name === ''}>
                  Confirm
                </Button>
              </Grid>
            </Grid>
          </Wrapper>
        </div>
      );
    }

    this.props.history.push('/dashboard/0');
    return null;
  }
}
const mapStateToProps = (state) => ({
  image_id: state.pill.image_id,
  render_custompill: state.pill.render_custompill,
});
const mapDispatchToProps = (dispatch) => ({
  addCustomPill: (pillInfo, imageId) => { console.log(pillInfo); dispatch(pillActionCreators.addCustomPill(pillInfo, imageId)); },
  setRenderCustomPill: (key) => dispatch(pillActionCreators.setRenderCustomPill(key)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CustomPill);
