import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/userService'

const allUsersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {

    initUsers(state, action) {
      return action.payload
    }

  },
})

export const { initUsers } = allUsersSlice.actions

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    console.log(users)
    dispatch(initUsers(users))
  }
}

export default allUsersSlice.reducer 