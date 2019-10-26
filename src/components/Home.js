import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./search/SearchBar";

const Home = () => {
  const [teachers, setTeachers] = useState([]);

  const fetchItems = async () => {
    const data = await axios.get("/api/teachers");

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
      <div>
        <SearchBar teachers={teachers} />
      </div>
      <div>
        <ul>{}</ul>
      </div>
      <div>Teacher List:</div>

      {teachers.map(teacher => (
        <div key={teacher.id}>
          {teacher.first_name}, {teacher.last_name}
        </div>
      ))}
    </div>
  );
};

export default Home;
