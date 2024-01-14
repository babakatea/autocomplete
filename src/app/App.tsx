import React, { useEffect, useState } from 'react';

import { loadCountries } from '../entities/countries';
import { Autocomplete } from '../features/Autocomplete';
import type { Country } from '../shared/types/types';

import './App.css';

function App() {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    loadCountries(setCountries);
  }, []);

  return (
    <div className="app">
      <h1>Autocomplete component</h1>
      <Autocomplete data={countries} />
    </div>
  );
}

export default App;
