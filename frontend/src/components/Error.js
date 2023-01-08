import React from 'react'
import "../styles/main.css"
import "../styles/error.css"

const Error = (props) => {
  const closeError = ()=>{
    document.getElementById("error").style.display = "none";
  }
  return (
    <main id="error" className='error'>
      {props.message}
      <button className='closeError' onClick={closeError}>&times;</button>
    </main>
  )
}

export default Error