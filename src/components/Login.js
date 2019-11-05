import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import {
  Container,
  TextField,
  Button,
  Card,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import axios from "axios";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  card: {
    padding: "5%"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

export default function LoginForm(props) {
  const classes = useStyles();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);
  const [error, setError] = useState(false);

  const login = e => {
    e.preventDefault();
    axios(`/api/login`, {
      method: "post",
      withCredentials: true,
      data: {
        email,
        password
      }
    }).then(resp => {
      if (resp.data.status === 401) {
        setError(true);
      } else {
        // console.log("resp.data.teacher from Login.js: ", resp.data.teacher);
        let tempStudent = resp.data.student;
        let tempTeacher = resp.data.teacher;
        axios("/api/sessions", { withCredentials: true }).then(data => {
          const user = data.data.user;
          user.type = data.data.type;
          props.setUser(prev => {
            if (tempTeacher) setTeacher(tempTeacher);
            else setStudent(tempStudent);
            return user;
          });
          props.setAnchorEl(false);
        });
      }
    });
  };

  return (
    <Container maxWidth="sm" className={classes.container}>
      <Card elevation={4} className={classes.card}>
        <Typography variant="h4">Sign in</Typography>

        <form className={classes.form} onSubmit={e => login(e)}>
          {error && (
            <Card
              elevation={4}
              style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
            >
              <Typography variant="h6">Nice try!</Typography>
            </Card>
          )}

          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          <TextField
            variant="outlined"
            label="Password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            margin="normal"
            fullWidth
            required
          />

          {teacher && <Redirect to="/teachers/schedule" />}
          {student && <Redirect to="/" />}

          <Button type="submit" variant="outlined" color="primary">
            {" "}
            Login{" "}
          </Button>
        </form>
      </Card>
    </Container>
  );
}
