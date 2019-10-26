import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const TeacherSchedule = () => {
  // const handleDateClick = arg => {
  //   // bind with an arrow function
  //   alert(arg.dateStr);
  // };

  return (
    <div className="EditTeacher">
      <p>Edit Teacher's schedule</p>
      <div>This is the teacher edit schedule form</div>
      <div>This will have a calendar to set the teachers schedule</div>
      <FullCalendar
        events={[
          { title: "event 1", date: "2019-10-01" },
          { title: "event 2", date: "2019-10-02" }
        ]}
        // dateClick={this.handleDateClick}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
      />
    </div>
  );
};

export default TeacherSchedule;
