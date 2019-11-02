import React, { Component, Fragment } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

import Lesson from "./Lesson";
import PendingLesson from "./PendingLesson";

const moment = require("moment");

// ======== BUGS ==========
// All to do with ids of events => when they are too low,
// they will be a problem, when they are higher, it should be ok

// When rejecting a pending booking, it also removes the availability with the same id from state
// When deleting an availability, it also removes the lesson with the same id from state
// Need to refresh when booking a second appointment even after hitting submit

class Calendar extends Component {
  state = {
    calendarEvents: [],
    courses: {},
    maxIDFromServer: 0,
    maxID: 0,
    showPendingLesson: false,
    showLesson: false,
    showStudent: "",
    showCourse: "",
    showTime: "",
    currentLessonID: null
  };

  getCalendarEvents = () => {
    Promise.all([
      axios(`/api/courses`, {
        method: "get",
        withCredentials: true
      }),
      axios(`/api/timeslots`, {
        method: "get",
        withCredentials: true
      })
    ]).then(all => {
      const students = all[0].data.students;
      // console.log(students);
      const courses = JSON.parse(all[0].data.courses);
      const timeslots = all[1].data;
      // console.log(timeslots);

      let loadedEvents = [];

      for (let course of courses) {
        const lessons = course.lessons;
        for (let i in lessons) {
          const timeslots = lessons[i].timeslots;
          const startTime = timeslots[0].datetime;

          const lastTimeslot = timeslots[timeslots.length - 1];
          const endTime = moment(lastTimeslot.datetime)
            .add(30, "m")
            .toDate();

          if (timeslots[0].is_booked) {
            loadedEvents.push({
              title: "Lesson",
              start: moment(startTime).toDate(),
              end: endTime,
              id: lessons[i].id,
              backgroundColor: "green",
              borderColor: "green"
              // student: students.find(student => {
              //   return student.id === lessons[i].student_id;
              // }).first_name
            });
          } else {
            loadedEvents.push({
              title: "Pending Lesson",
              start: moment(startTime).toDate(),
              end: endTime,
              id: lessons[i].id,
              backgroundColor: "orange",
              borderColor: "orange"
              // student: students.find(student => {
              //   return student.id === lessons[i].student_id;
              // }).first_name
            });
          }
        }
      }

      // let courses = {};
      // for (let course of rawCourses) {
      // const courseName = course.instrument + " - " + course.level;
      // courses[courseName] = course.id;
      // }
      let maxID = 0;
      for (let i in timeslots) {
        if (maxID < timeslots[i].id) {
          maxID = timeslots[i].id;
        }
        const startTime = timeslots[i].datetime;
        if (!timeslots[i].lesson_id) {
          loadedEvents.push({
            id: timeslots[i].id,
            title: "Available",
            start: moment(startTime).toDate(),
            end: moment(startTime)
              .add(30, "m")
              .toDate()
          });
        }
      }
      // console.log(loadedEvents);
      this.setState({
        calendarEvents: loadedEvents,
        courses,
        students,
        maxIDFromServer: maxID,
        maxID: ++maxID
      });
    });
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

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
    // console.log(this.state);
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
    const lessonID = Number(arg.event.id);
    let events = this.state.calendarEvents;

    if (arg.event.title !== "Available") {
      const students = this.state.students;
      const courses = this.state.courses;
      for (let course of courses) {
        var tempLesson = course.lessons.find(lesson => {
          return lesson.id === lessonID;
        });
        if (tempLesson) {
          break;
        }
      }
      const student = students.find(student => {
        return student.id === tempLesson.student_id;
      });
      const course = courses.find(course => {
        return course.id === tempLesson.course_id;
      });
      const studentName = student.first_name + " " + student.last_name;
      const courseName = course.level + " " + course.instrument;
      const startTime = moment(arg.event.start).format(
        "dddd, MMMM Do YYYY, h:mm a"
      );

      if (arg.event.title === "Pending Lesson") {
        if (this.state.showPendingLesson) {
          this.setState({
            showPendingLesson: false
          });
        } else {
          this.setState({
            showPendingLesson: true,
            showStudent: studentName,
            showCourse: courseName,
            showTime: startTime,
            currentLessonID: lessonID
          });
        }
      } else if (arg.event.title === "Lesson") {
        console.log("clicked on a lesson");
        if (this.state.showLesson) {
          console.log("I can see the lesson");
          this.setState({
            showLesson: false
          });
        } else {
          this.setState({
            showLesson: true,
            // showPendingLesson: true,
            showStudent: studentName,
            showCourse: courseName,
            showTime: startTime,
            currentLessonID: lessonID
          });
        }
      }
    } else if (arg.event.title === "Available") {
      console.log("remove event:", lessonID);
      events = events.filter(event => {
        return event.id !== lessonID;
      });

      // for (let i in events) {
      // events[i].id = Number(i);
      // }

      this.setState({
        calendarEvents: events
      });

      // console.log("new state -->", this.state);
      // console.log("arg.event.id -->", id);
      // if (lessonID <= this.state.maxIDFromServer) {
      //   // console.log("delete event on server");
      //   axios(`/api/timeslots/${lessonID}`, {
      //     method: "delete",
      //     withCredentials: true,
      //     data: {
      //       timeslot: lessonID
      //     }
      //   });
      // }
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

  acceptBooking = id => {
    console.log("accept booking in Calendar.js");
    console.log("id:", id);

    let events = this.state.calendarEvents;

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

    axios(`/api/lessons/${id}`, {
      method: "put",
      withCredentials: true,
      data: {
        timeslot: id
      }
    });

    this.setState({
      calendarEvents: events
    });
  };

  rejectBooking = id => {
    console.log("reject booking in Calendar.js");
    console.log("id:", id);

    let events = this.state.calendarEvents;

    events = events.filter(event => {
      return event.id !== id;
    });

    axios(`/api/lessons/${id}`, {
      method: "delete",
      withCredentials: true
    }).then(resp => {
      this.setState({
        calendarEvents: events,
        showPendingLesson: false
      });
    });
  };

  notNow = () => {
    this.setState({
      showPendingLesson: false
    });
  };

  cancelLesson = id => {
    console.log("delete this lesson", id);

    let events = this.state.calendarEvents;

    events = events.filter(event => {
      return event.id !== id;
    });

    // axios(`/api/lessons/${id}`, {
    //   method: "delete",
    //   withCredentials: true
    // }).then(resp => {
    //   this.setState({
    //     calendarEvents: events,
    //     showLesson: false
    //   });
    // });

    this.setState({
      calendarEvents: events,
      showLesson: false
    });
  };

  render() {
    return (
      <Fragment>
        {this.state.showPendingLesson && (
          <PendingLesson
            student={this.state.showStudent}
            course={this.state.showCourse}
            time={this.state.showTime}
            currentLessonID={this.state.currentLessonID}
            acceptBooking={this.acceptBooking}
            rejectBooking={this.rejectBooking}
            notNow={this.notNow}
          />
        )}
        {this.state.showLesson && (
          <Lesson
            student={this.state.showStudent}
            course={this.state.showCourse}
            time={this.state.showTime}
            currentLessonID={this.state.currentLessonID}
            cancelLesson={this.cancelLesson}
          />
        )}
        <button onClick={this.submitTimeSlots}>Submit Availabilities</button>
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
