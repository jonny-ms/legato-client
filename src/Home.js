import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

const Home = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchItems = async () => {
    const data = await axios.get("/api/teachers");

    console.log(data.data);

    setTeachers(data.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <p>Home</p>
      <div>This is the home page</div>
      <div>
        This will lead to -login -register -create new teacher account -create
        new student account
      </div>
      <div>Teacher List:</div>
      {teachers.map(teacher => (
        <div>
          {teacher.first_name}, {teacher.last_name}
        </div>
      ))}
    </div>
  );
};

export default Home;
