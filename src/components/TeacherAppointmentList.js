import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";
import { green, orange } from "@material-ui/core/colors";

// const theme = createMuiTheme({
//   palette: {
//     primary: orange,
//     secondary: green
//   }
// });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
  },
  appointment: {
    margin: theme.spacing(2)
  },
  title: {
    textAlign: "left"
  },
  button: {
    variant: "contained",
    margin: theme.spacing(0.5)
  },
  buttonGrid: {
    alignItems: "center"
  }
}));

const parseLoadedEvents = (courses, students) => {
  // Parse the courses into lesson cards
  let loadedLessons = [];
  for (let course of courses) {
    const lessons = course.lessons;
    for (let i in lessons) {
      const timeslots = lessons[i].timeslots;
      const startTime = moment(timeslots[0].datetime).format(
        "dddd, MMMM Do [at] h:mm a"
      );
      const studentID = lessons[i].student_id;
      const student = students.find(student => student.id === studentID);

      const confirmed = timeslots[0].is_booked;
      const future = new Date(timeslots[0].datetime).getTime() > Date.now();

      let backgroundColor = "";
      if (!confirmed) {
        backgroundColor = "#ffcc80";
      }
      if (confirmed && !future && !lessons[i].has_paid) {
        backgroundColor = "#88dd88";
      }
      if (confirmed && future) {
        backgroundColor = "#2e9e2e";
      }

      // What I need: student, pending, starttime, instrument, level, lessonID

      loadedLessons.push({
        id: lessons[i].id,
        title: confirmed ? "lesson" : "pending lesson",
        start: startTime,
        has_paid: lessons[i].has_paid,
        confirmed,
        future,
        backgroundColor,
        level: course.level,
        instrument: course.instrument,
        student: student
      });
    }
  }

  console.log(loadedLessons);

  return loadedLessons;
};

const TeacherAppointmentList = () => {
  const [lessons, setLessons] = useState([]);
  const [students, setStudents] = useState([]);

  const [spacing, setSpacing] = useState(2);
  const classes = useStyles();

  const getCalendarEvents = () => {
    // Courses includes lessons and associated timeslots
    axios(`/api/courses`, {
      method: "get",
      withCredentials: true
    }).then(data => {
      const students = data.data.students;
      const courses = JSON.parse(data.data.courses);

      let loadedEvents = parseLoadedEvents(courses, students);

      setLessons(loadedEvents);
      setStudents(students);

      // console.log(loadedEvents);
      // console.log(courses);
    });
  };

  useEffect(() => {
    getCalendarEvents();
  }, []);

  return (
    <div>
      {lessons.map(lesson => {
        if (lesson.future || (lesson.confirmed && !lesson.has_paid))
          return (
            <Card
              className={classes.appointment}
              style={{ backgroundColor: lesson.backgroundColor }}
            >
              <CardContent>
                <Grid container direction="row">
                  <Grid item xs={8} sm={10}>
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                      variant="h5"
                    >
                      {lesson.student.first_name} {lesson.student.last_name}
                    </Typography>
                    <Typography variant="body2" component="p">
                      You have a {lesson.title} teaching {lesson.level}{" "}
                      {lesson.instrument} with {lesson.student.first_name}{" "}
                      {lesson.student.last_name} on {lesson.start}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    container
                    xs={4}
                    sm={2}
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center"
                    }}
                  >
                    <Grid item alignContent={"center"}>
                      {!lesson.confirmed && (
                        <Button
                          variant={"contained"}
                          className={classes.button}
                          style={{ backgroundColor: "green" }}
                        >
                          Confirm
                        </Button>
                      )}
                      {!lesson.confirmed && (
                        <Button
                          variant={"contained"}
                          className={classes.button}
                          style={{ backgroundColor: "orange" }}
                        >
                          Reject
                        </Button>
                      )}
                      {lesson.confirmed && lesson.future && (
                        <Button
                          variant={"contained"}
                          className={classes.button}
                          style={{ backgroundColor: "orange" }}
                        >
                          Cancel
                        </Button>
                      )}
                      {!lesson.has_paid && !lesson.future && (
                        <Button
                          variant={"contained"}
                          className={classes.button}
                          style={{ backgroundColor: "lightblue" }}
                        >
                          Get Paid
                        </Button>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
      })}
    </div>
  );
};

export default TeacherAppointmentList;
