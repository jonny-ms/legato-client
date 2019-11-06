import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Nav from "./components/_nav";
import Home from "./components/Home";
import NewStudent from "./components/students/New";
import NewTeacher from "./components/teachers/new";
import EditTeacher from "./components/teachers/edit";
import TeacherDashboard from "./components/teachers/TeacherDashboard";
import StudentDashboard from "./components/students/StudentDashboard";
import ShowTeacherTimeslots from "./components/teachers/ShowTeacherTimeslots";
import Login from "./components/Login";

const App = () => {
  const [user, setUser] = useState({});
  const [trigger, setTrigger] = useState();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobile, setMobile] = useState(false);

  const fetchItems = async () => {
    const data = await axios("/api/sessions", { withCredentials: true });
    const user = data.data.user;
    user.type = data.data.type;
    setUser(user);
  };

  useEffect(() => {
    fetchItems();
    if (window.innerWidth < 680) {
      setMobile(true);
      console.log("mobile view");
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav
          anchorEl={anchorEl}
          user={user}
          setUser={setUser}
          mobile={mobile}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home setTrigger={setTrigger} user={user} mobile={mobile}/>}
          />
          <Route exact path="/students/new" component={() => <NewStudent />} />
          <Route exact path="/teachers/new" component={() => <NewTeacher />} />
          <Route exact path="/teachers/edit" component={EditTeacher} />
          <Route exact path="/teachers/schedule" component={TeacherDashboard} />
          {/* <Route exact path="/teachers/schedule/day" component={TeacherDay} /> */}
          <Route
            path="/teachers/"
            render={props => (
              <ShowTeacherTimeslots
                {...props}
                withCredentials={true}
                trigger={trigger}
                mobile={mobile}
              />
            )}
          />
          <Route
            exact
            path="/students"
            component={() => <StudentDashboard />}
          />
          <Route
            exact
            path="/login"
            component={() => (
              <Login setAnchorEl={setAnchorEl} setUser={setUser} />
            )}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
