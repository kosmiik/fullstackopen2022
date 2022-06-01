const Error = ({ errormessage }) => {
  const errorStyle = {
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }


  if (errormessage === null) {
    return null
  }
  else {
    return (
      <div style={errorStyle}>
        {errormessage}
      </div>
    )
  }
}
export default Error