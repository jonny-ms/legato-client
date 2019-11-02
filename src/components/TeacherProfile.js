import React from "react";

export default function TeacherProfile(props) {
  // console.log("props from TeacherProfile.js :", props);

  const teacher = props.teacher[0];
  console.log("teacher from TeacherProfile.js: ", teacher);
  return (
    <div>
      <img src={teacher.profile_pic} alt={"hee"}></img>
      <h2>{`${teacher.first_name} ${teacher.last_name}`}</h2>

      <div>
        <h4>{teacher.bio}</h4>
      </div>
    </div>
  );
}
