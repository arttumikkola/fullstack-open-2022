import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [input, setInput] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      setCountries(data);
    };
    fetch();
  }, []);

  useEffect(() => {
    const filter = countries.filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredCountries(filter);
  }, [countries, input]);

  return (
    <div>
      <p>find countries</p>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <CountriesToShow
        input={input}
        countries={countries}
        filteredCountries={filteredCountries}
        setInput={setInput}
      />
    </div>
  );
};

export default App;

const Country = ({ filteredCountries }) => {
  const [weather, setWeather] = useState();
  const apiKey = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    const fetch = async () => {
      if (filteredCountries.length == 1) {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital}&appid=${apiKey}`
        );
        setWeather(data);
      }
    };
    fetch();
  }, [filteredCountries.length]);

  if (weather != undefined) {
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
        <h1>Weather in {filteredCountries[0].capital}</h1>
        <p>temperature: {(weather.main.temp - 273.15).toFixed(2)} ??C </p>
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
        />
        <p>wind: {weather.wind.speed.toFixed(2)} m/s </p>
      </div>
    );
  } else {
    return <div></div>;
  }
};

const CountriesToShow = ({ input, filteredCountries, setInput, weather }) => {
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
    return <Country filteredCountries={filteredCountries} weather={weather} />;
  }
};
