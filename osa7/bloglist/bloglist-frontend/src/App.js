import { useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Blog from "./components/Blog";
import blogService from "./services/blogService";
import loginService from "./services/login";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { setMessage } from './reducers/notificationReducer';
import { setErrorMessage } from './reducers/errorReducer';
import { initializeBlogs } from './reducers/blogReducer';


const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const blogFormRef = useRef();
  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const handleLogin = async (event) => { 
    event.preventDefault();
    console.log("logging in with", username, password);
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      dispatch(setMessage(`welcome ${username}!`, 5000))

    } catch (exception) {
      setUsername("");
      setPassword("");
      dispatch(setErrorMessage("wrong username or password", 5000));
    }
  };

  const handleUsernameChange = (event) => {
    console.log(event.target.value);
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    console.log(event.target.value);
  };

  const handleLogout = async (event) => {
    event.preventDefault();
    window.localStorage.clear();
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <p>
        <button onClick={handleLogout}>logout</button>
      </p>
      <Togglable buttonLabel="create blog" ref={blogFormRef}>
        <BlogForm />
      </Togglable>
      <br />
      {blogs.slice().sort((a, b) => (a.likes > b.likes ? -1 : 1)).map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  );
};
export default App;
