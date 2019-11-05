import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Switch from "@material-ui/core/Switch";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Grid from "@material-ui/core/Grid";

import "../App.css";

import logo from "./logo.png";

export default function Nav(props) {
  const [redirect, setRedirect] = useState(false);

  const red = () => {
    return <Redirect to="/" />;
  };

  // console.log("initial redirect: ", redirect);
  const logout = e => {
    e.preventDefault();
    axios(`/api/logout`, {
      withCredentials: true
    }).then(() => {
      setRedirect(true);
      props.setUser({});
      setAnchorEl(false);
    });
  };

  const UserContext = React.createContext(props);

  const user = useContext(UserContext);

  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {},
    title: {
      flexGrow: 1
    }
  }));

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // console.log("open:", open);
  // console.log("props.anchorEl: ", props.anchorEl);

  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    setRedirect(false);
  });
  // console.log("event: ", event);

  return (
    <AppBar position="static" title={<img src="./logo.png" />}>
      <Toolbar>
        <Button style={{ color: "white" }} component={Link} to="/">
          <img src={logo} style={{ height: 40 }} />
        </Button>

        <Grid
          container
          direction="row"
          justify="space-between" // Add it here :)
        >
          {/* 1. Legato Item */}
          <Grid item></Grid>
          {/* 2. New Student & Teacher */}
          <Grid item>
            {!user.user.type ? (
              <Grid container>
                {/*  New Student & Teacher Item */}
                <Grid item>
                  <Grid container>
                    {/* Student Item */}
                    <Grid item>
                      <Button
                        style={{ color: "white" }}
                        component={Link}
                        to="/students/new"
                      >
                        New Student
                      </Button>
                    </Grid>
                    {/* Teacher Item */}
                    <Grid item>
                      <Button
                        style={{ color: "white" }}
                        component={Link}
                        to="/teachers/new"
                      >
                        New Teacher
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                {/*  Login Item */}
                <Grid item>
                  <Button
                    style={{ color: "white" }}
                    component={Link}
                    to="/login"
                  >
                    Login
                  </Button>
                </Grid>
              </Grid>
            ) : (
              <Grid container>
                <Grid item>
                  {/*  Teacher Dashboard Item */}

                  {user.user.type === "Teacher" && (
                    <Button
                      style={{ color: "white" }}
                      component={Link}
                      to="/teachers/schedule"
                    >
                      Dashboard
                    </Button>
                  )}

                  {/*  Student Dashboard Item */}

                  {user.user.type === "Student" && (
                    <Button
                      style={{ color: "white" }}
                      component={Link}
                      to="/students/"
                    >
                      Dashboard
                    </Button>
                  )}
                  <IconButton
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    className={classes.menuButton}
                    edge="start"
                  >
                    <AccountCircle />
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right"
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    {user.user.type === "Teacher" && (
                      <div>
                        <MenuItem
                          onClick={handleClose}
                          component={Link}
                          to="/teachers/edit"
                        >
                          Edit Profile
                        </MenuItem>
                        <MenuItem onClick={e => logout(e)}>
                          {redirect && red()}
                          Logout
                        </MenuItem>
                      </div>
                    )}
                    {user.user.type === "Student" && (
                      <MenuItem onClick={e => logout(e)}>
                        {redirect && red()}
                        Logout
                      </MenuItem>
                    )}
                  </Menu>
                </Grid>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
