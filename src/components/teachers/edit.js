import React from "react";
import axios from "axios";
import EditProfile from "./EditProfile"

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

      < EditProfile />
      
    </div>
  );
};

export default EditTeacher;
