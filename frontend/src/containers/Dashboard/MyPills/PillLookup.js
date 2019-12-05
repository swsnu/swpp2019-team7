import React, { Component } from 'react';
import styled from 'styled-components';

import Autosuggest from 'react-autosuggest';

import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import ax from '../../../api/index';

import Header from '../../Header/Header';


import * as pillActionCreators from '../../../store/actions/pillAction';


const Wrapper = styled.section`
  margin-top: 15em;
  margin-right: 33em;
  margin-left: 33em;
  // background: #f7daad;
`;

let pills = [
];

class PillLookup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      suggestions: [],
      selectedID: -1,
    };

    ax.get('/api/pill/allpills/').then((res) => {
      pills = res.data;
    }).catch((error) => { console.log(error); });
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : pills.filter((lang) => lang[0].toLowerCase().slice(0, inputLength) === inputValue);
  }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue = (suggestion) => {
      console.log(suggestion[1]);
      this.setState({
        selectedID: suggestion[1],
      });
      return suggestion[0];
    };

    onChange = (event, { newValue }) => {
      this.setState({
        value: newValue,
      });
    };

    onConfirm = () => {
      console.log(this.state.selectedID);
      this.props.addUserPill(this.state.selectedID);
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
    renderSuggestion(suggestion) {
      return (
        <span>{suggestion[0]}</span>
      );
    }

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
            <Autosuggest
              suggestions={suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={this.renderSuggestion}
              inputProps={inputProps}
            />
            <Button variant="contained" color="primary" onClick={() => { this.onConfirm(); }} disabled={this.state.selectedID === -1}>
                        Confirm
            </Button>
          </Wrapper>
        </div>
      );
    }
}

const mapDispatchToProps = (dispatch) => ({
  addUserPill: (id) => { dispatch(pillActionCreators.addUserPill(id)); },
});

export default connect(null, mapDispatchToProps)(PillLookup);
