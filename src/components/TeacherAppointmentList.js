import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const parseLoadedEvents = (courses, students) => {
  // Parse the courses into lesson cards
  let loadedLessons = [];
  for (let course of courses) {
    const lessons = course.lessons;
    for (let i in lessons) {
      const timeslots = lessons[i].timeslots;
      const startTime = moment(timeslots[0].datetime).format(
        "dddd, MMMM Do YYYY, h:mm a"
      );
      const studentID = lessons[i].student_id;
      const student = students.find(student => student.id === studentID);

      const confirmed = timeslots[0].is_booked;
      const future = new Date(timeslots[0].datetime).getTime() > Date.now();

      // What I need: student, pending, starttime, instrument, level, lessonID

      loadedLessons.push({
        id: lessons[i].id,
        title: confirmed ? "Lesson" : "Pending Lesson",
        start: startTime,
        has_paid: lessons[i].has_paid,
        confirmed,
        future,
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
            <div key={lesson.id}>
              <span>
                You have a {lesson.title} teaching {lesson.level}{" "}
                {lesson.instrument} with {lesson.student.first_name}{" "}
                {lesson.student.last_name} on {lesson.start}
              </span>
              {!lesson.has_paid && !lesson.future && <button>Get Paid</button>}
              {!lesson.confirmed && <button>Confirm</button>}
              {!lesson.confirmed && <button>Reject</button>}
              {lesson.confirmed && lesson.future && <button>Cancel</button>}
            </div>
          );
      })}
      {/* <span>
        You have a {props.course} lesson with {props.student} on {props.time}!
      </span> */}
      {/* <button onClick={() => props.cancelLesson(props.currentLessonID)}>
        Cancel Lesson
      </button> */}
    </div>
  );
};

export default TeacherAppointmentList;
