import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

class Calendar extends Component {
  state = {
    calendarEvents: []
  };

  // handleDateClick = arg => {
  //   // if (confirm("Would you like to add an event to " + arg.dateStr + " ?")) {
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
    const id = this.state.calendarEvents.length;
    this.setState({
      calendarEvents: this.state.calendarEvents.concat({
        title: "Available",
        start: arg.start,
        end: arg.end,
        id: Number(id)
      })
    });
    // console.log(this.state.calendarEvents);
  };

  handleDrop = arg => {
    const id = arg.oldEvent.id;
    let events = this.state.calendarEvents;

    events[id].start = arg.event.start;
    events[id].end = arg.event.end;

    this.setState({
      calendarEvents: events
    });
    // console.log(this.state.calendarEvents);
  };

  handleResize = arg => {
    const id = arg.prevEvent.id;
    let events = this.state.calendarEvents;

    events[id] = {
      title: "Available",
      start: arg.event.start,
      end: arg.event.end,
      id: Number(id)
    };

    this.setState({
      calendarEvents: events
    });
    // console.log(this.state.calendarEvents);
  };

  removeEvent = arg => {
    const id = Number(arg.event.id);
    let events = this.state.calendarEvents;
    events = events.filter(event => {
      return event.id !== id;
    });

    for (let i in events) {
      events[i].id = Number(i);
    }

    this.setState({
      calendarEvents: events
    });

    // console.log(this.state.calendarEvents);
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
        select={this.handleSelect}
        eventDrop={this.handleDrop}
        eventResize={this.handleResize}
        eventClick={this.removeEvent}
      />
    );
  }
}

export default Calendar;
