import React from "react";
import { Link } from "react-router-dom";

import "./NavBar.css";

function NavBar({ onChange, onSubmit }) {
  return (
    <div className="navBar">
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="home">Home</h3>
      </Link>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="searchBar"
          placeholder="Search"
          onChange={onChange}
        ></input>
      </form>
    </div>
  );
}

export default NavBar;
