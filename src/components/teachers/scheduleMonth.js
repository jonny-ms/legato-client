import React from "react";
import Calendar from "../Calendar";

const TeacherSchedule = () => {
  return (
    <div className="EditTeacher">
      <p>Edit Teacher's schedule</p>
      <div>This is the teacher edit schedule form</div>
      <div>This will have a calendar to set the teachers schedule</div>
      <Calendar />
    </div>
  );
};

export default TeacherSchedule;
