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
          <Link to="/teachers/new">
            <li>New teacher</li>
          </Link>
          <Link to="/teachers/edit">
            <li>Edit teacher</li>
          </Link>
          <Link to="/about">
            <li>Login</li>
          </Link>
          <Link to="/about">
            <li>Login</li>
          </Link>
          <Link to="/about">
            <li>Login</li>
          </Link>
          <Link to="/about">
            <li>Login</li>
          </Link>
        </ul>
      </nav>
    );
  }
}

export default Nav;
