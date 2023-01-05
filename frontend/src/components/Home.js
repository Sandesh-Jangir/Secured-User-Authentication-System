import React from 'react'
import "../styles/main.css"
import "../styles/home.css"
import { Link } from 'react-router-dom'

const Home = () => {
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