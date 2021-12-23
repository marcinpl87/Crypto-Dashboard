import React, {
    useState,
} from 'react';
import ReactDOM from 'react-dom';
import Autosuggest from 'react-autosuggest';
import Utils from '../../Utils';

let timerId;
const debounceFunction = (func, delay) => {
    clearTimeout(timerId);
    timerId = setTimeout(func, delay);
}

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
    const onSuggestionsFetchRequested = ({value}) => {
        props.onFetchStart();
        debounceFunction(
            () => {
                Utils.ajax(
                    'get',
                    props.endpoint + '/' + value
                ).done((data) => {
                    setSuggestions(data);
                    props.onFetchStop();
                });
            },
            1000
        );
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
                getSuggestionValue={props.getSuggestionValue}
                renderSuggestion={props.renderSuggestion}
                inputProps={inputProps}
            />
        </React.Fragment>
    );
}

export default Suggest;
