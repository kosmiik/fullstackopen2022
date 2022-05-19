
import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = (country) => {
  const [weather, setWeather] = useState()
  const api_key = process.env.REACT_APP_API_KEY
  let weatherUrl  = `https://api.openweathermap.org/data/2.5/weather?lat=${country.lat}&lon=${country.lon}&appid=${api_key}&units=metric` 

  useEffect(() => {
    console.log('effect')
    axios
      .get(weatherUrl)
      .then(response => {
        console.log('promise fulfilled')
        setWeather(response.data)
        
      })
  }, [])

  if (weather === undefined) {
    return (
      <p>Odottaa...</p>)}
      
  else {
    return (
      <div>
      <h2>Weather in {country.capital}</h2>
      Temperature {weather.main.temp} Celsius<br />
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} /><br />
      Wind {weather.wind.speed} m/s
      </div>)}
      }

  export default Weather