import { createSlice } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import blogService from '../services/blogService'
import { setMessage } from './notificationReducer'
import { setErrorMessage } from './errorReducer'


const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

   likeBlog(state, action) {
    const blog = action.payload
    const id = action.payload.id
    return state.map(b => b.id === id ? blog : b)
  },

  appendBlog(state, action) {
    state.push(action.payload)
  },

  setBlogs(state, action) {
    return action.payload
  },

  delBlog(state, action) {
    const deleteIndex = state.findIndex(b => b.id === action.payload.id)

    return [
      ...state.slice(0, deleteIndex),
    ]
  }
  },
})

export const { likeBlog, appendBlog, setBlogs, delBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const getBlogs = () => {
  const blogs = setBlogs()
  return blogs
}

export const createBlog = (blog) => {
  return async dispatch => {
    try {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
    dispatch(setMessage(`a new blog ${blog.title} by ${blog.author} added`, 5000));
    } catch (exception) {
      dispatch(setErrorMessage(
        "something went wrong (at least, fill all of the fields), please try again", 5000
      ));
    }
  }
}

export const like = (blog) => {
  return async dispatch => {
    try {
    const likedBlog = await blogService.like(blog)
    dispatch(likeBlog(likedBlog))
    dispatch(setMessage(`you liked ${blog.author}'s blog!`, 5000));
    } catch (exception) {
      dispatch(setErrorMessage("an unknown error, check console!!!", 5000));

    }
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    try {
    const blogToRemove = await blogService.remove(blog)
    dispatch(delBlog(blogToRemove))
    dispatch(setMessage(
      `a blog ${blog.title} by ${blog.author} removed`, 5000));
    } catch (exception) {
      dispatch(setErrorMessage(
        "eeep, an error! (you are not authorized to remove this one?)", 5000));
    }
  }
}

export default blogSlice.reducer