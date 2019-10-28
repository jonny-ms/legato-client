import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
// listPlugin is to view a list of all appointments
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

class Calendar extends Component {
  state = {
    calendarEvents: []
  };

  // handleDateClick = arg => {
  //   // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
  //   alert("Current view: " + arg.view.type);
  //   arg.view.type = "timeGridDay";
  //   // changeView("timeGrid");
  //   this.setState({
  //     // add new event data
  //     calendarEvents: this.state.calendarEvents.concat({
  //       // creates a new array
  //       title: "New Event",
  //       start: arg.date,
  //       end: arg.date + 1800
  //       // allDay: arg.allDay
  //     })
  //   });
  //   console.log(arg.date);
  //   console.log(arg.date + 1800);
  //   // }
  // };

  handleSelect = arg => {
    // console.log(arg);
    const id = this.state.calendarEvents.length;
    // console.log(id);
    this.setState({
      calendarEvents: this.state.calendarEvents.concat({
        // creates a new array
        title: "Available",
        start: arg.start,
        end: arg.end,
        id: id
      })
    });
  };

  handleDrop = arg => {
    const id = arg.oldEvent.id;
    const events = this.state.calendarEvents;

    events[id] = {
      title: "available",
      start: arg.event.start,
      end: arg.event.end,
      id: id
    };

    this.setState({
      calendarEvents: events
    });
  };

  handleResize = arg => {
    console.log("dragging");
    console.log(arg.event);
    const id = arg.prevEvent.id;
    const events = this.state.calendarEvents;

    events[id] = {
      title: "available",
      start: arg.event.start,
      end: arg.event.end,
      id: id
    };

    this.setState({
      calendarEvents: events
    });
  };

  render() {
    return (
      <FullCalendar
        // dateClick={this.handleDateClick}
        events={this.state.calendarEvents}
        defaultView="timeGridWeek"
        header={{
          left: "prev,next today",
          center: "title",
          right: "timeGridWeek,listWeek"
        }}
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          listWeekPlugin,
          interactionPlugin
        ]}
        selectable={true}
        editable={true}
        droppable={true}
        draggable={true}
        eventOverlap={false}
        select={this.handleSelect}
        eventDrop={this.handleDrop}
        eventResize={this.handleResize}
      />
    );
  }
}

export default Calendar;
