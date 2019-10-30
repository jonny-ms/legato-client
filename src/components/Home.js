import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./search/SearchBar";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [user, setUser] = useState({});

  const fetchItems = async () => {
    const data = await axios("/api/teachers", { withCredentials: true });

    setTeachers(data.data.teachers);
    const user = data.data.user
    user.type = data.data.type
    setUser(user)
  };
  console.log(user)

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <p>Home</p>
      { user && <p>{user.type} {user.first_name}</p>} 
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
