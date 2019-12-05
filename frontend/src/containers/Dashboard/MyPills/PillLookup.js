import React, { Component } from 'react';

import Autosuggest from 'react-autosuggest';

import ax from '../../../api/index'

var pills = [
];

class PillLookup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: '',
            suggestions: []
        };

        ax.get('/api/pill/allpills/').then((res) => {
            pills = res.data;
        }).catch((error) => { console.log(error) })
    }

    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : pills.filter(lang =>
            lang.toLowerCase().slice(0, inputLength) === inputValue
        );
    }

    // When suggestion is clicked, Autosuggest needs to populate the input
    // based on the clicked suggestion. Teach Autosuggest how to calculate the
    // input value for every given suggestion.
    getSuggestionValue(suggestion) { return suggestion };


    // Use your imagination to render suggestions.
    renderSuggestion(suggestion) {
        return (
            <span>{suggestion}</span>
        )
    };

    onChange = (event, { newValue }) => {
        this.setState({
            value: newValue
        });
    };

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };



    render() {
        const { value, suggestions } = this.state;

        // Autosuggest will pass through all these props to the input.
        const inputProps = {
            placeholder: `Type the pill's name`,
            value,
            onChange: this.onChange
        };
        return (
            <div>
                <Autosuggest
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={this.getSuggestionValue}
                    renderSuggestion={this.renderSuggestion}
                    inputProps={inputProps}
                />
            </div>
        )
    }
}

export default PillLookup;
