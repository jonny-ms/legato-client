import React, { useState, useContext } from "react";
import "../App.css";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";
import { Button } from "@material-ui/core";

export default function Nav(props) {
  const [redirect, setRedirect] = useState(false);

  const logout = e => {
    e.preventDefault();
    axios(`/api/logout`, {
      withCredentials: true
    }).then(() => {
      props.setUser({});
      setRedirect(true);
    });
  };

  const UserContext = React.createContext(props);

  const user = useContext(UserContext);

  const red = () => {
    setRedirect(false);
    return <Redirect to="/" />;
  };

  // console.log("user from _nav.js: ", user);
  // console.log("REDIRECT", redirect);
  return (
    <nav>
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
            <li>Edit Profile</li>
          </Link>
        )}
        {/*  DISPLAYED FOR SIGNED IN STUDENT */}
        {user.user.type === "Student" && (
          <Link to="/students">
            <li>Dashboard</li>
          </Link>
        )}
        {/* Displayed for SIGNED IN teachers */}
        {user.user.type === "Teacher" && (
          <Link to="/teachers/schedule">
            <li>Dashboard</li>
          </Link>
        )}
        {!user.user.type && (
          <Link to="/login">
            <li>Login</li>
          </Link>
        )}
        {user.user.type && (
          <Button onClick={e => logout(e)}>
            <li>
              {redirect && red()}
              Logout
            </li>
          </Button>
        )}
        {user.user && (
          <li>
            {user.user.type} {user.user.first_name}
          </li>
        )}
      </ul>
    </nav>
  );
}
