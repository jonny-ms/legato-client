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
      <div>
        Who is the best teacher? {items.first_name} {items.last_name}
      </div>
    </div>
  );
};

export default Home;
