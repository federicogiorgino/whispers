import React, { Fragment } from "react";
import SpinnerGif from "../img/spinner.gif";

const Spinner = () => {
  return (
    <div
      style={{ minHeight: "80vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <img style={{ width: "100px" }} src={SpinnerGif}></img>
    </div>
  );
};

export default Spinner;
