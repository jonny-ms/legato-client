import React, { useState } from "react";
import Results from "./Results";
import "./SearchBar.css"

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");

  
  let filteredNames = props.teachers.filter(function(teacher) {
    // console.log(teacher)
    let check = false;
    if (!teacher.first_name.includes(name)) {
      return false
    }
    if (instrument == "Select") {
      check = true
    } else if (teacher.courses.some(course => course.instrument === instrument)) {
      check = true
    } else {
      check = false
    }
    return  check
      
  })
  
  // let filteredCourse = props.teachers.filter(teacher => {
  //   for (const course of teacher.courses) {
  //     if (instrument === course.instrument) {
  //       return true
  //     }
  //   }
  //   return false
  // })





  return (
    <section className="search">
      <form className="search__form" onSubmit={event => event.preventDefault()}>
        <input
          className="radius"
          spellCheck="false"
          placeholder="Search Teachers"
          name="search"
          type="text"
          onChange={event => setName(event.target.value)}
        />
      </form>

        <select onChange={e => setInstrument(e.target.value)}>
          <option>Select</option>
          <option>Piano</option>
          <option>Flute</option>
          <option>Drums</option>
        </select>

      <div>
        <ul>
          {filteredNames.map((name, i) => (
            <Results key={i} teacher={name} />
          ))}
        </ul>
      </div>
    </section>
  );
}
