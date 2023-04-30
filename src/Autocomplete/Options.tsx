import React from 'react';

interface OptionsProps {
  options: string[];
  handleOptionSelect: (option: string) => void;
  inputValue: string;
}

export const Options = ({ inputValue, options, handleOptionSelect }: OptionsProps) => {
  return (
    <ul className="autocomplete-options">
      {options.map((option, index) => (
        <li key={index} onClick={() => handleOptionSelect(option)} className="autocomplete-option">
          {option.split(new RegExp(`(${inputValue})`, "gi")).map((part, i) => (
            part.toLowerCase() === inputValue.toLowerCase() ? (
              <b key={i}>{part}</b>
            ) : (
              <React.Fragment key={i}>{part}</React.Fragment>
            )
          ))}
        </li>
      ))}
    </ul>
  );
};
