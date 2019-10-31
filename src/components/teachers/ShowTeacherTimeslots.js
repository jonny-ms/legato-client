import React from "react";
import CalendarForBooking from "../CalendarForBooking";

const ShowTeacherTimeslots = props => {
  return (
    <div className="EditTeacher">
      <p>Book Appointments</p>
      <CalendarForBooking teacherID={props.history.location.state} />
    </div>
  );
};

export default ShowTeacherTimeslots;
