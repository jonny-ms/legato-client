import React from "react";
import axios from "axios";

const NewTeacher = () => {
  const newTeacher = () => {
    axios.post("http://localhost:3001/teachers", {
      first_name: "New teacher test"
    });
  };

  return (
    <div className="NewTeacher">
      <p>New Teacher</p>
      <div>This is the new teacher form</div>
      <div>This will have a form to create a new teacher</div>
      <button onClick={newTeacher}>New Teacher</button>
    </div>
  );
};

export default NewTeacher;
