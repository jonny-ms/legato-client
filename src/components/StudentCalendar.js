import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listWeekPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

import PendingLessonStudent from "./PendingLessonStudent";
import LessonStudent from "./LessonStudent";

const moment = require("moment");

// ========= BUGS ============
// Student does not get notified if a teacher cancels a lesson

class StudentCalendar extends Component {
  state = {
    calendarEvents: [],
    courses: {},
    course_id: null,
    showLesson: false,
    showPendingLesson: false
  };

  calendarRef = React.createRef();

  getCalendarEvents = () => {
    axios(`/api/lessons`, {
      method: "get",
      withCredentials: true
    }).then(({ data }) => {
      const teachers = data.teachers;
      const courses = data.courses;
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

  handleEventClick = arg => {
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
        if (this.state.showLesson) {
          this.setState({
            showLesson: false
          });
        } else {
          this.setState({
            showLesson: true,
            showStudent: studentName,
            showCourse: courseName,
            showTime: startTime,
            currentLessonID: lessonID
          });
        }
      }
    } else if (arg.event.title === "Available") {
      events = events.filter(event => {
        return event.id !== lessonID;
      });

      this.setState({
        calendarEvents: events
      });

      // This won't work as intended if timeslotID and lessonID overlap
      if (lessonID <= this.state.maxIDFromServer) {
        axios(`/api/timeslots/${lessonID}`, {
          method: "delete",
          withCredentials: true,
          data: {
            timeslot: lessonID
          }
        });
      }
    }
  };

  componentDidMount() {
    this.getCalendarEvents();
  }

  render() {
    return (
      <Fragment>
        <div>
          {this.state.showPendingLesson && (
            <PendingLessonStudent
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
            <LessonStudent
              student={this.state.showStudent}
              course={this.state.showCourse}
              time={this.state.showTime}
              currentLessonID={this.state.currentLessonID}
              cancelLesson={this.cancelLesson}
            />
          )}
        </div>
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
          eventClick={this.handleEventClick}
        />
      </Fragment>
    );
  }
}

export default StudentCalendar;
