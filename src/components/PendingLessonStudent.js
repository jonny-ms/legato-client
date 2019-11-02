import React from "react";

const PendingLessonTeacher = props => {
  console.log(props);

  return (
    <div>
      <span>
        You have a {props.course} lesson with {props.teacher} on {props.time}?
      </span>
      <button onClick={() => props.cancelLesson(props.currentLessonID)}>
        Cancel
      </button>
    </div>
  );
};

export default PendingLessonTeacher;
