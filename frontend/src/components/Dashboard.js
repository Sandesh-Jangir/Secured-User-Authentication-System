import React from "react";
import "../styles/main.css";
import "../styles/dashboard.css";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate(); // For redirecting.
  // Function for getting the user details from the token.
  const getDetails = async () => {
    // Fetching the token from localStorage.
    const token = localStorage.getItem("authToken");
    try {
      if (token) {
        // Sending the authentication token for validation.
        const request = await fetch(
          "http://localhost:8000/api/auth/auth-token/",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
              authtoken: token,
            },
          }
        );
        // Parsing the response to json.
        const response = await request.json();
        const userData = response.user;
  
        // Sending the fetched user data to DOM.
        document.getElementById("name").innerText = userData.name;
        document.getElementById("email").innerText = userData.email;
        document.getElementById("work").innerText = userData.work;
      }
    } catch (error) {
      // For anonymous errors.
      const message = "Internal Server Error";
      console.error({ error, message });
    }
  };

  // Function for logging out and clearing the localStorage.
  const handleExit = ()=>{
    // Clearing the localstorage.
    localStorage.clear();
    navigate("/") // Redirecting back to home page.
  } 
  

  getDetails();
  return (
    <div>
      <div className="main-container">
        {/* Just for showcase...  :) */}
        <div className="message">
          By registering yourself on our platform you get access to quality
          weekly newsletter for more information stay tuned ...
        </div>
        <div className="information">
          <h1 className="heading">Its You !</h1>
          <div className="info-content">
            <div className="info-item">
              <span>Name</span>
              <p id="name"></p>
            </div>
            <div className="info-item">
              <span>Email</span>
              <p id="email"></p>
            </div>
            <div className="info-item">
              <span>Work</span>
              <p id="work"></p>
            </div>
          </div>
        </div>
      </div>
      <button className="btn" onClick={handleExit}>
        Exit
      </button>
    </div>
  );
};

export default Dashboard;
