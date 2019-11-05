import React, { useState, useContext, useEffect } from "react";
import "../App.css";
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
      // red();
    });
  };

  const UserContext = React.createContext(props);

  const user = useContext(UserContext);

  // *******
  const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      flexGrow: 1
    }
  }));

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
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
    // handleClose();
  });
  console.log("event: ", event);

  return (
    <AppBar position="static">
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between" // Add it here :)
        >
          {/* 1. Legato Item */}
          <Grid item>
            <Button style={{ color: "white" }} component={Link} to="/">
              Legato
            </Button>
          </Grid>
          {/* 2. New Student & Teacher */}
          <Grid item>
            <Grid item>
              {!user.user.type && (
                <div>
                  <Grid
                    container
                    // justify="space-between" alignItems="center"
                  >
                    {/* 1. New Student & Teacher Item */}
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
                    {/* 2. Login Item */}
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
                </div>
              )}
            </Grid>

            {/* 5. Menu Button */}
            <Grid item>
              <Grid item>
                {user.user.type && (
                  <div>
                    {/* 3. Teacher Dashboard Item */}

                    {user.user.type === "Teacher" && (
                      <Button
                        style={{ color: "white" }}
                        component={Link}
                        to="/teachers/schedule"
                      >
                        Dashboard
                      </Button>
                    )}

                    {/* 4. Student Dashboard Item */}

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
                          <MenuItem component={Link} to="/teachers/edit">
                            Edit Profile
                          </MenuItem>
                          <MenuItem onClick={e => logout(e)}>
                            {redirect && red()}
                            Logout
                          </MenuItem>
                        </div>
                      )}
                      {user.user.type === "Student" && (
                        <div>
                          <MenuItem onClick={e => logout(e)}>
                            {redirect && red()}
                            Logout
                          </MenuItem>
                        </div>
                      )}
                    </Menu>
                  </div>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
    // <nav>
    //   <Link to="/">
    //     <h3>Legato</h3>
    //   </Link>

    //   <ul className="nav-links">
    //     {/* Displayed when NO USER */}
    //     {!user.user.type && (
    //       <Link to="/students/new">
    //         <li>New Student</li>
    //       </Link>
    //     )}
    //     {/* Displayed when NO USER */}
    //     {!user.user.type && (
    //       <Link to="/teachers/new">
    //         <li>New teacher</li>
    //       </Link>
    //     )}
    //     {/* Displayed for SIGNED IN TEACHER */}
    //     {user.user.type === "Teacher" && (
    //       <Link to="/teachers/edit">
    //         <li>Edit Profile</li>
    //       </Link>
    //     )}
    //     {/*  DISPLAYED FOR SIGNED IN STUDENT */}
    //     {user.user.type === "Student" && (
    //       <Link to="/students">
    //         <li>Dashboard</li>
    //       </Link>
    //     )}
    //     {/* Displayed for SIGNED IN teachers */}
    //     {user.user.type === "Teacher" && (
    //       <Link to="/teachers/schedule">
    //         <li>Dashboard</li>
    //       </Link>
    //     )}
    //     {!user.user.type && (
    //       <Link to="/login">
    //         <li>Login</li>
    //       </Link>
    //     )}
    //     {user.user.type && (
    //       <Button onClick={e => logout(e)}>
    //         <li>
    //           {redirect && red()}
    //           Logout
    //         </li>
    //       </Button>
    //     )}
    //     {user.user && (
    //       <li>
    //         {user.user.type} {user.user.first_name}
    //       </li>
    //     )}
    //   </ul>
    // </nav>
  );
}
