export type Country = {
  name: string;
  capital: string;
  iso2: string;
  iso3: string;
};

export type SetCountriesCallback = (countries: Country[]) => void;
