import React from "react";
import axios from "axios";

const EditTeacher = () => {
  const editTeacher = () => {
    axios.put("/api/teachers", {
      last_name: "last name"
    });
  };

  return (
    <div className="EditTeacher">
      <p>Edit Teacher</p>
      <div>This is the edit teacher form</div>
      <div>This will have a form to create the teachers profile</div>
      <button onClick={editTeacher}>Edit Teacher</button>
    </div>
  );
};

export default EditTeacher;
