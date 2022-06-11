import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNote } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const NewAnecdote = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.setNote(`You added ${content}`, 5)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default connect(null, { createAnecdote, setNote })(NewAnecdote) 