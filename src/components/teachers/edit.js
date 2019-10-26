import React from "react";
import axios from "axios";

const EditTeacher = () => {
  const editTeacher = () => {
    axios.put("http://172.46.1.121:3001/teachers", {
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
