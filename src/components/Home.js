import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import SearchBar from "./search/SearchBar";
import TeacherDay from "./teachers/scheduleDay";

const Home = () => {
  const [teachers, setTeachers] = useState([]);
  const [user, setUser] = useState({});

  const fetchItems = async () => {
    const data = await axios("/api/teachers", { withCredentials: true });
    // console.log("data", JSON.parse(data.data.teachers));

    setTeachers(JSON.parse(data.data.teachers));
    const user = data.data.user;
    user.type = data.data.type;
    setUser(user);
    // setTeachers(data.data);
  };
  // console.log(user);

  const TeacherContext = React.createContext(teachers);

  const teacherData = useContext(TeacherContext);
  // console.log(teacherData);

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="App">
      <p>Home</p>
      {user && (
        <p>
          {user.type} {user.first_name}
        </p>
      )}
      <div>This is the home page</div>
      <div>
        This will lead to -login -register -create new teacher account -create
        new student account
      </div>
      <div>
        <SearchBar teachers={teachers} />
      </div>
    </div>
  );
};

export default Home;
