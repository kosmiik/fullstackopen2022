import { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Togglable from "./components/Togglable";
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, userLogout } from './reducers/userReducer';


const App = () => {
  const blogFormRef = useRef();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch() 

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs());
  }, [dispatch]);


  const handleLogout = async (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm />
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
