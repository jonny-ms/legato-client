import React from "react";
import CalendarForBooking from "../CalendarForBooking";

const ShowTeacherTimeslots = props => {
  return (
    <div className="EditTeacher">
      <p>Book Appointments</p>
      <div className="calendar">
        <CalendarForBooking teacherID={props.history.location.state} />
      </div>
    </div>
  );
};

export default ShowTeacherTimeslots;
