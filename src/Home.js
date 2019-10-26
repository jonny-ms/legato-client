import React, { useState, useEffect } from "react";
import "./App.css";

const Home = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("http://172.46.1.121:3001");

    const items = await data.json();
    console.log(items[0]);
    setItems(items);
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
    </div>
  );
};

export default Home;
