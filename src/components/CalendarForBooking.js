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
    axios(`/api/teachers/3`, {
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
          id: data[i].id
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


  submitTimeSlots = e => {
    e.preventDefault();
    const events = this.state.calendarEvents;
    const timeslotInMilliseconds = 1000 * 60 * 30;

    let timeslots = [];
    for (let event of events) {
      const numberOfTimeslots =
        (event.end - event.start) / timeslotInMilliseconds;
      for (let i = 0; i < numberOfTimeslots; i++) {
        const newTimeslot = event.id;
        if (event.title === "Booking Request") {
          timeslots.push(newTimeslot);
        }
      }
    }
    console.log(timeslots);

    axios(`/api/lessons`, {
      method: "post",
      withCredentials: true,
      data: {
        lesson: timeslots
      }
    });
  };

  bookEvent = arg => {
    // console.log("create booking");
    // console.log(this.state.calendarEvents);
    // console.log(arg.event.title);
    let eventId = Number(arg.event.id);
    
    let events = [...this.state.calendarEvents];

    let newEvents = [];
    for (let event of events) {
      let newEvent = {...event}
      if (event.id === eventId) {
        newEvent = {
          ...event,
          title: "Booking Request",
          backgroundColor: "green",
          borderColor: "green"
        };
      }
      newEvents.push(newEvent)
    }

    // console.log(events);

    this.setState({
      calendarEvents: newEvents
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
          // eventRender={e => console.log(e.event)}
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
