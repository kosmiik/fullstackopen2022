import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const like = async (likeBlog) => {
  const liked = {likes: likeBlog.likes + 1 }

  const response = await axios.put(`${baseUrl}/${likeBlog.id}/`, liked);
  return response.data;
};

const remove = async (bToRemove) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${baseUrl}/${bToRemove.id}`, config);
  return response.data;
};

export default { getAll, setToken, create, like, remove };
