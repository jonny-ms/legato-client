import React, { useState } from "react";
import TeacherCalendar from "../TeacherCalendar";
import TeacherAppointmentList from "../TeacherAppointmentList";

const TeacherDashboard = () => {
  const [showCalendar, setShowCalendar] = useState(true);
  const [showAppointments, setShowAppointments] = useState(false);

  const showCalendarFunc = () => {
    setShowAppointments(false);
    setShowCalendar(true);
  };

  const showAppointmentsFunc = () => {
    setShowAppointments(true);
    setShowCalendar(false);
  };

  return (
    <div className="EditTeacher">
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
    </div>
  );
};

export default TeacherDashboard;
