import React, {useState} from "react";
import "../styles/main.css";
import "../styles/login.css";
import axios from "axios";
import {useNavigate} from "react-router-dom"
import Error from "./Error";

const Login = () => {
  // Error states.
  const [errorOccured, setErrorOccured] = useState(false)
  const [error, setError] = useState("")
  // Hook for redirecting.
  const navigate = useNavigate();
  // Function to run on submit.
  const handleSubmit = async (e) => {
    // Preventing from default reload on submit.
    e.preventDefault();
    // Fetching the entered feilds.
    const data = JSON.stringify({
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    });
    // Parsing the data to JSON.
    const parsedData = JSON.parse(data);

    try {
      // Sending the post request to the api.
      const request = await axios.post("http://localhost:8000/api/auth/login", parsedData);
      const response = request["data"] // Filtering the required data.
      if (response["success"]){ // If found user in db.
        localStorage.setItem("authToken", response["authToken"])
        navigate("/dashboard") // Redirect to dashboard component.
      }
    } catch (err) { // If errors occured.
      setErrorOccured(true)
      setError(err["response"]["data"]["error"]);
    }
  };
  return (
    <>
    {errorOccured? <Error message = {error}/>:""}
      <h1>We're Glad Seeing You Back</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" id="email" placeholder="authorized@email" />
        <input type="password" id="password" placeholder="password" />
        <button type="submit">Get Back In</button>
      </form>
    </>
  );
};

export default Login;
