import React, { useEffect, useState } from 'react';

import { Country } from '../../entities/types';
import { highlightMatch } from '../../shared/utils/highlightMatch';

import './Autocomplete.css';

interface Props {
  data: Country[];
}

export const Autocomplete = (props: Props) => {
  const { data } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [suggestions, setSuggestions] = useState<Country[]>(data);

  const onFocus = () => {
    setOpen(true);
  };

  const onBlur = () => {
    // setTimeout is used here to delay the execution of setOpen(false).
    // This is done to ensure that any onClick events that are triggered when
    // the user clicks outside the input field are fully processed before the dropdown is closed.
    setTimeout(() => {
      setOpen(false);
    }, 100); // 100ms is a good value for this timeout because it is long enough to allow the onClick events to be processed, but short enough to feel responsive to the user.
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setInputValue(value);
  };

  const onSelectCountry = (value: string) => {
    setInputValue(value);
    setSuggestions(data);
    setOpen(false);
  };

  useEffect(() => {
    const filterData = () => {
      if (!inputValue) setSuggestions(data);
      else
        setSuggestions(
          data.filter(country =>
            country.name.toLowerCase().includes(inputValue.toLowerCase()),
          ),
        );
    };

    filterData();
  }, [inputValue, data]);

  return (
    <div className="container">
      <input
        className="autocomplete-input"
        onBlur={onBlur}
        onChange={onChange}
        onFocus={onFocus}
        placeholder="input here"
        type="text"
        value={inputValue}
      />
      {open && suggestions.length > 0 && (
        <div className="autocomplete-results">
          {suggestions.map((country, index) => {
            const [beforeMatch, match, afterMatch] = highlightMatch(
              country.name,
              inputValue,
            );

            return (
              <div
                className="autocomplete-item"
                key={index}
                onClick={() => onSelectCountry(country.name)}
              >
                {beforeMatch}
                <span className="highlight">{match}</span>
                {afterMatch}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
