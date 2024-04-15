import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup({ onSignup }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const url = "http://127.0.0.1:3000/user/signup";

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(url, {
        name: name,
        email: email,
        password: password,
      });

      console.log("Signup successful!", response.data);
      onSignup(response.data.token);

      navigate("/user/gallery");
    } catch (error) {
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
          id="outlined-password-input"
          label="Username"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-required"
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <Button sx={{ width: 300, m: 1 }} variant="contained" type="submit">
          Submit
        </Button>
      </div>
    </Box>
  );
}

export default Signup;
