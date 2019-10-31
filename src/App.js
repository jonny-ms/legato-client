import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/_nav";
import Home from "./components/Home";
import NewStudent from "./components/students/New";
import NewTeacher from "./components/teachers/new";
import EditTeacher from "./components/teachers/edit";
import StudentSchedule from "./components/students/StudentSchedule";
import TeacherMonth from "./components/teachers/scheduleMonth";
import TeacherDay from "./components/teachers/scheduleDay";
import ShowTeacherTimeslots from "./components/teachers/ShowTeacherTimeslots";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/students/new" component={() => <NewStudent />} />
          <Route exact path="/teachers/new" component={() => <NewTeacher />} />
          <Route exact path="/teachers/edit" component={EditTeacher} />
          <Route exact path="/students" component={() => <StudentSchedule />} />
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
