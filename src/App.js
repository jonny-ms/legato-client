import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import Nav from "./components/_nav";
import About from "./About";
import Search from "./Search";
import Home from "./Home";
import NewTeacher from "./components/teachers/new";
import EditTeacher from "./components/teachers/edit";
import TeacherMonth from "./components/teachers/scheduleMonth";
import TeacherDay from "./components/teachers/scheduleDay";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/teachers/new" component={NewTeacher} />
            <Route exact path="/teachers/edit" component={EditTeacher} />
            <Route exact path="/teachers/schedule" component={TeacherMonth} />
            <Route exact path="/teachers/schedule/day" component={TeacherDay} />
            <Route exact path="/Search" component={Search} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
