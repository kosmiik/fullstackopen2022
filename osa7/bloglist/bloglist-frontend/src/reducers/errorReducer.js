import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let tOut

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {

    hideNote() {
      return initialState    
    },
    addNote(state, action) {
      state = action.payload
      return state
    }
  },
})

export const { hideNote, addNote } = errorSlice.actions

export const setErrorMessage = (message, seconds) => {
  return dispatch => {
      clearTimeout(tOut)
      dispatch(addNote(message))
      tOut = setTimeout(() => dispatch(hideNote()), seconds)
  }
}
export default errorSlice.reducer 