import React from 'react'
const Error = ({ errormessage }) => {
    
    if (errormessage === null) {
      return null
    }
    else {
    return (
      <div className="error">
        {errormessage}
      </div>
    )
  }
}
  export default Error