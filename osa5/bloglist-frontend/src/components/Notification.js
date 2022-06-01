const Notification = ({ message}) => {
    
  const noteStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }  

  if (message === null) {
    return null
  }
  else {
    return (
      <div style={noteStyle}>
        {message}
      </div>
    )
  }
}
export default Notification