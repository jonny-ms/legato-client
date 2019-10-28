import React, { useState} from "react";
import Results from "./Results";



export default function SearchBar(props) {
  const [filter, setFilter] = useState("");

  
  let filteredTeachers = props.teachers.filter(function(teacher) {

    let filtered

    return teacher.first_name.includes(filter)
  })
  
  console.log(props.teachers[0])
  
  // console.log(filteredTeachers);

  return (
    <section className="search">
      <form className="search__form" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Teachers"
          name="search"
          type="text"
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
