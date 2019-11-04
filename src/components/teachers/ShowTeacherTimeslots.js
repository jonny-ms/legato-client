import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Paper, Tabs, Tab } from "@material-ui/core";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [trigger, setTrigger] = useState();
  const [showCalendar, setShowCalendar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [tab, setTab] = useState(props.trigger ? 0 : 1);

  const teacherID = props.history.location.state;

  const fetch = () => {
    axios(`/api/teachers/${teacherID.teacher}`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      setTeacher(data.teachers);
      setShowProfile(props.trigger);
      setShowCalendar(!props.trigger);
    });
  };

  useEffect(() => {
    fetch();
  }, []);

  const showCalendarFunc = () => {
    setShowProfile(false);
    setShowCalendar(true);
  };

  const showProfileFunc = () => {
    setShowProfile(true);
    setShowCalendar(false);
  };

  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  return (
    <div>
      <Paper>
        <Tabs
          value={tab}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Profile" onClick={e => showProfileFunc(e)} />
          <Tab label="Book a Lesson" onClick={e => showCalendarFunc(e)} />
        </Tabs>
      </Paper>
      {showCalendar && (
        <div className="calendar">
          <CalendarForBooking teacherID={teacherID} />
        </div>
      )}
      {showProfile && teacher && (
        <div>
          <TeacherProfile teacher={teacher} />
        </div>
      )}
    </div>
  );
};

export default ShowTeacherTimeslots;
