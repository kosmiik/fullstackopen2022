import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Error from './components/Error'
import { render } from '@testing-library/react'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setMessage(`welcome ${username}!`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setUsername('')
      setPassword('')
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  const handleCreate = async (event) => {
    event.preventDefault()
    console.log('adding new blog with title', title)
    try {
      const blog = await blogService.create({
        title, author, url,
      })
      setTitle('')
      setAuthor('')
      setUrl('')
      setMessage(`a new blog ${title} by ${author} added`)
      setTimeout(() => {
        setMessage(null)
        window.location.reload()
      }, 5000)
    } catch (exception) {
      setErrorMessage('something went wrong, please try again')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
    <div>
    <h2>Log in to application</h2>
    <Notification message={message} />
    <Error errormessage={errorMessage} />
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>
  )}

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <Error errormessage={errorMessage} />
      <p>{user.name} logged in</p>
      <p><button onClick={handleLogout}>logout</button></p>
      <h2>create new</h2>
    <form onSubmit={handleCreate}>
      <div>
        title:
          <input
          type="text"
          value={title}
          name="title"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
          <input
          type="text"
          value={author}
          name="author"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
          <input
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <br />
      <button type="submit">create</button>
    </form>
    <br />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
  }

export default App
