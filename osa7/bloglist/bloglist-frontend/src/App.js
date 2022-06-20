import { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Blog from './components/Blog';
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import User from './components/User';
import Users from './components/Users';
import { initializeBlogs } from './reducers/blogReducer';
import { initializeUser, userLogout } from './reducers/userReducer';
import { initializeUsers } from './reducers/allUsersReducer';
import {
  BrowserRouter as Router,
  Routes, Route, Link, Switch
} from "react-router-dom"


const App = () => {
  const blogFormRef = useRef();
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  
  //styles
  
  const padding = {
    padding: 5
  }
  const menu = {
    border: "solid",
    borderWidth: 1,
    marginBottom: 15,
    padding: 5
  }

  const button = {
    marginLeft: 20
  }



  useEffect(() => {
    dispatch(initializeUser());
    dispatch(initializeUsers())
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
      <div style={menu}>
        <Link style={padding} to="/">blogs</Link>
        -
        <Link style={padding} to="/users">users</Link>
        - {user.name} logged in
        <button style={button} onClick={handleLogout}>logout</button>
      </div>
      <Notification />
      <Routes>
        <Route path="/" element={<Blogs />} />
      </Routes>
      <Routes>
        <Route path="/users" element={<Users />} />
      </Routes>
      <Routes>
          <Route path="/users/:id" element={<User />} />
      </Routes>
      <Routes>
          <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </div>

  );
};
export default App;
