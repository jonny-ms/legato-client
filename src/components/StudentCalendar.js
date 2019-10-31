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

  calendarRef = React.createRef();

  getCalendarEvents = () => {
    // TODO: Dynamically set which teacher's calendar is requested
    axios(`/api/students/1`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      let loadedEvents = [];
      console.log("in students", data)
      for (let i in data) {
        const startTime = data[i].datetime;
        
        if (!data[i].is_booked) {
          loadedEvents.push({
            title: "Pending lessons",
            start: moment(startTime).toDate(),
            end: moment(startTime)
              .add(30, "m")
              .toDate(),
            id: data[i].id,
            backgroundColor: "orange",
            borderColor: "orange"
          }); 
        } else {
          loadedEvents.push({
            title: "Lessons",
            start: moment(startTime).toDate(),
            end: moment(startTime)
              .add(30, "m")
              .toDate(),
            id: data[i].id,
            backgroundColor: "green",
            borderColor: "green"
          }); 
        }
      }

      this.setState({
        calendarEvents: loadedEvents
      })

    });
  }

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

export default CalendarForBooking;