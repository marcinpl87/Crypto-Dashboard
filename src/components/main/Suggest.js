import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';

const getSuggestionValue = suggestion => suggestion.name;
const renderSuggestion = suggestion => (
    <div>
        {suggestion.name} - {suggestion.year}
    </div>
);

const Suggest = (props) => {
    const [
        value,
        setValue,
    ] = useState('');
    const [
        suggestions,
        setSuggestions,
    ] = useState([]);
    const inputProps = {
        id: props.id,
        className: props.className,
        placeholder: props.placeholder,
        value: value,
        onChange: (e, {newValue}) => {
            setValue(newValue);
        },
    };
    const getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
        return inputLength === 0
            ? []
            : props.data.filter(
                lang => lang
                    .name
                    .toLowerCase()
                    .slice(
                        0,
                        inputLength
                    ) === inputValue
            );
    };
    const onSuggestionsFetchRequested = ({value}) => {
        props.onFetchStart();
        setTimeout(() => {
            setSuggestions(getSuggestions(value));
            props.onFetchStop();
        }, 1000);
    };
    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };
    return (
        <React.Fragment>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
            />
        </React.Fragment>
    );
}

export default Suggest;
