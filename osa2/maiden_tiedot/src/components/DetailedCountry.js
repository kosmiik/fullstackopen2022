import React from 'react'
import Weather from './Weather'

const DetailedCountry = (country) => {
  const languages = country.languages
  const lat = country.coordinates[0]
  const lon = country.coordinates[1]


    return (
      <div>
        <h1>{country.name}</h1> 
        capital: {country.capital}<br />
        area: {country.area}
        <br />
        <h3>languages:</h3>
        <ul>
          {Object.entries(languages).map(([key, value]) => (
            <li key={key}>{value}</li>))}
        </ul>
        <img src={country.flag} height="150"/>
        <Weather capital={country.capital} lat={lat} lon={lon} />
      </div> )}

  export default DetailedCountry