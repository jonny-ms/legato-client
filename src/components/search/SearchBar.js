import React, { useState } from "react";
import Results from "./Results";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");
  const [level, setLevel] = useState("Select")

  const instruments = [
    'Select',
    'Accordion',
    'Bassoon',
    'Cello',
    'Clarinet',
    'Double bass',
    'Drums',
    'Euphonium',
    'Flute',
    'French horn',
    'Guitar',
    'Harp',
    'Harpsichord',
    'Oboe',
    'Organ',
    'Percussion',
    'Piano',
    'Recorder',
    'Saxophone',
    'Speech arts and drama',
    'Trombone',
    'Trumpet',
    'Tuba',
    'Viola',
    'Violin',
    'Voice'
  ]

  const levels = [
    'Select',
    'Beginner',
    'Intermediate',
    'Advance'
  ]

  
  let filteredNames = props.teachers.filter(function(teacher) {
    let check = false;
    if (!teacher.first_name.includes(name) 
    || !teacher.courses.some(course => course.instrument === instrument)
    || !teacher.courses.some(course => course.level === level)
    ) {
      if (instrument !== "Select" && level !== "Select") {
        return false
      }
    }
    if (instrument === "Select" || level === "Select") {
      check = true
    } else if (teacher.courses.some(course => course.instrument === instrument)) {
      check = true
    } else if (teacher.courses.some(course => course.level === level)) {
      check = true
    } else {
      check = false
    }
    return check
      
  })
  
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
          {instruments.map((instrument) => {
            return <option>{instrument}</option>
          })}
        </select>

        <select onChange={e => setLevel(e.target.value)}>
          {levels.map((level) => {
            return <option>{level}</option>
          })}
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
