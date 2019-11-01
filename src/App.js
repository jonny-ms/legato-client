import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/_nav";
import Home from "./components/Home";
import NewStudent from "./components/students/New";
import NewTeacher from "./components/teachers/new";
import EditTeacher from "./components/teachers/edit";
import TeacherMonth from "./components/teachers/scheduleMonth";
import TeacherDay from "./components/teachers/scheduleDay";
import ShowTeacherTimeslots from "./components/teachers/ShowTeacherTimeslots";
import Login from "./components/Login";

const App = () => {
  const [teacher, setTeacher] = useState([]);
  const [user, setUser] = useState({});

  const fetchItems = async () => {
    const data = await axios("/api/teachers", { withCredentials: true });
    // console.log("data", JSON.parse(data.data.teachers));

    setTeacher(JSON.parse(data.data.teachers));
    const user = data.data.user;
    user.type = data.data.type;
    setUser(user);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  // console.log("user from App.js: ", user);

  return (
    <Router>
      <div className="App">
        <Nav teacher={teacher} user={user} />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students/new" component={() => <NewStudent />} />
          <Route exact path="/teachers/new" component={() => <NewTeacher />} />
          <Route exact path="/teachers/edit" component={EditTeacher} />
          <Route exact path="/teachers/schedule" component={TeacherMonth} />
          <Route exact path="/teachers/schedule/day" component={TeacherDay} />
          <Route path="/teachers/" component={ShowTeacherTimeslots} />
          <Route exact path="/login" component={() => <Login />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
