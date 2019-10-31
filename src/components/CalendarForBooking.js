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
    calendarEvents: [],
    courses: {},
    course_id: null
  };

  // const courses = [

  // ]

  calendarRef = React.createRef();

  getCalendarEvents = () => {
    // TODO: Dynamically set which teacher's calendar is requested
    axios(`/api/teachers/3`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      let loadedEvents = [];
      // create calendar events for timeslots
      console.log("LOOK HERE", data)
      for (let i in data.timeslots) {
        
        const startTime = data.timeslots[i].datetime;
        loadedEvents.push({
          title: "Available",
          start: moment(startTime).toDate(),
          end: moment(startTime)
            .add(30, "m")
            .toDate(),
          id: data.timeslots[i].id
        }); 
      }

      for (let i in data.lessons) {
        
        const startTime = data.lessons[i].datetime;
        
        if (!data.lessons[i].is_booked) {
          loadedEvents.push({
            title: "Pending lessons",
            start: moment(startTime).toDate(),
            end: moment(startTime)
              .add(30, "m")
              .toDate(),
            id: data.lessons[i].id,
            backgroundColor: "orange",
            borderColor: "orange"
          }); 
        } else {
          loadedEvents.push({
            title: "My lessons",
            start: moment(startTime).toDate(),
            end: moment(startTime)
              .add(30, "m")
              .toDate(),
            id: data.lessons[i].id,
            backgroundColor: "green",
            borderColor: "green"
          }); 

        }
      }
      // console.log(loadedEvents);
      // Create courses
      // console.log(data.courses)
      let courses = {};
      for (let course of data.courses) {
        // console.log(course)
        const courseName = course.instrument + " - " + course.level;
        courses[courseName] = course.id;
      }
      // console.log(courses)
      this.setState({
        calendarEvents: loadedEvents,
        courses: courses
      });
    });
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

  submitBookings = e => {
    // Send requested bookings to server
    e.preventDefault();
    const events = this.state.calendarEvents;
    const timeslotInMilliseconds = 1000 * 60 * 30;

    let timeslots = [];
    for (let event of events) {
      const numberOfTimeslots =
        (event.end - event.start) / timeslotInMilliseconds;
      for (let i = 0; i < numberOfTimeslots; i++) {
        const newTimeslot = event.id;
        // Only send timeslots which have a booking request
        if (event.title === "Booking Request") {
          // TODO: Check if timeslots are next to each other and send as one lesson
          timeslots.push(newTimeslot);
        }
      }
    }
    // console.log(timeslots);
    // console.log(this.state.course_id);
    axios(`/api/lessons`, {
      method: "post",
      withCredentials: true,
      data: {
        lesson: {
          timeslots,
          course_id: this.state.course_id
        }
      }
    });
  };

  requestBooking = arg => {
    let eventId = Number(arg.event.id);
    let events = [...this.state.calendarEvents];
    let newEvents = [];

    // Must create a new instance for state to update
    for (let event of events) {
      let newEvent = { ...event };
      if (event.id === eventId) {
        newEvent = {
          ...event,
          title: "Booking Request",
          backgroundColor: "green",
          borderColor: "green"
        };
      }
      newEvents.push(newEvent);
    }

    this.setState({
      calendarEvents: newEvents
    });

    // console.log(this.state);
  };

  render() {
    return (
      <Fragment>
        {/* <select onChange={e => this.setState({course_id: e.target.value})}>
          {courses.map((course) => {
            return <option>{course}</option>
          })}
        </select> */}
        <select
          onChange={e =>
            this.setState({ course_id: this.state.courses[e.target.value] })
          }
        >
          <option>Select a course</option>
          {Object.keys(this.state.courses).map(course => {
            return <option>{course}</option>;
          })}
        </select>
        <button onClick={this.submitBookings}>Submit</button>
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
          eventClick={this.requestBooking}
        />
      </Fragment>
    );
  }
}

export default CalendarForBooking;
