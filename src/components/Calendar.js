import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  { title: "event 1", date: "2019-10-01" },
  { title: "event 2", date: "2019-10-02" }
];

class Calendar extends Component {
  state = {
    calendarEvents: [
      // initial event data
      { title: "Event Now", start: new Date() }
    ]
  };

  handleDateClick = arg => {
    if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
      this.setState({
        // add new event data
        calendarEvents: this.state.calendarEvents.concat({
          // creates a new array
          title: "New Event",
          start: arg.date,
          allDay: arg.allDay
        })
      });
    }
  };

  render() {
    return (
      <FullCalendar
        dateClick={this.handleDateClick}
        events={this.state.calendarEvents}
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      />
    );
  }
}

export default Calendar;
