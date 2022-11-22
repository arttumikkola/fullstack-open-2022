import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countryInput, setCountryInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [show, setShow] = useState("");
  const [weather, setWeather] = useState([]);

  const apiKey = "289126ef1b80a9dd3fd33c17f6d4035a";
  //https://api.openweathermap.org/data/2.5/weather?q={apikey}&appid={apikey}

  useEffect(() => {
    if (countryInput.length > 0) {
      axios
        .get(`https://restcountries.com/v3.1/name/${countryInput}`)
        .then((response) => {
          setCountries(response.data);
          if (1 < countries.length < 10) {
            setCountries(response.data);
          } else if (countries.length === 1) {
            setCountries(response.data);
          }
        });
    }
  });

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

  const handleInputChange = (event) => {
    setCountryInput(event.target.value);
  };

  const Country = () => {
    return (
      <div>
        <h1> {countries[0].name.common} </h1>
        <p>capital: {countries[0].capital} </p>
        <p>area: {countries[0].area} </p>
        <b>languages:</b>
        <ul>
          {Object.values(countries[0].languages).map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <img src={countries[0].flags.svg} alt="flag" width="200"></img>
        <h1>Weather in {countries[0].capital}</h1>
        <p>temperature: {/* weather.main.temp */} </p>
        <p>wind: {/* {weather.main.wind} */} </p>
      </div>
    );
  };

  const CountriesToShow = () => {
    if (countryInput.length === 0) {
      return <div></div>;
    } else if (countries.length > 10 && countryInput.length > 0) {
      return <p>Too many matches, specify another filter</p>;
    } else if (1 < countries.length && countries.length < 10) {
      return countries.map((country, i) => (
        <div key={i}>
          {country.name.common}
          <button onClick={showCountry(i)}>show</button>
        </div>
      ));
    } else if (countries.length === 1) {
      return <Country />;
    }
  };

  const showCountry = (i) => {
    setCountries(countries[i - 1].name.common);
  };

  return (
    <div>
      <p>find countries</p>
      <input value={countryInput} onChange={handleInputChange} />
      <CountriesToShow />
    </div>
  );
};

export default App;
