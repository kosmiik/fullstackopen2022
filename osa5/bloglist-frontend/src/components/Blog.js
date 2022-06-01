import React, { useState } from 'react'
import PropTypes from 'prop-types'
const Blog = ({blog, updateBlog, removeBlog}) => {
  const [showFull, setShowFull] = useState(false)
  
  const fullView = () => {
    return (
      <div>
        {blog.url}<br />
        {blog.likes} <button onClick={() => updateBlog(blog)}>like</button><br />
        {blog.user.name}<br />
        <p><button onClick={() => removeBlog(blog)}>remove</button></p>
      </div>
    )
  }
  
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}&nbsp;
    <button onClick={() => setShowFull(!showFull)}>{showFull ? 'hide': 'show'}</button>
      {showFull && fullView()}
  </div>  
  )
}

export default Blog
