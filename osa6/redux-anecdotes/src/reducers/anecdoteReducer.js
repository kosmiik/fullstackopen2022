import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdoteService'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {

   voteAnecdote(state, action) {
    const votedAnecdote = action.payload
    const id = action.payload.id
    return state.map(anecdote => anecdote.id === id ? votedAnecdote : anecdote)
  },

    appendAnecdote(state, action) {
      state.push(action.payload)
    },

    setAnecdotes(state, action) {
      return action.payload
    },

    updateAnecdote(state, action) {
      return state.map(anecdote =>
        anecdote.id !== state.id ? anecdote : action.payload
        )
    }
  },
})

export const { appendAnecdote, setAnecdotes, voteAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = id => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(id)
    dispatch(voteAnecdote(votedAnecdote))
  }
}


export default anecdoteSlice.reducer