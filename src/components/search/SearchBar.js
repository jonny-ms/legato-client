import React, { useState } from "react";
import Results from "./Results";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");
  const [level, setLevel] = useState("Select");
  const [rate, setRate] = useState("");

  const instruments = [
    "Select",
    "Accordion",
    "Bassoon",
    "Cello",
    "Clarinet",
    "Double bass",
    "Drums",
    "Euphonium",
    "Flute",
    "French horn",
    "Guitar",
    "Harp",
    "Harpsichord",
    "Oboe",
    "Organ",
    "Percussion",
    "Piano",
    "Recorder",
    "Saxophone",
    "Speech arts and drama",
    "Trombone",
    "Trumpet",
    "Tuba",
    "Viola",
    "Violin",
    "Voice"
  ];

  const levels = ["Select", "Beginner", "Intermediate", "Advance"];

  function isTeacherNameIncluded(teacherName, teacher) {
    let fullName = `${teacher.first_name} ${teacher.last_name}`;
    if (!teacherName) {
      return true;
    }
    if (fullName.toUpperCase().includes(teacherName.toUpperCase())) {
      return true;
    }
    return false;
  }

  function isLevelIncluded(level, teacher) {
    if (level === "Select") {
      return true;
    }
    if (teacher.courses.some(course => course.level === level)) {
      return true;
    }
    return false;
  }

  function isInstrumentIncluded(instrument, teacher) {
    if (instrument === "Select") {
      return true;
    }
    if (teacher.courses.some(course => course.instrument === instrument)) {
      return true;
    }
    return false;
  }

  function isRateIncluded(rate, teacher) {
    if (!rate) {
      return true;
    }
    if (teacher.courses.some(course => course.rate <= rate)) {
      return true;
    }
    return false;
  }

  let filteredNames = props.teachers.filter(function(teacher) {
    let check = false;
    if (
      isTeacherNameIncluded(name, teacher) &&
      isLevelIncluded(level, teacher) &&
      isInstrumentIncluded(instrument, teacher) &&
      isRateIncluded(rate, teacher)
    ) {
      check = true;
    }
    return check;
  });
  console.log("filteredNames: ", filteredTeachers);

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
        <input
          className="radius"
          spellCheck="false"
          placeholder="Set Rate"
          name="search"
          type="text"
          onChange={event => setRate(event.target.value)}
        />
      </form>

      <select onChange={e => setInstrument(e.target.value)}>
        {instruments.map(instrument => {
          return <option>{instrument}</option>;
        })}
      </select>

      <select onChange={e => setLevel(e.target.value)}>
        {levels.map(level => {
          return <option>{level}</option>;
        })}
      </select>

      <div>
        <ul>
          {filteredTeachers.map((name, i) => (
            <Results key={i} teacher={name} />
          ))}
        </ul>
      </div>
    </section>
  );
}
