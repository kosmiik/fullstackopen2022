import Togglable from "./Togglable"
import Blog from "./Blog"
import BlogForm from "./BlogForm"
import { useRef } from "react"
import { useSelector } from "react-redux"

const Blogs = () => {
  const blogFormRef = useRef();
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)



  return (

  <div>
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

export default Blogs;