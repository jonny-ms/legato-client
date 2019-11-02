import React from "react";
import StudentCalendar from "../StudentCalendar";

const StudentDashboard = () => {
  return (
    <div>
      <p>My Lessons</p>
      <div className="calendar">
        <StudentCalendar />
      </div>
    </div>
  );
};

export default StudentDashboard;
