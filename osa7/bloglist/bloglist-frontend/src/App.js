import { useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
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
    <h2>blogs</h2>
    <Notification />
    <p>{user.name} logged in</p>
    <p>
      <button onClick={handleLogout}>logout</button>
    </p>
    <Routes>
      <Route path="/" element={<Blogs />} />
    </Routes>
    <Routes>
      <Route path="/users" element={<Users />} />
    </Routes>
    </div>

  );
};
export default App;
