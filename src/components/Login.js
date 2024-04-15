import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const url = "http://127.0.0.1:3000/user/login";

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        url,
        {
          email: email,
          password: password,
        }
        // { withCredentials: false }
      );

      console.log("Login successful!", response.data);
      onLogin(response.data.token);

      navigate("/user/gallery");
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: 300 },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <div>
        <TextField
          id="outlined-required"
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div>{error}</div>} {/* Display error message if exists */}
      <div>
        <Button sx={{ width: 300, m: 1 }} variant="contained" type="submit">
          Login
        </Button>
      </div>
    </Box>
  );
}

export default Login;
