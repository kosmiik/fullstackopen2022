import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import Error from './components/Error'
import contactService from './services/contacts'



const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    contactService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
      
    }

    if(persons.map(a=>a.name).includes(personObject.name) === true) {   
      if (window.confirm(`${newName} is already added to phonebook, replace old number with new one?`)) {
        const oldPerson = persons.find(n => n.name === newName)
        contactService
        .update(oldPerson.id, { ...oldPerson, number: newNumber })
        .then(newPerson => {
          setPersons(
            persons.map(n => (n.name === newName ? newPerson : n))
          )
            setMessage(
              `Number updated. New number is ${newNumber}`
            )    
          
        })
        .catch(error => {
          setErrorMessage(
            `Information of ${personObject.name} has already been deleted from server`
          )
          setPersons(persons.filter(person => person.name !== personObject.name))
        })
        setPersons(persons.concat(personObject))
        setNewName("")
        setNewNumber("")

        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 5000)
    }}

    else {
   
    contactService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage(
          `Added ${newName}`
        )})
      .catch(error => {
        setErrorMessage(error.response.data.error)
        console.log(error)
      })
        setTimeout(() => {
          setMessage(null)
          setErrorMessage(null)
        }, 5000)
   
  }}

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
    console.log(event.target.value)
  }

  const handleFilter = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const handleDeletePerson = (name, id) => {
    return () => {
      if (window.confirm(`Poistetaanko ${name} ?`)) {
        contactService
          .remove(id)
          .then(() => {
            setPersons(persons.filter(n => n.id !== id))
            setNewName("")
            setNewNumber("")
            setMessage(
              `${name} deleted`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }}}

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <Error errormessage={errorMessage} />
      <Filter
        newFilter={newFilter}
        handleFilter={handleFilter}/>

      <h2>add a new</h2>
      <PersonForm 
        newName={newName} 
        newNumber={newNumber} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
        addPerson={addPerson} />
      
      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        newFilter={newFilter}
        handleDeletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App
