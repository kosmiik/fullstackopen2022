import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const dispatch = useDispatch()

  const appendB = async (blog) => {
    dispatch(createBlog(blog))
  };

  const setBlog = (event) => {
    event.preventDefault();
    appendB({
      title: title,
      author: author,
      url: url,
      likes: 0,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={setBlog}>
        <div>
          title:
          <input
            type="text"
            data-testid="title"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            data-testid="author"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type="text"
            data-testid="url"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <br />
        <button data-testid="create-button" type="submit">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
