import React, { useState, useContext } from "react";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function Nav(props) {
  const [state, setState] = useState(false);

  const logout = e => {
    e.preventDefault();
    axios(`/api/logout`, {
      withCredentials: true
    }).then(() => {
      setState(true);
    });
  };

  const UserContext = React.createContext(props);

  const user = useContext(UserContext);

  console.log("user from _nav.js: ", user);

  return (
    <nav>
      {user.user && (
        <p>
          {user.user.type} {user.user.first_name}
        </p>
      )}
      <Link to="/">
        <h3>Home</h3>
      </Link>

      <ul className="nav-links">
        {/* Displayed when NO USER */}
        {!user.user.type && (
          <Link to="/students/new">
            <li>New Student</li>
          </Link>
        )}
        {/* Displayed when NO USER */}
        {!user.user.type && (
          <Link to="/teachers/new">
            <li>New teacher</li>
          </Link>
        )}
        {/* Displayed for SIGNED IN TEACHER */}
        {user.user.type === "Teacher" && (
          <Link to="/teachers/edit">
            <li>Edit teacher</li>
          </Link>
        )}
        {/*  DISPLAYED FOR SIGNED IN STUDENT */}
        {user.user.type === "Student" && (
          <Link to="/students">
            <li>Student Dashboard</li>
          </Link>
        )}
        {/* Displayed for SIGNED IN teachers */}
        {user.user.type === "Teacher" && (
          <Link to="/teachers/schedule">
            <li>Teacher Dashboard</li>
          </Link>
        )}
        {/* Displayed for SIGNED IN teachers */}
        {user.user.type === "Teacher" && (
          <Link to="/teachers/schedule/day">
            <li>Teacher Schedule Day</li>
          </Link>
        )}
        {!user.user.type && (
          <Link to="/login">
            <li>Login</li>
          </Link>
        )}
        {user.user.type && (
          <Button
            onClick={e => {
              logout(e);
            }}
          >
            <li>
              {state && <Redirect to="/" />}
              Logout
            </li>
          </Button>
        )}
      </ul>
    </nav>
  );
}
