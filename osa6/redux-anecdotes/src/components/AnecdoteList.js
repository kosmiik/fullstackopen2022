import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNote } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {anecdote.content}<br />
      votes {anecdote.votes}<br />
      <button onClick={() => vote(anecdote.id)}>vote</button>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(( { anecdotes, filter }) => {
    if (filter.length >= 3) {
      const filtered = anecdotes.filter(f => f.content.includes(filter))
      return filtered.slice().sort((a, b) => (a.votes > b.votes ? -1 : 1))
    } else {
    return anecdotes.slice().sort((a, b) => (a.votes > b.votes ? -1 : 1))
    }
  })

  return(
    <ul>
      {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(vote(anecdote.id)) && dispatch(setNote(`You voted ${anecdote.content}`, 5000))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes