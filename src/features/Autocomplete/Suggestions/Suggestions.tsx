import React from 'react';

import type { Country } from '../../../shared/types/types';
import { highlightMatch } from '../../../shared/utils/highlightMatch';

import './Suggestions.css';

interface Props {
  suggestions: Country[];
  open: boolean;
  inputValue: string;
  onSelectCountry: (value: string) => void;
}

export const Suggestions = (props: Props) => {
  const { open, suggestions, inputValue, onSelectCountry } = props;

  if (!open || suggestions.length === 0) {
    return null;
  }

  return (
    <div className="autocomplete-suggestions">
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
  );
};
