import React, { useState } from "react";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

export default function Nav(props) {
  const [state, setState] = useState(false);
  const [user, setUser] = useState({});

  // setUser(props);

  const logout = e => {
    e.preventDefault();
    axios(`/api/logout`, {
      withCredentials: true
    }).then(() => {
      setState(true);
    });
  };

  console.log("props from _nav.js: ", props);

  return (
    <nav>
      {user && (
        <p>
          {user.type} {user.first_name}
        </p>
      )}
      <Link to="/">
        <h3>Logo</h3>
      </Link>
      <ul className="nav-links">
        {/* Displayed when NO USER */}
        <Link to="/students/new">
          <li>New Student</li>
        </Link>
        {/* Displayed when NO USER */}
        <Link to="/teachers/new">
          <li>New teacher</li>
        </Link>
        {/* Displayed for SIGNED IN TEACHER */}
        <Link to="/teachers/edit">
          <li>Edit teacher</li>
        </Link>
        {/*  DISPLAYED FOR SIGNED IN STUDENT */}
        <Link to="/students">
          <li>Student Dashboard</li>
        </Link>
        {/* Displayed for SIGNED IN teachers */}
        <Link to="/teachers/schedule">
          <li>Teacher Dashboard</li>
        </Link>
        {/* Displayed for SIGNED IN teachers */}
        <Link to="/teachers/schedule/day">
          <li>Teacher Schedule Day</li>
        </Link>
        <Link to="/login">
          <li>Login</li>
        </Link>
        <Link onClick={e => logout(e)}>
          <li>
            {state && <Redirect to="/" />}
            Logout
          </li>
        </Link>
      </ul>
    </nav>
  );
}
