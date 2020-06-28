import React from "react";
import { ReactComponent as Logo } from "../img/share.svg";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className='banner'>
      <h1>
        Welcome to <span style={{ color: "#2185d0", fontWeight: "700" }}>Whispers</span>
      </h1>
      <Logo style={{ width: "200px", height: "auto", margin: "20px 0px" }} />
      <h3>A GraphQL based Social Platform.</h3>
      <h3>
        Don't have an account?{" "}
        <span>
          <Link to='/register' style={{ color: "#2185d0", fontWeight: "700" }}>
            Sign up here.
          </Link>
        </span>
      </h3>
    </div>
  );
};

export default Banner;
