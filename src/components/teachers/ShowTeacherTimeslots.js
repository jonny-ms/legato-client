import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [trigger, setTrigger] = useState();
  const teacherID = props.history.location.state.teacher;
  // console.log("teacherID from ShowTeacherTimeSlots.js: ", teacherID);
  console.log("trigger before useEffect: ", trigger);

  const fetch = () => {
    axios(`/api/teachers/${teacherID}`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      // console.log("data from ShowTeacherTimeSlots.js: ", data);
      setTeacher(data.teachers);
      setTrigger(false);
    });
  };

  // console.log("props.location: ", props.location);

  useEffect(() => {
    fetch();
  }, []);

  const triggerCalendar = e => {
    setTrigger(true);
  };

  const triggerProfile = e => {
    setTrigger(false);
  };

  return (
    <div className="EditTeacher">
      <p>Book Appointments</p>

      <div>
        {trigger ? (
          <div>{/* <CalendarForBooking teacherID={teacherID} /> */}</div>
        ) : (
          <div>{teacher ? <TeacherProfile teacher={teacher} /> : null}</div>
        )}
      </div>
    </div>
  );
};

export default ShowTeacherTimeslots;
