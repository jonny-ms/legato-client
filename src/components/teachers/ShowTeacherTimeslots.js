import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [trigger, setTrigger] = useState();
  const teacherID = props.history.location.state.teacher;
  // console.log("teacherID from ShowTeacherTimeSlots.js: ", teacherID);

  const fetch = () => {
    axios(`/api/teachers/${teacherID}`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      // console.log("data from ShowTeacherTimeSlots.js: ", data);
      setTeacher(data.teachers);
      setTrigger(props.trigger);
    });
  };

  // console.log("props.location: ", props.location);

  useEffect(() => {
    fetch();
  }, []);

  const triggerCalendar = e => {
    setTrigger(false);
  };

  const triggerProfile = e => {
    setTrigger(true);
  };

  return (
    <div className="EditTeacher">
      <p>Book Appointments</p>
      <div>
        <div>
          {!trigger ? (
            <Button disabled={true} style={{ color: "grey" }}>
              Book Now
            </Button>
          ) : (
            <Button disabled={true} style={{ color: "grey" }}>
              Profile
            </Button>
          )}
        </div>
        <div>
          {trigger ? (
            <Button
              onClick={e => {
                triggerCalendar(e);
              }}
            >
              Book Now
            </Button>
          ) : (
            <Button
              onClick={e => {
                triggerProfile(e);
              }}
            >
              Profile
            </Button>
          )}
        </div>
      </div>
      <div>
        {!trigger ? (
          <div>
            <CalendarForBooking teacherID={teacherID} />
          </div>
        ) : (
          <div>{teacher ? <TeacherProfile teacher={teacher} /> : null}</div>
        )}
      </div>
    </div>
  );
};

export default ShowTeacherTimeslots;
