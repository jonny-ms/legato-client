import React, { useState } from "react";
import TeacherCalendar from "../TeacherCalendar";
import TeacherAppointmentList from "../TeacherAppointmentList";
import { Paper, Tabs, Tab } from "@material-ui/core";

import Box from "@material-ui/core/Box";

const TeacherDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);
  const [tab, setTab] = useState(0);
  const handleChange = (e, newValue) => {
    setTab(newValue);
  };

  const showCalendarFunc = () => {
    setShowAppointments(false);
    setShowCalendar(true);
  };

  const showAppointmentsFunc = () => {
    setShowAppointments(true);
    setShowCalendar(false);
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
          <Tab label="Schedule" onClick={e => showCalendarFunc(e)} />
          <Tab label="Appointments" onClick={e => showAppointmentsFunc(e)} />
        </Tabs>
      </Paper>
      {showCalendar && (
        <div className="calendar">
          <TeacherCalendar />
        </div>
      )}
      {showAppointments && (
        <div>
          <TeacherAppointmentList />
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;
