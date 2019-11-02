import React from "react";
import TeacherCalendar from "../TeacherCalendar";

const TeacherDashboard = () => {
  return (
    <div className="EditTeacher">
      <p>Your Dashboard</p>
      <div className="dashboard-links">
        <p>Schedule</p>
        <p>Messages</p>
        <p>Appointments</p>
      </div>
      <div className="calendar">
        <TeacherCalendar />
      </div>
    </div>
  );
};

export default TeacherDashboard;
