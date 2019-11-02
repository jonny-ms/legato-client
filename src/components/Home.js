import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./search/SearchBar";
import { isPropsEqual } from "@fullcalendar/core";

const Home = props => {
  const [teachers, setTeachers] = useState([]);
  // console.log("props from Home.js: ", props);
  // const [user, setUser] = useState({});

  const fetchItems = async () => {
    const data = await axios("/api/teachers", { withCredentials: true });
    // console.log("data", JSON.parse(data.data.teachers));

    setTeachers(JSON.parse(data.data.teachers));
    // const user = data.data.user;
    // user.type = data.data.type;
    // setUser(user);
    // setTeachers(data.data);
  };

  useEffect(() => {
    fetchItems();
  }, []);
  // console.log("user Home.js: ", user);

  return (
    <div className="App">
      <p>Home</p>

      <div>This is the home page</div>
      <div>
        This will lead to -login -register -create new teacher account -create
        new student account
      </div>
      <div>
        <SearchBar teachers={teachers} setTrigger={props.setTrigger} />
      </div>
    </div>
  );
};

export default Home;
