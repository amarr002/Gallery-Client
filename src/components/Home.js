import React from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Home() {
  return (
    <div>
      <Link to={"/user"}>
        <Button sx={{ width: 300, m: 1 }} variant="contained">
          Using Email&Password
        </Button>
      </Link>
      <Button sx={{ width: 300, m: 1 }} variant="contained">
        Using Google Auth
      </Button>
    </div>
  );
}

export default Home;
