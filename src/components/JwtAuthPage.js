import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function JwtAuthPage() {
  return (
    <div>
      <div>
        <Link to={"/user/login"}>
          <Button sx={{ width: 100, m: 1 }} variant="contained">
            Log In
          </Button>
        </Link>

        <Link to={"/user/signup"}>
          <Button sx={{ width: 100, m: 1 }} variant="contained">
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default JwtAuthPage;
