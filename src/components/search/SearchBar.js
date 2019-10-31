import React, { useState } from "react";

import TeacherListItem from "./TeacherListItem";

import {
  isTeacherNameIncluded,
  isLevelIncluded,
  isInstrumentIncluded,
  isRateIncluded
} from "./helpers/isIncluded";

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

  let filteredTeachers = props.teachers.filter(function(teacher) {
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

  // console.log("props", props);

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
        {instruments.map((instrument, i) => {
          return <option key={i}>{instrument}</option>;
        })}
      </select>

      <select onChange={e => setLevel(e.target.value)}>
        {levels.map((level, i) => {
          return <option key={i}>{level}</option>;
        })}
      </select>

      <div>
        <ul>
          {filteredTeachers.map((teacher, i) => (
            <TeacherListItem key={i} teacher={teacher} />
          ))}
        </ul>
      </div>
    </section>
  );
}
