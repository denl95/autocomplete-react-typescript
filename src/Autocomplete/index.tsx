import React, { useRef } from 'react';
import './index.css';
import { Options } from './Options';
import { useAutocomplete } from './useAutocomplete';

interface AutocompleteProps {
  loadOptions: (inputValue: string) => Promise<string[]>;
  className?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}

const DEBOUNCE_TIME = 300;
const BLUR_TIMEOUT = 200;

const Autocomplete: React.FC<AutocompleteProps> = ({ loadOptions, className = '', onSelect, placeholder }) => {
  const [{ inputValue, filteredOptions, showOptions, loading, typing, selectedValue }, dispatch] = useAutocomplete();
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | undefined>();

  const loadFilteredOptions = async (value: string) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    const loadedOptions = await loadOptions(value);
    dispatch({ type: 'SET_FILTERED_OPTIONS', payload: loadedOptions });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    dispatch({ type: 'SET_INPUT_VALUE', payload: inputValue });
    if (inputValue.length > 0) {
      clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        loadFilteredOptions(inputValue);
      }, DEBOUNCE_TIME);
    }
  };
  
  const handleInputBlur = () => {
    setTimeout(() => {
      // workaround if on blud one of options was clicked
      dispatch({ type: 'HANDLE_ON_BLUR' });
    }, BLUR_TIMEOUT);
  };

  const handleOptionSelect = (option: string) => {
    dispatch({ type: 'SELECT_OPTION', payload: option });
    if (onSelect) {
      onSelect(option);
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div className={`autocomplete ${className}`}>
      <input
        onBlur={handleInputBlur}
        placeholder={placeholder}
        ref={inputRef}
        type="text"
        value={inputValue || selectedValue}
        onChange={handleInputChange}
        className="autocomplete-input"
      />
      {loading && <div className="autocomplete-options">
        <div className="autocomplete-option">
          Loading...
        </div>
      </div>}
      {showOptions && (
        <>
          {!loading && !typing && filteredOptions.length === 0 && (
            <ul className="autocomplete-options">
              <li className="autocomplete-option">
                No options
              </li>
            </ul>
          )}
          {filteredOptions.length > 0 && <Options
            options={filteredOptions}
            handleOptionSelect={handleOptionSelect}
            inputValue={inputValue}
          />}
        </>
      )}
    </div>
  );
};

export default Autocomplete;
