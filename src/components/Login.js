import React, { useState } from "react";
import { Redirect } from "react-router-dom";

import axios from "axios";

export default function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teacher, setTeacher] = useState(false);
  const [student, setStudent] = useState(false);

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
        alert("Nice try!");
      } else {
        console.log("resp.data.teacher from Login.js: ", resp.data.teacher);
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
        });
      }
    });
  };

  return (
    <form>
      <label>
        Email:
        <input
          type="text"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </label>
      {teacher && <Redirect to="/teachers/schedule" />}
      {student && <Redirect to="/" />}
      <button type="submit" onClick={e => login(e)}>
        Login
      </button>
    </form>
  );
}
