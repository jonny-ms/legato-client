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
        console.log("resp from Login.js: ", resp);
        axios("/api/teachers", { withCredentials: true }).then(data => {
          // console.log("data", JSON.parse(data.data.teachers));
          // setTeacher(JSON.parse(data.data.teachers));
          const user = data.data.user;
          user.type = data.data.type;
          props.setUser(user);
          setTeacher(resp.data.teacher);
          setStudent(resp.data.student);
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
      {student && <Redirect to="/" />}
      {teacher && <Redirect to="/teachers/schedule" />}
      <button type="submit" onClick={e => login(e)}>
        Login
      </button>
    </form>
  );
}
