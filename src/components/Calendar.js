import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

const moment = require("moment");

// List of Todos
// stop teacher from dragging booking requests or booked
// stop teacher from deleting booking request or booked

class Calendar extends Component {
  state = {
    calendarEvents: [],
    coruses: {},
    maxIDFromServer: 0,
    maxID: 0
  };

  getCalendarEvents = () => {
    Promise.all([
      axios(`/api/timeslots`, {
        method: "get",
        withCredentials: true
      }),
      axios("/api/courses", {
        method: "get",
        withCredentials: true
      })
    ]).then(all => {
      const timeslots = all[0].data;
      const rawCourses = all[1].data;
      let courses = {};
      for (let course of rawCourses) {
        const courseName = course.instrument + " - " + course.level;
        courses[courseName] = course.id;
      }
      let loadedEvents = [];
      let maxID = 0;
      for (let i in timeslots) {
        if (maxID < timeslots[i].id) {
          maxID = timeslots[i].id;
        }
        const startTime = timeslots[i].datetime;
        let title = "";
        let backgroundColor = "";
        let borderColor = "";
        if (timeslots[i].lesson_id && timeslots[i].is_booked) {
          title = "Booked";
          backgroundColor = "Green";
          borderColor = "Green";
        } else if (timeslots[i].lesson_id) {
          title = "Booking Request";
          backgroundColor = "Orange";
          borderColor = "Orange";
        } else {
          title = "Available";
        }
        loadedEvents.push({
          id: timeslots[i].id,
          title,
          start: moment(startTime).toDate(),
          end: moment(startTime)
            .add(30, "m")
            .toDate(),
          backgroundColor: backgroundColor,
          borderColor: borderColor
        });
      }
      // console.log(loadedEvents);
      this.setState({
        calendarEvents: loadedEvents,
        courses: courses,
        maxIDFromServer: maxID,
        maxID: ++maxID
      });
    });

    // axios(`/api/timeslots`, {
    //   method: "get",
    //   withCredentials: true
    // }).then(({ data }) => {
    //   let loadedEvents = [];
    //   let maxID = 0;
    //   for (let i in data) {
    //     if (maxID < data[i].id) {
    //       maxID = data[i].id;
    //     }
    //     const startTime = data[i].datetime;
    //     let title = "";
    //     let backgroundColor = "";
    //     let borderColor = "";
    //     if (data[i].lesson_id && data[i].is_booked) {
    //       title = "Booked";
    //       backgroundColor = "Green";
    //       borderColor = "Green";
    //     } else if (data[i].lesson_id) {
    //       title = "Booking Request";
    //       backgroundColor = "Orange";
    //       borderColor = "Orange";
    //     } else {
    //       title = "Available";
    //     }
    //     loadedEvents.push({
    //       id: data[i].id,
    //       title,
    //       start: moment(startTime).toDate(),
    //       end: moment(startTime)
    //         .add(30, "m")
    //         .toDate(),
    //       backgroundColor: backgroundColor,
    //       borderColor: borderColor
    //     });
    //   }
    //   // console.log(loadedEvents);
    //   this.setState({
    //     calendarEvents: loadedEvents,
    //     maxIDFromServer: maxID,
    //     maxID: ++maxID
    //   });
    // });
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

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
    let newMaxID = this.state.maxID;

    this.setState({
      calendarEvents: this.state.calendarEvents.concat({
        id: newMaxID,
        title: "Available",
        start: arg.start,
        end: arg.end
      }),
      maxID: ++newMaxID
    });
    // this.setState({ maxID: newMaxID++ });
    console.log(this.state);
  };

  handleDrop = arg => {
    const id = Number(arg.oldEvent.id);

    let events = this.state.calendarEvents.map(event => {
      if (event.id === id) {
        event.start = arg.event.start;
        event.end = arg.event.end;
      }
      return event;
    });
    // let events = this.state.calendarEvents;

    // events[id].start = arg.event.start;
    // events[id].end = arg.event.end;

    this.setState({
      calendarEvents: events
    });
    console.log(this.state.calendarEvents);
  };

  handleResize = arg => {
    const id = Number(arg.prevEvent.id);
    let events = this.state.calendarEvents;

    events = events.map(event => {
      if (event.id === id) {
        event.start = arg.event.start;
        event.end = arg.event.end;
      }
      return event;
    });

    // console.log(events);

    this.setState({
      calendarEvents: events
    });
    // console.log(this.state.calendarEvents);
  };

  removeEvent = arg => {
    const id = Number(arg.event.id);
    let events = this.state.calendarEvents;
    if (arg.event.title === "Booking Request") {
      if (confirm("Do you want to accept the booking?")) {
        // console.log("Accepted");

        events = events.map(event => {
          if (event.id === id) {
            let newEvent = {
              ...event,
              title: "Accepted",
              backgroundColor: "Green",
              borderColor: "Green"
            };
            return newEvent;
          }
          return event;
        });
        this.setState({
          calendarEvents: events
        });
        // console.log(events);
        // console.log(this.state);

        axios(`/api/timeslots/${id}`, {
          method: "put",
          withCredentials: true,
          data: {
            timeslot: id
          }
        });
      } else {
        console.log("rejected");
        // modify state so booking is rejected - returned to available
      }
    } else if (arg.event.title === "Booked" || arg.event.title === "Accepted") {
      // console.log("NOPE");
    } else {
      console.log(this.state);
      events = events.filter(event => {
        return event.id !== id;
      });

      // for (let i in events) {
      // events[i].id = Number(i);
      // }

      this.setState({
        calendarEvents: events
      });

      // console.log("new state -->", this.state);
      // console.log("arg.event.id -->", id);
      if (id <= this.state.maxIDFromServer) {
        // console.log("delete event on server");
        axios(`/api/timeslots/${id}`, {
          method: "delete",
          withCredentials: true,
          data: {
            timeslot: id
          }
        });
      }
    }
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
    // console.log("hey look here!!!", timeslots);
    axios(`/api/timeslots`, {
      method: "post",
      withCredentials: true,
      data: {
        timeslot: timeslots
      }
    });
  };

  render() {
    return (
      <Fragment>
        <button onClick={this.submitTimeSlots}>Submit</button>
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
      </Fragment>
    );
  }
}

export default Calendar;
