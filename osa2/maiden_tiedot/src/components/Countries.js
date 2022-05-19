import React, { useState } from 'react'
import Country from './Country'
import DetailedCountry from './DetailedCountry'

const Countries = ({ countries, newFilter}) => {
  const [pickCountry, setPickContry] = useState()

  const pick = event => {
    console.log(event.target.value)
    const pc = countries.filter(country =>
      country.name.common.includes(event.target.value)
    )
    console.log("cont: ", pc)
    setPickContry(pc[0])
  }

  const countr = countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase()))
  
  if (newFilter.length === 0) {
    return (
      <div></div>)}

  console.log(pickCountry)
  if (countr.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>)}

  if (pickCountry !== undefined) {
    return (
      <div>
      <DetailedCountry key={pickCountry.name.common} name={pickCountry.name.common} capital={pickCountry.capital} area={pickCountry.area} languages={pickCountry.languages} flag={pickCountry.flags.png} coordinates={pickCountry.capitalInfo.latlng}/>
      <button onClick={() => window.location.reload()}>Back</button>
      </div>)}
    
  if (countr.length > 1) {
    return (
      <div>
      {countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map(country => (
      <Country key={country.name.common} name={country.name.common} country={country} pick={pick} />))}
      </div>)}
  
    return (
      <div>
        {countries.filter(country => country.name.common.toLowerCase().includes(newFilter.toLowerCase())).map(country => (
        <DetailedCountry key={country.name.common} name={country.name.common} capital={country.capital} area={country.area} languages={country.languages} flag={country.flags.png} coordinates={country.capitalInfo.latlng} />))}
        <button onClick={() => window.location.reload()}>Back</button>
      </div>)}
  
  export default Countries