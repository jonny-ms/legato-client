import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

const moment = require("moment");

// ========= BUGS ============
// Student does not get notified if a teacher cancels a lesson

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
      const lessons = JSON.parse(data.lessons);
      let loadedEvents = [];
      for (let i in lessons) {
        const timeslot = lessons[i].timeslots;
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
            id: lessons[i].id,
            backgroundColor: "orange",
            borderColor: "orange"
          });
        } else {
          loadedEvents.push({
            title: "Lessons",
            start: moment(startTime).toDate(),
            end: endTime,
            id: lessons[i].id,
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
          minTime={"06:00:00"}
          aspectRatio={1.83}
          allDaySlot={false}
          eventClick={this.requestBooking}
        />
      </Fragment>
    );
  }
}

export default StudentCalendar;
