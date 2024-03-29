import React, { useEffect, useState } from 'react';

import type { Country } from '../../shared/types/types';

import { Suggestions } from './Suggestions';
import './Autocomplete.css';

interface Props {
  data: Country[];
}

export const Autocomplete = (props: Props) => {
  const { data } = props;

  const [open, setOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState('');
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
    }, 120); // 120ms is a good value for this timeout because it is long enough to allow the onClick events to be processed, but short enough to feel responsive to the user.
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
      if (!inputValue) {
        setSuggestions(data);
      } else {
        setSuggestions(
          data.filter(country =>
            country.name.toLowerCase().includes(inputValue.toLowerCase()),
          ),
        );
      }
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
      <Suggestions
        inputValue={inputValue}
        onSelectCountry={onSelectCountry}
        open={open}
        suggestions={suggestions}
      />
    </div>
  );
};
