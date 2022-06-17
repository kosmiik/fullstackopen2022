import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const error = useSelector(state => state.error)
  
  const noteStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const errorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (notification === null && error === null) {
    return null
  } else if (notification !== null && error === null) {
    return <div style={noteStyle}>{notification}</div>
  } else if (notification === null && error !== null) {
    return <div style={errorStyle}>{error}</div>
  }
};
export default Notification
