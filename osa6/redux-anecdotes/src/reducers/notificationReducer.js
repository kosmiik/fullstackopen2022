import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let tOut

const noteSlice = createSlice({
  name: 'notification',
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

export const { hideNote, addNote } = noteSlice.actions
export const setNote = (message, seconds) => {
  return dispatch => {
      clearTimeout(tOut)
      dispatch(addNote(message))
      tOut = setTimeout(() => dispatch(hideNote()), seconds)
  }
}
export default noteSlice.reducer