import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService'
import blogService from '../services/blogService'
import { setMessage } from './notificationReducer'
import { setErrorMessage } from './errorReducer'

const initialState = null
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    initUser(state, action) {
      return action.payload
    },

    login(state, action) {
      return action.payload 
    },

    logout(state, action) {
      return action.payload
    }
  },
})

export const { initUser, login, logout } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
  const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON);
    blogService.setToken(user.token);
    dispatch(initUser(user))
    }
  return null
  }
}

export const userLogin = (username, password) => {
  return async dispatch => {
    try {
    const user = await loginService.login({
      username,
      password,
    });
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch(login(user));
    dispatch(setMessage(`welcome ${username}!`, 5000))
  } catch {
    dispatch(setErrorMessage("wrong username or password", 5000));
  }
  }
}

export const userLogout = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    const user = window.localStorage.getItem("loggedBlogappUser")
    console.log(user)
    dispatch(logout(user))
    dispatch(setMessage("See you!", 5000))
  }
}
export default userSlice.reducer 