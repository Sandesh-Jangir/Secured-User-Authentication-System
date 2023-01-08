import React, { useEffect } from 'react'
import "../styles/main.css"
import "../styles/home.css"
import { Link, useNavigate } from 'react-router-dom'

const Home = () => {
  // Redirect directly to "/dashboard" if the token exists.
  const navigate = useNavigate(); // For redirecting
  useEffect(()=>{
    const token = localStorage.getItem("authToken") // getting the token from the localStorage.
    if (token !== null){ 
      navigate("/dashboard") // redirecting.
    }
  })
  return (
    <div className='container'>
        <h1>It seems you've not made a registry yet !</h1>
        <div className="btn-grp">
          <Link to={"/login"}><button className="btn">Login</button></Link>
          <Link to={"/signup"}><button className="btn">Sign Up</button></Link>
        </div>
    </div>
  )
}

export default Home