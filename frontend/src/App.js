import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <>
    {/* Wrapping componenets for different routes. */}
      <Router>
        <Routes>
          {/* Landing Page. */}
          <Route path="/" element={<Home />}>
          </Route>
          {/* Sign Up Component */}
          <Route path="/signup" element={<SignUp />}>
          </Route>
          {/* Login Component */}
          <Route path="/login" element={<Login />}>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
