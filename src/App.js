import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/_nav";
import Home from "./components/Home";
import NewTeacher from "./components/teachers/new";
import EditTeacher from "./components/teachers/edit";
import TeacherMonth from "./components/teachers/scheduleMonth";
import TeacherDay from "./components/teachers/scheduleDay";
import Login from "./components/Login";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Nav />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/teachers/new" component={() => <NewTeacher />} />
          <Route exact path="/teachers/edit" component={EditTeacher} />
          <Route exact path="/teachers/schedule" component={TeacherMonth} />
          <Route exact path="/teachers/schedule/day" component={TeacherDay} />
          <Route exact path="/login" component={() => <Login />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
