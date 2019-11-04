import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import {
  Container,
  Grid,
  TextField,
  Paper,
  Card,
  CardContent,
  Box,
  CardMedia,
  Typography,
  Button,
  MenuItem,
  InputAdornment,
  Link,
  CardActionArea,
  CssBaseline,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "center"
  },
  container: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  addCourse: {
    display: "flex",
    justifyContent: "flex-start"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  }
}));

export default function EditProfile(props) {
  const classes = useStyles();

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
  const [videos, setVideos] = useState([]);
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

  const teacherInstruments = courses.map(course => {
    return course.instrument;
  });

  const levels = ["Select", "Beginner", "Intermediate", "Advanced"];

  const videoSpecs = {
    height: "200",
    width: "300"
  };

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
      setVideos(data.videos);
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
      if (data.status === 401) {
        setError("Cannot remove a course with future lessons.");
      } else {
        fetchTeacherInfo();
      }
    });
  };

  const destroyVideo = (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    axios(`/api/videos/${id}`, {
      method: "delete",
      withCredentials: true
    }).then(() => {
      const newVideos = videos.filter(video => video.id !== id);
      setVideos(newVideos);
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
    <div>
      <CssBaseline />
      <Container>
        <Typography component="h1" variant="h5">
          Edit Profile
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="text"
              variant="outlined"
              value={firstName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              type="text"
              variant="outlined"
              value={lastName}
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField type="email" variant="outlined" value={email} disabled />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              type="text"
              variant="outlined"
              label="Tagline"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              multiline
              type="text"
              variant="outlined"
              label="Bio"
              value={bio}
              onChange={e => setBio(e.target.value)}
            />
          </Grid>
        </Grid>

        {/* <label> */}
        {/* Certifications: */}
        {/* <input type="text" name="certifications" value={certification} onChange={e => setCertification(e.target.value)} /> */}
        {/* </label> */}

        {/* //!COURSES */}
        <Grid container spacing={2}>
          {courses.map((course, i) => {
            return (
              <Paper>
                <Grid item key={i} xs={12}>
                  <Typography>
                    {course.level} {course.instrument} for {course.rate}$/hour
                  </Typography>
                </Grid>
                <IconButton aria-label="delete">
                  <DeleteIcon onClick={e => destroyCourse(e, course.id)} />
                </IconButton>
              </Paper>
            );
          })}
        </Grid>

        <Grid container spacing={2} className={classes.addCourse}>
          {/* Instrument */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Instrument"
              variant="outlined"
              defaultValue="Select"
              onChange={e => setInstrument(e.target.value)}
              className={classes.formControl}
              fullWidth
            >
              {instruments.map((instrument, i) => {
                return (
                  <MenuItem key={i} value={instrument}>
                    {instrument}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          {/* Level */}
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              label="Level"
              variant="outlined"
              onChange={e => setLevel(e.target.value)}
              defaultValue="Select"
              className={classes.formControl}
              fullWidth
            >
              {levels.map((level, i) => {
                return (
                  <MenuItem key={i} value={level}>
                    {level}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>

          {/* Rate */}
          <Grid item xs={6} md={2}>
            <FormControl
              variant="outlined"
              fullWidth
              className={classes.formControl}
            >
              <InputLabel>Hourly Rate</InputLabel>
              <OutlinedInput
                type="number"
                onChange={event => setRate(event.target.value)}
                startAdornment={
                  <InputAdornment position="start">$</InputAdornment>
                }
                labelWidth={90}
              />
            </FormControl>
          </Grid>
          {/* <Grid item xs={6} md={2}> */}
          <Button onClick={e => addCourse(e)}>Add Course</Button>
          {/* </Grid> */}
        </Grid>

        {/* //!VIDEOS */}

        <Grid container spacing={2}>
          {videos.map((video, i) => {
            return (
              <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
                <YouTube videoId={video.file} opts={videoSpecs} />
                {video.level} {video.instrument}
                <Button onClick={e => destroyVideo(e, video.id)}>
                  Remove Video
                </Button>
              </Grid>
            );
          })}
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              type="url"
              label="YouTube URL"
              variant="outlined"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className={classes.formControl}
              fullWidth
            />
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Instrument"
              variant="outlined"
              onChange={e => setVideoInstrument(e.target.value)}
              defaultValue="Select"
              className={classes.formControl}
              fullWidth
            >
              {teacherInstruments.map((instrument, i) => {
                return (
                  <MenuItem key={i} value={instrument}>
                    {instrument}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
          <Grid item xs={6} sm={3}>
            <TextField
              select
              label="Level"
              variant="outlined"
              onChange={e => setVideoLevel(e.target.value)}
              defaultValue="Select"
              className={classes.formControl}
              fullWidth
            >
              {levels.map((level, i) => {
                return (
                  <MenuItem key={i} value={level}>
                    {level}
                  </MenuItem>
                );
              })}
            </TextField>
          </Grid>
        </Grid>

        <Button onClick={e => addVideo(e, id)}>Add Video</Button>

        {/* will travel */}
        {/* will host */}

        <button onClick={e => editProfile(e, id)}>Edit Teacher</button>

        {error}
      </Container>
    </div>
  );
}
