import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [trigger, setTrigger] = useState(false);
  const teacherID = props.history.location.state.teacher;
  // console.log("teacherID from ShowTeacherTimeSlots.js: ", teacherID);
  console.log("trigger before useEffect: ", trigger);

  console.log("props.history....trigger: ");

  const fetch = () => {
    axios(`/api/teachers/${teacherID}`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      console.log("data from ShowTeacherTimeSlots.js: ", data);
      setTeacher(data.teachers);
    });
  };

  console.log("props.location: ", props.location);

  useEffect(() => {
    fetch();
  }, []);

  // useEffect(() => {
  //   setTrigger(props.location.state.trigger);
  // });
  // console.log("trigger after useEffect: ", trigger);

  const triggerCalendar = e => {
    setTrigger(true);
  };

  const triggerProfile = e => {
    setTrigger(false);
  };

  return (
    <div className="EditTeacher">
      <p>Book Appointments</p>
      {!trigger && (
        <Button
          onClick={() => {
            triggerProfile();
          }}
          style={{ color: "grey" }}
          disabled={true}
        >
          Book Me
        </Button>
      )}
      {!trigger && (
        <Button
          onClick={() => {
            triggerCalendar();
          }}
        >
          My Profile
        </Button>
      )}
      {trigger && (
        <Button
          onClick={() => {
            triggerProfile();
          }}
        >
          Book Me
        </Button>
      )}
      {trigger && (
        <Button
          onClick={() => {
            triggerCalendar();
          }}
          style={{ color: "grey" }}
          disabled={true}
        >
          My Profile
        </Button>
      )}

      <div>
        {!trigger && (
          <div>
            <CalendarForBooking teacherID={teacherID} />
          </div>
        )}

        {trigger && (
          <div>
            <TeacherProfile teacher={teacher} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowTeacherTimeslots;
