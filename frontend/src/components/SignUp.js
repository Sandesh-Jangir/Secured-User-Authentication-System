import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/main.css";
import "../styles/signup.css";
import Error from "./Error";
import { useState } from "react";

const SignUp = () => {
  // Error states.
  const [errorOccured, setErrorOccured] = useState(false);
  const [error, setError] = useState("");
  let navigate = useNavigate(); // React router hook used for redirecting.
  // Function to handle the submit.
  const handleSubmit = async (e) => {
    // Preventing the default reload on form submit.
    e.preventDefault();

    // Fetching the input feilds.
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const work = document.getElementById("work").value;

    // Forming the jsonified data to send to the api.
    const user = JSON.stringify({
      name: name,
      email: email,
      password: password,
      work: work,
    });
    const parsedUser = JSON.parse(user);

    // Creating the user with the help of the backend api.
    try {
      // Sending the request.
      const request = await axios.post(
        "http://localhost:8000/api/auth/signup",
        parsedUser
      );
      const data = request["data"]; // reponse data
      // If user is created with no errors then add the auth-token to the local storage.
      if (data["success"]) {
        localStorage.setItem("authToken", data["authToken"]);
        navigate("/dashboard"); // Redirect to dashboard component.
      }
    } catch (err) {
      // For anonymous errors.
      setErrorOccured(true);
      setError(err["response"]["data"]["error"]);
    }
  };
  return (
    <>
    {errorOccured? <Error message = {error}/>:""}
      <div className="form-container">
        <div className="side">
          <h2>Thank You </h2>
          <h2>For Joining Us!</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <input type="text" id="name" placeholder="name" required />
          <input type="email" id="email" placeholder="unique@email" required />
          <input
            type="password"
            id="password"
            placeholder="password"
            required
          />
          <input type="text" id="work" placeholder="work" required />
          <button className="btn-form" type="submit">
            Create Account
          </button>
        </form>
      </div>
    </>
  );
};

export default SignUp;
