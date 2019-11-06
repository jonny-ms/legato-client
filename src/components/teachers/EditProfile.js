import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import {
  Container,
  Grid,
  TextField,
  Paper,
  Card,
  Typography,
  Button,
  MenuItem,
  InputAdornment,
  CssBaseline,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  Divider,
  Avatar,
  Box
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
    marginTop: theme.spacing(8)
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: "80%"
  },
  gridContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-around"
  },
  videoContainer: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "flex-start"
  },
  courses: {
    marginTop: theme.spacing(2)
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
  const [profilePic, setProfilePic] = useState("");
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

  const teacherInstruments = courses.map(course => {
    return course.instrument;
  });

  const levels = ["Select", "Beginner", "Intermediate", "Advanced"];

  const videoSpecs = {
    height: "100%",
    width: "100%"
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
      setProfilePic(data.profile_pic);
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
      setError("Empty field!");
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
        setError(
          `${data.course.instrument} lessons have been booked or requested.`
        );
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
    if (videoInstrument) {
      console.log("just before axios call");
      axios(`/api/videos`, {
        method: "post",
        withCredentials: true,
        data: {
          video: {
            teacher_id: id,
            file: videoId,
            instrument: videoInstrument
          }
        }
      }).then(() => {
        fetchTeacherInfo();
        setVideoInstrument("");
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
    <div style={{ paddingBottom: "40px" }}>
      <CssBaseline />
      <Container className={classes.container}>
        <Card style={{ padding: "5%", borderRadius: 7 }} elevation={4}>
          <Typography variant="h4">Profile</Typography>

          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                variant="outlined"
                value={firstName}
                disabled
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="text"
                variant="outlined"
                value={lastName}
                disabled
                className={classes.formControl}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                type="email"
                variant="outlined"
                value={email}
                disabled
                className={classes.formControl}
              />
            </Grid>

            <Grid
              container
              spacing={2}
              display="flex"
              justifyContent="space-between"
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  multiline
                  type="text"
                  variant="outlined"
                  label="Bio"
                  value={bio}
                  onChange={e => setBio(e.target.value)}
                  rows="5"
                  className={classes.formControl}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Grid item xs={12}>
                  <TextField
                    type="url"
                    label="Profile Pic Url"
                    variant="outlined"
                    value={profilePic}
                    onChange={e => setProfilePic(e.target.value)}
                    className={classes.formControl}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="text"
                    variant="outlined"
                    label="Tagline"
                    value={tagline}
                    onChange={e => setTagline(e.target.value)}
                    className={classes.formControl}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Grid>

            <Button
              variant="outlined"
              style={{ marginTop: "1.2em" }}
              onClick={e => editProfile(e, id)}
            >
              Edit Profile
            </Button>
          </Grid>

          {/* <label> */}
          {/* Certifications: */}
          {/* <input type="text" name="certifications" value={certification} onChange={e => setCertification(e.target.value)} /> */}
          {/* </label> */}

          <Divider variant="middle" />

          {/* //!COURSES */}
          <Typography variant="h4" style={{ marginTop: "1em" }}>
            {" "}
            Courses{" "}
          </Typography>

          {error && error !== "Empty field!" && (
            <Paper
              elevation={4}
              style={{ backgroundColor: "#f8d7da", color: "#721c24" }}
            >
              <Typography variant="h6" style={{ marginTop: "0.4em" }}>
                {error}
              </Typography>
            </Paper>
          )}

          <Grid container>
            {courses.map((course, i) => {
              return (
                <Grid container key={i} className={classes.courses}>
                  <Grid item xs={12}>
                    <Paper elevation={2}>
                      <Grid container>
                        <Grid item xs={10}>
                          <Typography
                            align="left"
                            variant="h5"
                            style={{ marginTop: "0.4em", marginLeft: "5%" }}
                          >
                            {course.level} {course.instrument} for $
                            {course.rate}
                            /hour
                          </Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton aria-label="delete">
                            <DeleteIcon
                              onClick={e => destroyCourse(e, course.id)}
                            />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>

          <Grid container spacing={2} className={classes.gridContainer}>
            {/* Instrument */}
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                select
                error={error === "Empty field!" && instrument === ""}
                helperText={error && instrument === "" ? "Empty field!" : " "}
                label="Instrument"
                variant="outlined"
                value={instrument}
                onChange={e => {
                  setInstrument(e.target.value);
                }}
                className={classes.formControl}
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
                error={error === "Empty field!" && level === ""}
                helperText={
                  error === "Empty field!" && level === ""
                    ? "Empty field!"
                    : " "
                }
                label="Level"
                variant="outlined"
                onChange={e => {
                  setLevel(e.target.value);
                }}
                value={level}
                className={classes.formControl}
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
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel>Hourly Rate</InputLabel>
                <OutlinedInput
                  type="number"
                  value={rate}
                  error={error === "Empty field!" && rate === 0}
                  helperText={
                    error === "Empty field!" && rate === 0
                      ? "Empty field!"
                      : " "
                  }
                  onChange={event => setRate(event.target.value)}
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  labelWidth={90}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} md={2}>
              <Button
                onClick={e => addCourse(e)}
                variant="outlined"
                style={{ marginTop: "1.2em" }}
              >
                Add Course
              </Button>
            </Grid>
          </Grid>

          <Divider variant="middle" />

          {/* //!VIDEOS */}

          <Typography variant="h4" style={{ marginTop: "1em" }}>
            Videos
          </Typography>

          <Grid container spacing={2} className={classes.videoContainer}>
            {videos.map((video, i) => {
              return (
                <Grid item key={i} xs={12} sm={6} md={4} lg={4}>
                  <Card>
                    <YouTube fullWidth videoId={video.file} opts={videoSpecs} />
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <Box style={{ marginLeft: "40%" }}>
                        <Typography variant="h6">{video.instrument}</Typography>
                      </Box>
                      <IconButton aria-label="delete">
                        <DeleteIcon
                          fontSize="small"
                          onClick={e => destroyVideo(e, video.id)}
                        />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              );
            })}
          </Grid>

          <Grid container spacing={2} className={classes.gridContainer}>
            <Grid item xs={12} sm={5}>
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
                value={videoInstrument}
                className={classes.formControl}
                fullWidth
              >
                {teacherInstruments
                  .filter(
                    (instrument, i, teacherInstruments) =>
                      teacherInstruments.indexOf(instrument) === i
                  )
                  .map((instrument, i) => {
                    return (
                      <MenuItem key={i} value={instrument}>
                        {instrument}
                      </MenuItem>
                    );
                  })}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={2}>
              <Button
                onClick={e => addVideo(e, id)}
                variant="outlined"
                style={{ marginTop: "1.2em" }}
              >
                Add Video
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
