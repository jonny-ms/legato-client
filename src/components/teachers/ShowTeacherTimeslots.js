import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Paper } from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import CalendarForBooking from "../CalendarForBooking";
import TeacherProfile from "../TeacherProfile";

const ShowTeacherTimeslots = props => {
  const [teacher, setTeacher] = useState();
  const [trigger, setTrigger] = useState();
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const teacherID = props.history.location.state;
  // console.log("teacherID from ShowTeacherTimeSlots.js: ", teacherID);

  const fetch = () => {
    axios(`/api/teachers/${teacherID.teacher}`, {
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
        <Paper>
          <Tabs
            value={tab}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
            <Tab label="Profile" onClick={e => triggerProfile(e)} />
            <Tab label="Book Me" onClick={e => triggerCalendar(e)} />
          </Tabs>
        </Paper>

        {/* <div>
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
        </div> */}
      </div>
      <div>
        {!trigger ? (
          <div className="calendar">
            <CalendarForBooking teacherID={teacherID} />
          </div>
        ) : (
          <div>{teacher && <TeacherProfile teacher={teacher} />}</div>
        )}
      </div>
    </div>
  );
};

export default ShowTeacherTimeslots;
