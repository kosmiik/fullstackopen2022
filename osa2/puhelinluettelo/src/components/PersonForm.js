import React from 'react'
const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
  return (

    <form onSubmit={addPerson}>
      <div>name: <input
          value={newName}
          onChange={handleNameChange} />
      </div><br />
      <div>number: <input
          value={newNumber}
          onChange={handleNumberChange} />
      </div><br />
      <button type="submit">add</button>
    </form> )}

  export default PersonForm