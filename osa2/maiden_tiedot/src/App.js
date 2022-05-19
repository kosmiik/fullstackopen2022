import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'

const App = () => {
  const [countries, setCountries] = useState([])
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log('render', countries.length, 'countries')

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
}

  return (
    <div>      
    <Filter
    newFilter={newFilter}
    handleFilter={handleFilter}/>
    
    <Countries 
        countries={countries}
        newFilter={newFilter}/>
    </div>)}

export default App
