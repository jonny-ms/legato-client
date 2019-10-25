import React, { useState, useEffect } from "react";
import "./App.css";

const Search = () => {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");

    const items = await data.json();
    setItems(items);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="Search">
      <p>Search</p>
      <div>
        {items.map(item => {
          return <p key={item.id}>{item.title}</p>;
        })}
      </div>
    </div>
  );
};

export default Search;
