import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Autosuggest from 'react-autosuggest';

import './PillLookup.css';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ax from '../../../api/index';

import Header from '../../Header/Header';

import * as pillActionCreators from '../../../store/actions/pillAction';


const Wrapper = styled.section`
  margin-top: 15em;
`;

let pills = [
];

class PillLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // value is the pill name
      value: '',
      suggestions: [],
      // company is the pill's company name
      company: '',
    };

    ax.get('/api/pill/allpills/').then((res) => {
      pills = res.data;
    });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;
    const candidates = pills.filter((lang) => lang[0].toLowerCase().slice(0, inputLength) === inputValue);
    const finalList = (candidates.length > 20 ? candidates.slice(0, 20) : candidates);
    return inputLength === 0 ? [] : finalList;
  }

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  getSuggestionValue = (suggestion) => { this.setState({ company: suggestion[1] }); return suggestion[0]; };

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue,
    });
  };

  onConfirm = () => {
    this.props.addUserPillByNameAndCompany(this.state.value, this.state.company);
  }

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value),
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: [],
    });
  };

  // Use your imagination to render suggestions.
  renderSuggestion = (suggestion) => (
    <span>
      <div className="pill_name">
        {suggestion[0]}
      </div>
      <div className="pill_company">
        {suggestion[1]}
      </div>
    </span>
  )

  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: 'Type the pill\'s name',
      value,
      onChange: this.onChange,
    };
    return (
      <div className="PillLookup">
        <Header />
        <Wrapper>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                style={{ width: 600 }}
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="primary" onClick={() => { this.onConfirm(); }} disabled={this.state.company === ''}>
                Confirm
              </Button>
            </Grid>
          </Grid>
        </Wrapper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addUserPillByNameAndCompany: (name, pillCompany) => { dispatch(pillActionCreators.addUserPillByNameAndCompany(name, pillCompany)); },
});

export default connect(null, mapDispatchToProps)(PillLookup);
