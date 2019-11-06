import React, { useState, useEffect } from "react";
import axios from "axios";

import SearchBar from "./search/SearchBar";
import Landing from "./Landing";

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
  return (
    <div className="App">
      <div>
        {!props.user.type && <Landing mobile={props.mobile} />}
        <SearchBar teachers={teachers} setTrigger={props.setTrigger} />
      </div>
    </div>
  );
};

export default Home;
