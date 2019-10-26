import React, { useState, useEffect } from "react";
import axios from "axios";

const NewTeacher = () => {
  const [items, setItems] = useState([]);

  const newTeacher = () => {
    axios.post("http://172.46.1.121:3001/teachers", {
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
