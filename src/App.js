import dayjs from 'dayjs';
import React, { useState } from 'react';

const api = {
  key: "ed01eea6a7f49ba69a36b2ee1e8c889b",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      const res = await res.json()
      setWeather(result);
      setQuery('');
      console.log(result);
    };
  }
}









return (
  <div className="App">
    <main>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          search(e);
        }}
      >
        <div className='search-box'>
          <input
            type='text'
            className='search-bar'
            placeholder='search...'
            onChange={e => setQuery(e.target.value)}
            value={query}
          />
        </div>
      </form>
      {weather.main !== undefined && (
        <div>
          <div className='date-box'>
            <div className='location'>{weather.name}, {weather.sys.country}</div>
            <div className='date'>{dayjs().format("dddd-DD-MM-YYYY")}</div>
          </div>
          <div className='weather-box'>
            <div className='temp'>{Math.round(weather.main.temp)}°C</div>
            <div className='weather'>{weather.weather[0].main}</div>
          </div>
        </div>
      )}


    </main>
  </div>
);


export default App;