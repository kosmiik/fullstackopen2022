import { useDispatch, useSelector } from 'react-redux'
import { setNote } from '../reducers/notificationReducer'
import { vote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <li>
      {anecdote.content}<br />
      votes {anecdote.votes}<br />
      <button onClick = { handleClick }>vote</button>
    </li>
  )
}

const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(( { anecdotes, filter }) => {
    console.log(anecdotes)
    if (filter.length >= 3) {
      const filtered = anecdotes.filter(f => f.content.includes(filter))
      return filtered.slice().sort((a, b) => (a.votes > b.votes ? -1 : 1))
    } else {
    return anecdotes.slice().sort((a, b) => (a.votes > b.votes ? -1 : 1))
    }
  })


  return(
    <ul>
      {anecdotes.map((anecdote, index) =>
        <Anecdote
          key={index}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(vote(anecdote)) && dispatch(setNote(`You voted ${anecdote.content}`, 5))
          }
        />
      )}
    </ul>
  )
}

export default Anecdotes