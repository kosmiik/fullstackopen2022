import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'If it hurts, do it more often',
    id: 1,
    votes: 0,
  },
  {
    content: 'Adding manpower to a late software project makes it later!',
    id: 2,
    votes: 0,
  },
]


const getId = () => (100000 * Math.random()).toFixed(0)


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {

    createAnecdote(state, action) {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0,
      })
    },

    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(a => a.id === id)
      const votedAnecdote = { 
        ...anecdoteToVote, 
        votes: anecdoteToVote.votes + 1 
      }
      
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : votedAnecdote 
      )     
    }
  },
})

export const { createAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer