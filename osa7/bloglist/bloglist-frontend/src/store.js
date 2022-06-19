import { configureStore } from '@reduxjs/toolkit'
import errorReducer from './reducers/errorReducer'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import allUsersReducer from './reducers/allUsersReducer'
//import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    notification: notificationReducer,
    error: errorReducer,
    user: userReducer,
    users: allUsersReducer
    //filter: filterReducer
  }
})

export default store 