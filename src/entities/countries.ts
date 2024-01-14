import type { SetCountriesCallback } from '../shared/types/types';

export const loadCountries = (setCountriesCallback: SetCountriesCallback) => {
  fetch('https://countriesnow.space/api/v0.1/countries/capital')
    .then(response => response.json())
    .then(data => setCountriesCallback(data.data))
    .catch(error => {
      throw new Error(error);
    });
};
