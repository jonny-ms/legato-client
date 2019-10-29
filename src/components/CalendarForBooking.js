import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

const moment = require("moment");

class CalendarForBooking extends Component {
  state = {
    calendarEvents: []
  };

  calendarRef = React.createRef();

  getCalendarEvents = () => {
    let id = 6;
    axios(`/api/teachers/6`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      let loadedEvents = [];
      for (let i in data) {
        const startTime = data[i].datetime;
        loadedEvents.push({
          title: "Available",
          start: moment(startTime).toDate(),
          end: moment(startTime)
            .add(30, "m")
            .toDate(),
          id: i
        });
      }
      console.log(loadedEvents);
      this.setState({
        calendarEvents: loadedEvents
      });
    });
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

  componentDidUpdate() {
    // console.log("updated bookings");
    // this.forceUpdate();
  }

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

  submitTimeSlots = e => {
    e.preventDefault();
    const events = this.state.calendarEvents;
    const timeslotInMilliseconds = 1000 * 60 * 30;

    let timeslots = [];
    for (let event of events) {
      const numberOfTimeslots =
        (event.end - event.start) / timeslotInMilliseconds;
      for (let i = 0; i < numberOfTimeslots; i++) {
        const newTimeslot = moment(event.start)
          .add(30 * i, "m")
          .toDate();
        timeslots.push(newTimeslot);
      }
    }
    console.log(timeslots);

    axios(`/api/timeslots`, {
      method: "post",
      withCredentials: true,
      data: {
        timeslot: timeslots
      }
    });
  };

  bookEvent = arg => {
    // console.log("create booking");
    // console.log(this.state.calendarEvents);
    // console.log(arg.event.title);
    let eventId = arg.event.id;
    let events = [...this.state.calendarEvents];

    events[eventId] = {
      ...events[eventId],
      title: "Booking Request",
      backgroundColor: "green",
      borderColor: "green"
    };
    // console.log(events);

    this.setState({
      calendarEvents: events
    });

    // console.log(this.state.calendarEvents);
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.submitTimeSlots}>Submit</button>
        <FullCalendar
          // dateClick={this.handleDateClick}
          ref={this.calendarRef}
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
          eventRender={e => console.log(e.event)}
          // selectable={true}
          // editable={true}
          // droppable={true}
          // draggable={true}
          // select={this.handleSelect}
          // eventDrop={this.handleDrop}
          // eventResize={this.handleResize}
          eventClick={this.bookEvent}
        />
      </Fragment>
    );
  }
}

export default CalendarForBooking;
