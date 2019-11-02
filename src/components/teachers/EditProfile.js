import React, { useState, useEffect } from "react";
import axios from "axios";

export default function EditProfile(props) {

  const [id, setId] = useState(0)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [tagline, setTagline] = useState("");
  const [bio, setBio] = useState("");
  const [courses, setCourses] = useState([])
  const [instrument, setInstrument] = useState("");
  const [level, setLevel] = useState("");
  const [rate, setRate] = useState(0);

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
    axios('/api/teachers/new', { withCredentials: true,})
      .then(({data}) => {
        setId(data.id)
        setFirstName(data.first_name)
        setLastName(data.last_name)
        setEmail(data.email)
        setBio(data.bio)
        setCourses(data.courses)
      })
  }


  const addCourse = (e) => {
    e.preventDefault()
    e.stopPropagation()
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
      }).then(({data}) => {
        setCourses(data)
        setInstrument("")
        setLevel("")
        setRate(0)
      })
  }

  const destroyCourse = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    axios(`/api/courses/${id}`, {
      method: "delete",
      withCredentials: true
    }).then(() => {
      const newCourses = courses.filter(course => course.id !== id);
      setCourses(newCourses)
    })

  }

  const editProfile = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    axios(`/api/teachers/${id}`, {
      method: "put",
      withCredentials: true,
      data: {
        teacher: {
          // tagline,
          bio
        }
      }
    }).then((resp) => {
      console.log(resp)
    })
  }
  
  useEffect(() => {
    fetchTeacherInfo();
  }, []);


  return(
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
      <input type="text" name="tagline" value={tagline} onChange={e => setTagline(e.target.value)} />
      </label>
      <label>
        Bio:
        <input type="text" name="bio" value={bio} onChange={e => setBio(e.target.value)} />
      </label>
      {/* <label> */}
        {/* Certifications: */}
        {/* <input type="text" name="certifications" value={certification} onChange={e => setCertification(e.target.value)} /> */}
      {/* </label> */}
      <label>
        Courses:
          {courses.map((course, i) => {
            return(
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
                <button type="submit" onClick={(e) => destroyCourse(e, course.id)} >Remove Course</button>
              </li>
            )
          })
          }
        <label>
          Instrument:
          <select value={instrument} onChange={e => setInstrument(e.target.value)}>
            {instruments.map((instrument, i) => {
              return <option key={i}>{instrument}</option>;
            })}
          </select>
          Level:
          <select value={level} onChange={e => setLevel(e.target.value)}>
            {levels.map((level, i) => {
              return <option key={i}>{level}</option>;
            })}
          </select>
          Rate:
          <input type="number" name="rate" value={rate} onChange={e => setRate(e.target.value)}/>
        </label>

        <button type="submit" onClick={(e) => addCourse(e)} >Add Course</button>
      </label>

      {/* videos 
            ---> url
            --> instrument
            --> level*/}
      {/* will travel */}
      {/* will host */}


      <button onClick={(e) => editProfile(e, id)}>Edit Teacher</button>

    </form>


    
    
  )
}
