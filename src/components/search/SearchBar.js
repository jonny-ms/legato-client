import React, { useState} from "react";
import Results from "./Results";



export default function SearchBar(props) {
  // const [value, setValue] = useState("");
  const [filter, setFilter] = useState("");

  console.log("teachers:", props.teachers)

  let filteredTeachers = props.teachers.filter(function(teacher) {
    return teacher.first_name.includes(filter)
  })

  console.log(filteredTeachers);


  // let filteredTeachers = props.teachers.filter(teacher => {
  //   return teacher.first_name.toUpperCase().includes(filter.toUpperCase())
  // });  

  return (
    <section className="search">
      <form className="search__form" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Teachers"
          name="search"
          type="text"
          // value={value}
          onChange={event => setFilter(event.target.value)}
        />
      </form>
    <div>
      <ul>
        {filteredTeachers.map((name, i) => (
          <Results teacher={name} />
        ))}
      </ul>
    </div>
    </section>
  );
}
