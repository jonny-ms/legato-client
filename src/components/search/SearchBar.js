import React, { useState } from "react";

import TeacherListItem from "./TeacherListItem";

import GridList from "@material-ui/core/GridList";
import { makeStyles } from "@material-ui/core/styles";

import {
  isTeacherNameIncluded,
  isLevelIncluded,
  isInstrumentIncluded,
  isRateIncluded
} from "./helpers/isIncluded";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper
  },
  gridList: {
    width: 500,
    height: 450
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)"
  }
}));

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");
  const [level, setLevel] = useState("Select");
  const [rate, setRate] = useState("");
  // console.log("props from SearchBar.js: ", props);

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

  const levels = ["Select", "Beginner", "Intermediate", "Advanced"];

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

  // console.log("props from SearchBar.js: ", props);

  // console.log("props", props);

  const classes = useStyles();

  return (
    <div className="search">
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
        <div className={classes.root}>
          {filteredTeachers.map((teacher, i) => (
            <GridList key={i} cellHeight={180}>
              <TeacherListItem
                key={i}
                teacher={teacher}
                setTrigger={props.setTrigger}
              />
            </GridList>
          ))}
        </div>
      </div>
    </div>
  );
}
