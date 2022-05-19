import React from 'react'
import Person from './Person'

const Persons = ({ persons, newFilter, handleDeletePerson }) => {
    return (

      <ul>
        {persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase())).map(person => (
        <Person key={person.id} name={person.name} number={person.number} remove={handleDeletePerson(person.name, person.id)} />))}
      </ul>
    )
  }
  
  export default Persons