import { useState } from 'react'
const Button = (props) => (<button onClick={props.handleClick}>{props.text}</button>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(anecdotes[Math.floor(Math.random() * (anecdotes.length))])
  const [votes, setVotes] = useState([0,0,0,0,0,0,0])
  const length = anecdotes.length
  const maxValue = Math.max(...votes)
  const maxIndex = votes.indexOf(maxValue);


  const handleVotes = () => {
    const copyVotes = [...votes]
    copyVotes[index] += 1
    setVotes(copyVotes)
  }
  
  const index = anecdotes.findIndex(anecdote => anecdote === selected);

  return (
    <div>
    <h1>anecdote of the day</h1>
    {selected}<br /><br />
    has {votes[index]} votes
    <br /><br />
    <Button handleClick={handleVotes} text='vote' />
    <Button handleClick={() => setSelected(selected => anecdotes[Math.floor(Math.random() * (length))])} text='next anecdote' />
    <br /><br />
    <h1>anecdote with most votes</h1>
    {anecdotes[maxIndex]}
  </div>


  )
}

export default App
