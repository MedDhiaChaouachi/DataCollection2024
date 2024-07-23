import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <h1>You are not authorized to view this page.</h1>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
};

export default Unauthorized;
