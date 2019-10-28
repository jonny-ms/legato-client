import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

class Calendar extends Component {
  handleDateClick = arg => {
    // bind with an arrow function
    alert(arg.dateStr);
  };

  render() {
    return (
      <FullCalendar
        dateClick={this.handleDateClick}
        events={[
          { title: "event 1", date: "2019-10-01" },
          { title: "event 2", date: "2019-10-02" }
        ]}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      />
    );
  }
}

export default Calendar;
