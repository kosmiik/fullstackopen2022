import { useDispatch, useSelector } from "react-redux"
import {
  BrowserRouter as Router,
  Switch, Route, Link
} from "react-router-dom"

const Users = () => {
  const users = useSelector(state => state.users)
  console.log(users)
  const userNames = users.map((user => <tr key={user.id}><Link to={`${user.id}`}>{user.name}</Link></tr>))
  const userBlogs = users.map((user => <tr>{user.blogs.length}</tr>))
return (
  <div>
  <h2>Users</h2>
  <table>
    <tr>
      <th></th>
      <th>blogs created</th>  
    </tr>
    <td>
      {userNames}
    </td>
    <td>
      {userBlogs}  
    </td>  
  </table>
  </div>
)
}

export default Users