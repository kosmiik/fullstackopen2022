import Togglable from "./Togglable"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import { useRef } from "react"
import { useSelector } from "react-redux"
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const Blogs = () => {
  const blogFormRef = useRef();
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "dotted",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (

  <div>
    <h2>blogs</h2>
    <Togglable buttonLabel="create blog" ref={blogFormRef}>
      <BlogForm />
    </Togglable>
    <br />
    {blogs.slice().sort((a, b) => (a.likes > b.likes ? -1 : 1)).map((blog) => (
      <div key={blog.id} style={blogStyle}>
        <table>
        <Link to={`/blogs/${blog.id}`}>
          <tr>{blog.title} {blog.author}</tr>
        </Link>
        </table>
      </div>
      ))}
  </div>
  );
};

export default Blogs;