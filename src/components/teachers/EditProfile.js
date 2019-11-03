import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile(props) {
  const [id, setId] = useState(0);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState([]);
  const [instrument, setInstrument] = useState("");
  const [level, setLevel] = useState("");
  const [rate, setRate] = useState(0);
  const [url, setUrl] = useState("");
  const [videoInstrument, setVideoInstrument] = useState("");
  const [videoLevel, setVideoLevel] = useState("");
  const [error, setError] = useState("");

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

  const fetchTeacherInfo = () => {
    axios("/api/teachers/new", { withCredentials: true }).then(({ data }) => {
      const currentCourses = data.courses.filter(course => course.is_available);

      setId(data.id);
      setFirstName(data.first_name);
      setLastName(data.last_name);
      setEmail(data.email);
      setTagline(data.tagline);
      setBio(data.bio);
      setCourses(currentCourses);
    });
  };

  const addCourse = e => {
    e.preventDefault();
    e.stopPropagation();
    if (instrument && level && rate) {
      axios(`/api/courses`, {
        method: "post",
        withCredentials: true,
        data: {
          course: {
            teacher_id: id,
            instrument,
            level,
            rate
          }
        }
      }).then(() => {
        fetchTeacherInfo();
        setInstrument("");
        setLevel("");
        setRate(0);
      });
    } else {
      setError("Missing field");
    }
  };

  const destroyCourse = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    axios(`/api/courses/${id}`, {
      method: "put",
      withCredentials: true
    }).then(({ data }) => {
      console.log(data.status);
      if (data.status === 401) {
        setError("Cannot remove a course with future lessons.");
      } else {
        fetchTeacherInfo();
      }
    });
  };

  const editProfile = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    axios(`/api/teachers/${id}`, {
      method: "put",
      withCredentials: true,
      data: {
        teacher: {
          tagline,
          bio
        }
      }
    }).then(() => {
      fetchTeacherInfo();
    });
  };

  const addVideo = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    let videoId = url.split("v=")[1];
    const ampersandPosition = videoId.indexOf("&");
    if (ampersandPosition !== -1) {
      videoId = videoId.substring(0, ampersandPosition);
    }
    if (videoInstrument && videoLevel) {
      axios(`/api/videos`, {
        method: "post",
        withCredentials: true,
        data: {
          video: {
            teacher_id: id,
            file: videoId,
            instrument: videoInstrument,
            level: videoLevel
          }
        }
      }).then(() => {
        fetchTeacherInfo();
        setVideoInstrument("");
        setVideoLevel("");
        setUrl("");
      });
    } else {
      setError("Missing field");
    }
  };

  useEffect(() => {
    fetchTeacherInfo();
  }, []);

  return (
    <form>
      <label>
        First Name:
        <input type="text" name="firstName" value={firstName} readOnly />
      </label>
      <label>
        Last Name:
        <input type="text" name="lastName" value={lastName} readOnly />
      </label>
      <label>
        Email:
        <input type="text" name="email" value={email} readOnly />
      </label>
      <label>
        Tagline:
        <input
          type="text"
          name="tagline"
          value={tagline}
          onChange={e => setTagline(e.target.value)}
        />
      </label>
      <label>
        Bio:
        <input
          type="text"
          name="bio"
          value={bio}
          onChange={e => setBio(e.target.value)}
        />
      </label>
      {/* <label> */}
      {/* Certifications: */}
      {/* <input type="text" name="certifications" value={certification} onChange={e => setCertification(e.target.value)} /> */}
      {/* </label> */}

      {/* //!COURSES */}
      <label>
        Courses:
        {courses.map((course, i) => {
          return (
            <li key={i}>
              {course.level} {course.instrument} for {course.rate}$/hour
              {/* <label>
                  Instrument:
                <input type="text" name="instrument" value={course.instrument} readOnly />
                </label>
                <label>
                  Level:
                <input type="text" name="level" value={course.level} readOnly />
                </label>
                <label>
                  Rate:
                <input type="number" name="rate" value={course.rate} readOnly />
                </label> */}
              <button type="submit" onClick={e => destroyCourse(e, course.id)}>
                Remove Course
              </button>
            </li>
          );
        })}
        <label>
          Instrument:
          <select
            value={instrument}
            onChange={e => setInstrument(e.target.value)}
          >
            {instruments.map((instrument, i) => {
              return <option key={i}>{instrument}</option>;
            })}
          </select>
        </label>
        <label>
          Level:
          <select value={level} onChange={e => setLevel(e.target.value)}>
            {levels.map((level, i) => {
              return <option key={i}>{level}</option>;
            })}
          </select>
        </label>
        <label>
          Rate:
          <input
            type="number"
            name="rate"
            value={rate}
            onChange={e => setRate(e.target.value)}
          />
        </label>
        <button type="submit" onClick={e => addCourse(e)}>
          Add Course
        </button>
      </label>

      {/* //!VIDEOS */}

      <label>
        Youtube Videos:
        <label>
          Url:
          <input
            type="url"
            name="video"
            value={url}
            onChange={e => setUrl(e.target.value)}
          />
        </label>
        <label>
          Instrument:
          <select
            value={videoInstrument}
            onChange={e => setVideoInstrument(e.target.value)}
          >
            {instruments.map((instrument, i) => {
              return <option key={i}>{instrument}</option>;
            })}
          </select>
        </label>
        <label>
          Level:
          <select
            value={videoLevel}
            onChange={e => setVideoLevel(e.target.value)}
          >
            {levels.map((level, i) => {
              return <option key={i}>{level}</option>;
            })}
          </select>
        </label>
        <button type="submit" onClick={e => addVideo(e, id)}>
          Add Video
        </button>
      </label>

      {/* will travel */}
      {/* will host */}

      <button onClick={e => editProfile(e, id)}>Edit Teacher</button>

      {error}
    </form>
  );
}
