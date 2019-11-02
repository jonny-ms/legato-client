import React from "react";

const LessonTeacher = props => {
  console.log(props);

  return (
    <div>
      <span>
        You have a {props.course} lesson with {props.student} on {props.time}!
      </span>
      <button onClick={() => props.cancelLesson(props.currentLessonID)}>
        Cancel Lesson
      </button>
    </div>
  );
};

export default LessonTeacher;
