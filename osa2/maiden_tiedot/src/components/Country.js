import React, { useState } from 'react'


const Country = ({country, name, pick}) => {


    return (
      
      <li>{name} <button value={country.name.common} onClick={pick}>Show</button></li>
      )}
  
  export default Country