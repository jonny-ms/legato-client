import React, { useState } from "react";

export default function CoursesForm(props) {

  const [instrument, setInstrument] = useState("");
  const [level, setLevel] = useState("");
  const [rate, setRate] = useState(0);

  const instruments = [
    "Select",
    "Bassoon",
    "Cello",
    "Clarinet",
    "Double bass",
    "Drums",
    "Flute",
    "French horn",
    "Guitar",
    "Oboe",
    "Organ",
    "Percussion",
    "Piano",
    "Saxophone",
    "Trombone",
    "Trumpet",
    "Viola",
    "Violin",
    "Voice"
  ];

  const levels = ["Select", "Beginner", "Intermediate", "Advanced"];

  const addCourse = () => {
    e.preventDefault()
    // ! Hard coded
      axios(`/api/teachers/${3}`, {
        method: "put",
        withCredentials: true,
        data: {}
      }).then(() => {})
  }
  
  
  return(
    <form>
      <label>
        Instrument:
        <select onChange={e => setInstrument(e.target.value)}>
          {instruments.map((instrument, i) => {
            return <option key={i}>{instrument}</option>;
          })}
        </select>
        Level:
        <select onChange={e => setLevel(e.target.value)}>
          {levels.map((level, i) => {
            return <option key={i}>{level}</option>;
          })}
        </select>
        Rate:
        <input type="number" name="rate" value={rate} onChange={e => setRate(e.target.value)}/>
      </label>
        <button type="submit" onClick={(e) => addCourse(e)}>Add Course</button>
    </form>
  )
  
}