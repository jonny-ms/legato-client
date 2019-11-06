import React, { useState, useContext, useEffect, Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import axios from "axios";
import { Button, Avatar } from "@material-ui/core";
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

  const [anchorElMenuMobile, setAnchorElMenuMobile] = useState(null);

  const handleClickMenuMobile = event => {
    setAnchorElMenuMobile(event.currentTarget);
  };

  const handleCloseMenuMobile = () => {
    setAnchorElMenuMobile(null);
  };

  return (
    <AppBar position="static" title={<img src="./logo.png" />}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          style={{ alignItems: "center" }}
        >
          {/* 1. Legato Item */}
          <Button
            style={{ color: "white" }}
            component={Link}
            to="/"
            title="Legato"
          >
            <img src={logo} style={{ height: 40 }} />
          </Button>

          {/* 2. New Student & Teacher */}
          <Grid item>
            {!user.user.type ? (
              <Grid container>
                {props.mobile && (
                  <Fragment>
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                      aria-label="menu"
                      onClick={handleClickMenuMobile}
                      style={{}}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorElMenuMobile}
                      keepMounted
                      open={Boolean(anchorElMenuMobile)}
                      onClose={handleCloseMenuMobile}
                    >
                      <MenuItem
                        onClick={handleCloseMenuMobile}
                        component={Link}
                        to="/students/new"
                        title="New Student"
                      >
                        New Student
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseMenuMobile}
                        component={Link}
                        to={"/teachers/new"}
                        title="New Teacher"
                      >
                        New Teacher
                      </MenuItem>
                      <MenuItem
                        onClick={handleCloseMenuMobile}
                        component={Link}
                        to="/login"
                        title="Login"
                      >
                        Login
                      </MenuItem>
                    </Menu>
                  </Fragment>
                )}
                {/*  New Student & Teacher Item */}
                {!props.mobile && (
                  <Fragment>
                    <Grid item>
                      <Grid container>
                        {/* Student Item */}
                        <Grid item>
                          <Button
                            style={{ color: "white" }}
                            component={Link}
                            to="/students/new"
                            title="New Student"
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
                            title="New Teacher"
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
                        title="Login"
                      >
                        Login
                      </Button>
                    </Grid>
                  </Fragment>
                )}
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
                      title="Dashboard"
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
                      title="Dashboard"
                    >
                      Dashboard
                    </Button>
                  )}
                  {!props.mobile && (
                    <Button style={{ color: "white" }} variant="disabled">
                      {props.user.first_name}
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
                    <Avatar
                      title={props.user.first_name}
                      src={props.user.profile_pic}
                      className={classes.avatar}
                    />
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
                          title="Edit Profile"
                        >
                          Edit Profile
                        </MenuItem>
                        <MenuItem onClick={e => logout(e)} title="Logout">
                          {redirect && red()}
                          Logout
                        </MenuItem>
                      </div>
                    )}
                    {user.user.type === "Student" && (
                      <MenuItem onClick={e => logout(e)} title="Logout">
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
