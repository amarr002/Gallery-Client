import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Gallery from "./components/Gallery";
import JwtAuthPage from "./components/JwtAuthPage";

function App() {
  const [authToken, setAuthToken] = useState(() => {
    return localStorage.getItem("authToken");
  });

  const handleLogin = async (token) => {
    try {
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      // navigate("/user/gallery");
      // <Navigate to="/user/gallery" />;
    } catch (error) {
      console.error("Login error:", error);
    }
  };
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (authToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [authToken]);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false); // Update isLoggedIn state
    // navigate("/");
    // <Navigate to="/" replace={true} />;
  };

  const handleSignup = async (token) => {
    try {
      if (authToken) {
        localStorage.removeItem("authToken");
      }
      localStorage.setItem("authToken", token);
      setAuthToken(token);
      // navigate("/user/gallery");
      // <Navigate to="/user/gallery" replace={true} />;
    } catch (error) {
      console.error("Signup error:", error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="*" element={<Error />} />
        <Route path="/" element={<Home />} />
        <Route path="user">
          <Route path="" element={<JwtAuthPage />} />
          <Route
            path="login"
            element={
              isLoggedIn ? (
                <Navigate to="/user/gallery" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />

          <Route path="signup" element={<Signup onSignup={handleSignup} />} />

          <Route
            path="gallery"
            element={
              isLoggedIn ? (
                <Gallery onLogout={handleLogout} />
              ) : (
                <Navigate to="/user/login" />
              )
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<App />);
