import { useState, useEffect } from "react";
import axios from "axios";

const Country = ({ filteredCountries }) => {
  return (
    <div>
      <h1> {filteredCountries[0].name.common} </h1>
      <p>capital: {filteredCountries[0].capital} </p>
      <p>area: {filteredCountries[0].area} </p>
      <b>languages:</b>
      <ul>
        {Object.values(filteredCountries[0].languages).map((value, index) => {
          return <li key={index}>{value}</li>;
        })}
      </ul>
      <img src={filteredCountries[0].flags.svg} alt="flag" width="200"></img>
      <p>temperature: {/* weather.main.temp */} </p>
      <h1>Weather in {filteredCountries[0].capital}</h1>
      <p>wind: {/* {weather.main.wind} */} </p>
    </div>
  );
};

const CountriesToShow = ({ input, filteredCountries, setInput, countries }) => {
  if (filteredCountries.length > 11) {
    return <div></div>;
  } else if (filteredCountries.length > 10 && input.length > 0) {
    return <p>Too many matches, specify another filter</p>;
  } else if (1 < filteredCountries.length && filteredCountries.length < 10) {
    return filteredCountries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => setInput(country.name.common)}>show</button>
      </div>
    ));
  } else if (filteredCountries.length === 1) {
    return <Country countries={countries} />;
  }
};

const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  /* const [weather, setWeather] = useState([]); */

  const apiKey = "289126ef1b80a9dd3fd33c17f6d4035a";
  //https://api.openweathermap.org/data/2.5/weather?q={apikey}&appid={apikey}

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(data);
    };
    fetch();
  }, [countries]);

  useEffect(() => {
    const filter = countries.filter((country) =>
      country.name.common.includes(input)
    );
    setFilteredCountries(filter);
  }, [countries, input]);

  /*  useEffect(() => {
    if (countries.length === 1) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${countries[0].capital}&appid=${apiKey}`
        )
        .then((response) => {
          setWeather(response.data);
        });
    }
  }); */

  return (
    <div>
      <p>find countries</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <CountriesToShow
        input={input}
        countries={countries}
        filteredCountries={filteredCountries}
      />
    </div>
  );
};

export default App;
