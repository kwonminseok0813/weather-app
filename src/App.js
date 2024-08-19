import dayjs from 'dayjs';
import React, { useState } from 'react';

const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);

  const search = async (e) => {
    e.preventDefault();


    const response = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`);
    const result = await response.json();

    if (result && result.coord) {
      const { lat, lon } = result.coord;


      const forecastResponse = await fetch(`${api.base}forecast?lat=${lat}&lon=${lon}&units=metric&appid=${api.key}`);
      const forecastResult = await forecastResponse.json();

      const dailyForecast = {};
      forecastResult.list.forEach(item => {
        const date = dayjs(item.dt_txt).format('YYYY-MM-DD');
        console.log(item.dt_txt);
        if (!dailyForecast[date]) {
          dailyForecast[date] = {
            temp: 0,
            weather: item.weather[0].main,
            count: 0,
          };
        }
        dailyForecast[date].temp += item.main.temp;
        dailyForecast[date].count += 1;
      });

      const processedForecast = Object.keys(dailyForecast).map(date => ({
        date,
        temp: Math.round(dailyForecast[date].temp / dailyForecast[date].count),
        weather: dailyForecast[date].weather
      }));

      setWeather(result);
      setForecast(processedForecast);
      setQuery('');
      console.log(processedForecast);
    } else {
      console.error("도시를 찾을 수 없습니다:", result);
    }
  }

  return (
    <div className="App">
      <main>
        <form onSubmit={search}>
          <div className='search-box'>
            <input
              type='text'
              className='search-bar'
              placeholder='searching...'
              onChange={e => setQuery(e.target.value)}
              value={query}
            />
          </div>
        </form>

        {weather.main !== undefined && (
          <div>
            <div className='location-box'>
              <div className='location'>{weather.name}, {weather.sys.country}</div>
              <div className='date'>{dayjs().format("dddd, DD MMM YYYY")}</div>
            </div>
            <div className='current-weather-box'>
              <div className='temp'>{Math.round(weather.main.temp)}°C</div>
              <div className='weather'>{weather.weather[0].main}</div>
            </div>


            <div className='forecast-box'>
              {forecast.length > 0 ? (
                forecast.map((day, index) => (
                  <div key={index} className='day'>
                    <div className='date'>{dayjs(day.date).format("dddd, DD MMM")}</div>
                    <div className='temp'>
                      {Math.round(day.temp)}°C
                    </div>
                    <div className='weather'>
                      {day.weather}
                    </div>
                  </div>
                ))
              ) : (
                <div>No forecast data available</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
