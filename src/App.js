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

  const fetchItems = async () => {
    const data = await axios("/api/sessions", { withCredentials: true });
    const user = data.data.user;
    user.type = data.data.type;
    setUser(user);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <Router>
      <div className="App">
        <Nav user={user} setUser={setUser} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Home setTrigger={setTrigger} />}
          />
          <Route exact path="/students/new" component={() => <NewStudent />} />
          <Route exact path="/teachers/new" component={() => <NewTeacher />} />
          <Route exact path="/teachers/edit" component={EditTeacher} />
<<<<<<< HEAD
          <Route exact path="/students" component={() => <StudentSchedule />} />
          <Route exact path="/teachers/schedule" component={TeacherMonth} />
          <Route exact path="/teachers/schedule/day" component={TeacherDay} />
          <Route
            path="/teachers/"
            render={props => (
              <ShowTeacherTimeslots
                {...props}
                withCredentials={true}
                trigger={trigger}
              />
            )}
            // trigger={trigger}
            // setTrigger={setTrigger}
          />
=======
          <Route
            exact
            path="/students"
            component={() => <StudentDashboard />}
          />
          <Route exact path="/teachers/schedule" component={TeacherDashboard} />
          <Route path="/teachers/" component={ShowTeacherTimeslots} />
>>>>>>> b2212fcd020558ee27ace6d853fd9d482a9a006a
          <Route
            exact
            path="/login"
            component={() => <Login setUser={setUser} />}
          />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
