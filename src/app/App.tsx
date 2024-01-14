import React, { useEffect, useState } from 'react';

import { Country } from '../entities/types';
import { Autocomplete } from '../features/Autocomplete';

import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  const loadCountries = () => {
    fetch('https://countriesnow.space/api/v0.1/countries/capital')
      .then(response => response.json())
      .then(data => setCountries(data.data))
      .catch(error => {
        throw new Error(error);
      });
  };

  useEffect(() => {
    loadCountries();
  }, []);

  return (
    <div className="App">
      <h1>Autocomplete component</h1>
      <Autocomplete data={countries} />
    </div>
  );
}

export default App;
