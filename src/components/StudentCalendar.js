import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

const moment = require("moment");

class StudentCalendar extends Component {
  state = {
    calendarEvents: [],
    courses: {},
    course_id: null
  };

  calendarRef = React.createRef();

  getCalendarEvents = () => {
    axios(`/api/lessons`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      const parsedLessons = JSON.parse(data.lessons);
      let loadedEvents = [];
      console.log("in students", parsedLessons);
      console.log(data.courses);
      for (let i in parsedLessons) {
        const timeslot = parsedLessons[i].timeslots;
        const startTime = timeslot[0].datetime;

        const lastTimeslot = timeslot[timeslot.length - 1];
        const endTime = moment(lastTimeslot.datetime)
          .add(30, "m")
          .toDate();

        if (!timeslot[0].is_booked) {
          loadedEvents.push({
            title: "Pending lessons",
            start: moment(startTime).toDate(),
            end: endTime,
            id: parsedLessons[i].id,
            backgroundColor: "orange",
            borderColor: "orange"
          });
        } else {
          loadedEvents.push({
            title: "Lessons",
            start: moment(startTime).toDate(),
            end: endTime,
            id: parsedLessons[i].id,
            backgroundColor: "green",
            borderColor: "green"
          });
        }
      }

      this.setState({
        calendarEvents: loadedEvents
      });
    });
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

  render() {
    return (
      <Fragment>
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

export default StudentCalendar;
