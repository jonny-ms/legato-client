import React, { useState, useEffect } from "react";

import TeacherListItem from "./TeacherListItem";
import VideoListItem from "./VideoListItem"

import {
  isTeacherNameIncluded,
  isLevelIncluded,
  isInstrumentIncluded,
  isRateIncluded,
} from "./helpers/isIncluded";

export default function SearchBar(props) {
  const [name, setName] = useState("");
  const [instrument, setInstrument] = useState("Select");
  const [level, setLevel] = useState("Select");
  const [rate, setRate] = useState("");

  const [isVideo, setIsVideo] = useState(false)
  const [isProfile, setIsProfile] = useState(true)

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

  const searchByVideo = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsProfile(false);
    setIsVideo(true);   
  }

  const searchByProfile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVideo(false);
    setIsProfile(true);
  }

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
      
      <button type="submit" onClick={(e) => searchByProfile(e)}>Profiles</button>
      <button type="submit" onClick={(e) => searchByVideo(e)}>Videos</button>
      
      {isVideo &&
        <div>
          <ul>

            {filteredTeachers.map((teacher) => (
              teacher.videos &&
                teacher.videos.filter(video => {
                  if (instrument !== "Select" && level !== "Select") {
                    if (video.instrument === instrument && video.level === level) return video
                  } else if (instrument === "Select") {
                    if (video.level === level || level === "Select") return video
                  } else if (level === "Select") {
                  if (video.instrument === instrument || instrument === "Select") return video
                  }
                })
                .map((video, i) => (
                  <VideoListItem key={i} video={video} teacher={teacher} />
                ))
            ))}

          </ul>
        </div>
      }

      {isProfile &&
        <div>
          <ul>
            {filteredTeachers.map((teacher, i) => (
              <TeacherListItem key={i} teacher={teacher} />
            ))}
          </ul>
        </div>
      }
      
    </section>
  );
}
