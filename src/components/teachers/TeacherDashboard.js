import React, { useState } from "react";
import TeacherCalendar from "../TeacherCalendar";
import TeacherAppointmentList from "../TeacherAppointmentList";

import Box from "@material-ui/core/Box";

const TeacherDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showAppointments, setShowAppointments] = useState(true);

  const showCalendarFunc = () => {
    setShowAppointments(false);
    setShowCalendar(true);
  };

  const showAppointmentsFunc = () => {
    setShowAppointments(true);
    setShowCalendar(false);
  };

  return (
    <Box className="EditTeacher">
      <p>Your Dashboard</p>
      <div className="dashboard-links">
        <button onClick={() => showCalendarFunc()}>Schedule</button>
        <button onClick={() => showAppointmentsFunc()}>Appointments</button>
      </div>
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
    </Box>
  );
};

export default TeacherDashboard;
