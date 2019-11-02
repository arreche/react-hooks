import React, { useState, useEffect } from "react";

const Search = _ => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const fetchCountries = name => {
    setLoading(true);

    const uri = `https://restcountries.eu/rest/v2/name/${name}`;
    fetch(uri)
      .then(res => res.status === 200 ? res.json() : [])
      .then(res => setCountries(res))
      .catch(_ => setError(JSON.stringify(error)))
      .finally(_ => setLoading(false));
  };

  useEffect(
    _ => {
      fetchCountries(search);
    },
    [search]
  );

  const render = countries => (
    <ul>
      {countries.map(({ name }) => (
        <li key={name}>{name}</li>
      ))}
    </ul>
  );

  return (
    <>
      <input
        placeholder="Type something"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading && <pre>Loading</pre>}
      {error && <p>{error}</p>}
      <section>{countries && render(countries)}</section>
    </>
  );
};

export default Search;
