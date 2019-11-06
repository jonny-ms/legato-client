import React, { useEffect, useState } from "react";
import axios from "axios";
import { Paper, Tabs, Tab } from "@material-ui/core";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [showCalendar, setShowCalendar] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [tab, setTab] = useState(props.trigger ? 0 : 1);
  const [courses, setCourses] = useState([]);
  const [videos, setVideos] = useState([]);

  const teacherID = props.history.location.state;

  const fetch = () => {
    axios(`/api/teachers/${teacherID.teacher}`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      setVideos(data.video);
      setTeacher(data.teachers);
      setCourses(data.courses);
    });
  };

  useEffect(() => {
    fetch();
    setShowProfile(props.trigger);
    setShowCalendar(!props.trigger);
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
      {showProfile && teacher && (
        <div>
          <TeacherProfile
            teacher={teacher}
            courses={courses}
            mobile={props.mobile}
            videos={videos}
          />
        </div>
      )}
      {showCalendar && (
        <div className="calendar">
          <CalendarForBooking teacherID={teacherID} />
        </div>
      )}
    </div>
  );
};

export default ShowTeacherTimeslots;
