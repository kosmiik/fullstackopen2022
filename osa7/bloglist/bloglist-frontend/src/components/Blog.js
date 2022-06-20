import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { like, deleteBlog } from "../reducers/blogReducer";
import { useParams, useNavigate } from "react-router-dom";
const Blog = () => {
  const [showFull, setShowFull] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()

  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  console.log(blog)
  const updateBlog = async (blog) => {
    dispatch(like(blog))
};

const removeBlog = async (blog) => {
  if (
    window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`)
  ){
    dispatch(deleteBlog(blog))
    navigate('/')

  }  
};

  const fullView = () => {

    if (!blog) {
      return null
    }

    return (
      null
    );
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "none",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (!blog) {
    return null
  }

  return (

    <div className="blog" style={blogStyle}>
    <h3>{blog.title} by {blog.author}</h3>
    {blog.url}
    <br />
    {blog.likes}&nbsp;<button onClick={() => updateBlog(blog)}>like</button>
    <br />
    {blog.user.name}
    <br />
    <p>
      <button onClick={() => removeBlog(blog)}>remove</button>
    </p>
  </div>
  );
};

export default Blog;

