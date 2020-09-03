/* eslint-disable */
import React, {useState} from 'react';
import styled from 'styled-components';
import { transparentize } from 'polished';

import api from '#api';
import { fonts } from '#constants/styleConstants';
import Autosuggest from 'react-autosuggest';
import { prop, theme, withProp } from 'styled-tools';
import PlaceholderDiv from '#lib/PlaceHolderDiv';
import Input from '#lib/Input';

const AutosuggestClasses = {
    container: 'react-autosuggest__container',
    containerOpen: 'react-autosuggest__container--open',
    input: 'react-autosuggest__input',
    inputOpen: 'react-autosuggest__input--open',
    inputFocused: 'react-autosuggest__input--focused',
    suggestionsContainer: 'react-autosuggest__suggestions-container',
    suggestionsContainerOpen: 'react-autosuggest__suggestions-container--open',
    suggestionsList: 'react-autosuggest__suggestions-list',
    suggestion: 'react-autosuggest__suggestion',
    suggestionFirst: 'react-autosuggest__suggestion--first',
    suggestionHighlighted: 'react-autosuggest__suggestion--highlighted',
    sectionContainer: 'react-autosuggest__section-container',
    sectionContainerFirst: 'react-autosuggest__section-container--first',
    sectionTitle: 'react-autosuggest__section-title',
};

const SearchBarWrapper = styled.div`
    box-sizing: border-box;
    position: relative;
    margin: 0;
    padding:0;
    ${fonts.Medium};
    text-align: left;
    width: ${prop('searchResultsContainerWidth', '100%')};
`;

const SearchDesktopWrapper = styled.div`
    position: inherit;
    display: contents;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;

    .${AutosuggestClasses.suggestionHighlighted} {
        background-color: ${theme('background-color.bg-grey-0')};
    }

    .${AutosuggestClasses.suggestionsContainerOpen} {
        ${fonts.Medium};
        display: block;
        position: absolute;
        font-size: 16px;
        border-radius: 4px;
        overflow-y: auto;
        z-index: 2;
        width: 100%;
        height: 337px;
        box-shadow: 0 2px 8px 0 ${withProp(theme('background-color.bg-black'), transparentize(0.8))};
        background-color: ${theme("background-color.bg-white")};
    }

    .${AutosuggestClasses.suggestionHighlighted} {
        color: ${({ theme }) => `${theme.secondary.blue}`};
    }

    .${AutosuggestClasses.suggestionsList} {
        ${fonts.Medium};
        letter-spacing: normal;
        list-style-type: none;
        padding: 16px;
        margin: 0;
        font-size: 16px;
        line-height: 1.5;
        cursor: pointer;

        > li {
            border-bottom: ${({ theme }) => `1px solid  ${theme.lightGray}`};
            padding: 10px 0 10px 0;
        }

        > li:last-child {
            border-bottom: none;
        }
    }
`;

const HighlightedSearch = styled.span`
    ${fonts.Bold};
    color: ${theme('text-color.interaction-color')};
`;

const placeholder = Symbol();

const useSuggestions = (initValue) => {
    const [suggestions, setSuggestions] = useState(initValue);

    const onSuggestionsFetchRequested = ({value: address}) => {
        const letterRegex = /[a-zA-Z]/g;
        const numberOfLetterRequiredToMakeRequest = 3;

        const regexResult = address.match(letterRegex);
        if (!regexResult || regexResult.length < numberOfLetterRequiredToMakeRequest) {
            return;
        }

        if (suggestions.length === 0){
            setSuggestions(Array(8).fill({type: placeholder}))
        }

        api.getAddressTypeahead(address).then((result) => {
            const suggestions = result.data.retrieveLocationResponse.typeAheadSearch || [];
            setSuggestions(suggestions);

        });
    };

    return {suggestions, onSuggestionsFetchRequested};
}

const renderSuggestion = (suggestion, value) => {
    if (suggestion.type === placeholder) {
        return <PlaceholderDiv width={suggestion.width} />;
    }

    const index = suggestion.label.toLowerCase().indexOf(value.toLowerCase());

    return (
        <div data-testid="typeAheadSuggestion">
            {suggestion.label.slice(0, index)}
            <HighlightedSearch>
                {suggestion.label.slice(index, index + value.length)}
            </HighlightedSearch>
            {suggestion.label.slice(index + value.length)}
        </div>
    );
};

const AddressTypeahead = props => {
    const {suggestions, onSuggestionsFetchRequested} = useSuggestions([]);


    return (
        <React.Fragment>
            <SearchBarWrapper
                searchResultsContainerWidth={props.searchResultsContainerWidth}
            >
                <SearchDesktopWrapper>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={props.onSuggestionsClearRequested }
                        getSuggestionValue={suggestion =>
                            suggestion.label
                        }
                        renderSuggestion={suggestion =>
                            renderSuggestion(
                                suggestion,
                                props.value,
                                props.cantFindAddressLinkURL,
                            )
                        }
                        renderInputComponent = {props => <Input {...props}/>}
                        inputProps={{
                            placeholder: props.placeholder,
                            value: props.value,
                            onChange: props.onChange,
                            onBlur: props.onBlur,
                            onClear: props.onSearchBoxClear,
                            autoComplete: props.autocomplete,
                            error: props.error.show ? props.error.description : ""
                        }}
                        onSuggestionSelected={props.onSuggestionSelected}
                        focusInputOnSuggestionClick={true}
                        alwaysRenderSuggestions={false}
                        theme={AutosuggestClasses}
                    />
                </SearchDesktopWrapper>
            </SearchBarWrapper>
        </React.Fragment>
    );
};

export default AddressTypeahead;