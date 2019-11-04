import React, { Component, Fragment } from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

import axios from "axios";

import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";
import { green, purple, red, orange } from "@material-ui/core/colors";

import PendingLessonStudent from "./PendingLessonStudent";
import LessonStudent from "./LessonStudent";

const moment = require("moment");

// ========= BUGS ============
// Student does not get notified if a teacher cancels a lesson

class StudentCalendar extends Component {
  state = {
    calendarEvents: [],
    courses: [],
    teachers: [],
    lessons: [],
    course_id: null,
    showLesson: false,
    showPendingLesson: false,
    showTeacher: "",
    startDay: 4,
    mobile: false
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
            title: "Pending Lesson",
            start: moment(startTime).toDate(),
            end: endTime,
            id: lessons[i].id,
            backgroundColor: "orange",
            borderColor: "orange"
          });
        } else {
          loadedEvents.push({
            title: "Lesson",
            start: moment(startTime).toDate(),
            end: endTime,
            id: lessons[i].id,
            backgroundColor: "green",
            borderColor: "green"
          });
        }
      }

      let mobile = false;
      if (window.innerWidth < 680) {
        mobile = true;
      }

      let startDay = moment().isoWeekday();

      this.setState({
        calendarEvents: loadedEvents,
        courses,
        teachers,
        lessons,
        startDay,
        mobile
      });
    });
  };

  handleEventClick = arg => {
    const lessonID = Number(arg.event.id);
    const teachers = this.state.teachers;
    const courses = this.state.courses;
    const lessons = this.state.lessons;

    var tempLesson = lessons.find(lesson => {
      return lesson.id === lessonID;
    });

    const course = courses.find(course => {
      return course.id === tempLesson.course_id;
    });

    const teacher = teachers.find(teacher => {
      return teacher.id === course.teacher_id;
    });

    const teacherName = teacher.first_name + " " + teacher.last_name;
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
          showLesson: false,
          showTeacher: teacherName,
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
          showPendingLesson: false,
          showTeacher: teacherName,
          showCourse: courseName,
          showTime: startTime,
          currentLessonID: lessonID
        });
      }
    }
  };

  cancelLesson = id => {
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
        showLesson: false
      });
    });
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
              teacher={this.state.showTeacher}
              course={this.state.showCourse}
              time={this.state.showTime}
              currentLessonID={this.state.currentLessonID}
              cancelLesson={this.cancelLesson}
            />
          )}
          {this.state.showLesson && (
            <LessonStudent
              teacher={this.state.showTeacher}
              course={this.state.showCourse}
              time={this.state.showTime}
              currentLessonID={this.state.currentLessonID}
              cancelLesson={this.cancelLesson}
            />
          )}
        </div>
        <Card elevation={4}>
          <CardContent>
            {this.state.mobile && (
              <FullCalendar
                events={this.state.calendarEvents}
                defaultView="timeGrid"
                header={{
                  left: "prev today",
                  right: "next"
                }}
                plugins={[timeGridPlugin, interactionPlugin]}
                minTime={"08:00:00"}
                aspectRatio={0.6}
                allDaySlot={false}
                eventClick={this.handleEventClick}
              />
            )}
            {!this.state.mobile && (
              <FullCalendar
                events={this.state.calendarEvents}
                defaultView="timeGridWeek"
                header={{
                  left: "prev today",
                  center: "title",
                  right: "next"
                }}
                plugins={[timeGridPlugin, interactionPlugin]}
                firstDay={this.state.startDay}
                minTime={"08:00:00"}
                aspectRatio={1.8}
                allDaySlot={false}
                eventClick={this.handleEventClick}
              />
            )}
          </CardContent>
        </Card>
      </Fragment>
    );
  }
}

export default StudentCalendar;
