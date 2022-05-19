import React from 'react'

const Person = (person, remove) => {
    return (
      
      <li>{person.name} {person.number} <button onClick={person.remove}>Poista</button></li>)}
  
  export default Person