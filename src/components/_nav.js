import React, { Component } from "react";
import "../App.css";
import { Link } from "react-router-dom";

class Nav extends Component {
  render() {
    return (
      <nav>
        <Link to="/">
          <h3>Logo</h3>
        </Link>
        <ul className="nav-links">
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/search">
            <li>Search</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
