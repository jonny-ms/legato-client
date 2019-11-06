import React, { Fragment } from "react";
import YouTube from "react-youtube";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  Typography,
  CssBaseline,
  Divider,
  Avatar,
  Box
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    overflow: "hidden",
    justifyContent: "center",
    align: "center"
  },
  container: {
    marginTop: theme.spacing(8)
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150
  },
  mobileAvatar: {
    margin: 10,
    width: 100,
    height: 100
  },
  textBox: {
    margin: theme.spacing(3)
  }
}));

export default function TeacherProfile(props) {
  const classes = useStyles();

  const teacher = props.teacher[0];

  const videoSpecs = {
    height: "250vh",
    width: "100%"
  };
  const mobileVideoSpecs = {
    height: "180vh",
    width: "100%"
  };

  return (
    <div style={{ paddingBottom: "40px" }}>
      <CssBaseline />
      <Container className={classes.container}>
        <Card style={{ padding: "10%", borderRadius: 7 }} elevation={4}>
          <Grid
            container
            direction="column"
            justify="space-between"
            alignItems="center"
          >
            <Grid item>
              <Avatar
                alt={teacher.first_name}
                src={teacher.profile_pic}
                className={
                  props.mobile ? classes.mobileAvatar : classes.bigAvatar
                }
              />
            </Grid>
          </Grid>

          <Box className={classes.textBox}>
            <Typography
              gutterBottom
              variant={props.mobile ? "h6" : "h4"}
              component="h2"
            >
              {`${teacher.first_name}  ${teacher.last_name}`}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box className={classes.textBox}>
            <Typography
              gutterBottom
              variant={props.mobile ? "subtitle1" : "h6"}
              component="h2"
              color="textSecondary"
            >
              {teacher.tagline}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box className={classes.textBox}>
            <Typography
              gutterBottom
              variant={props.mobile ? "h6" : "h4"}
              component="h2"
              style={{ textAlign: "center" }}
            >
              Bio
            </Typography>
            <Typography
              gutterBottom
              variant={props.mobile ? "subtitle1" : "h5"}
              component="h2"
              style={{ textAlign: "justify" }}
            >
              {teacher.bio}
            </Typography>
          </Box>

          <Divider variant="middle" />

          <Box className={classes.textBox}>
            <Typography
              gutterBottom
              variant={props.mobile ? "h6" : "h4"}
              component="h2"
            >
              Courses
            </Typography>
            <Grid container>
              {props.courses.map((course, i) => {
                return (
                  <Grid
                    container
                    key={i}
                    direction="column"
                    justify="space-between"
                    alignItems={props.mobile ? "left" : "center"}
                  >
                    <Grid item fullWidth xs={12} style={{ marginTop: "5px" }}>
                      {!props.mobile && (
                        <Typography align="left" variant={"h5"}>
                          {course.level} {course.instrument} for ${course.rate}
                          /hour
                        </Typography>
                      )}
                      {props.mobile && (
                        <Fragment>
                          <Typography align="left" variant={"subtitle1"}>
                            {" "}
                            {course.level} {course.instrument}
                          </Typography>
                          <Typography align="left" color="textSecondary">
                            ${course.rate}/hour
                          </Typography>
                        </Fragment>
                      )}
                    </Grid>
                  </Grid>
                );
              })}
            </Grid>
          </Box>

          <Divider variant="middle" style={{ marginBottom: "20px" }} />

          <Typography
            gutterBottom
            variant={props.mobile ? "h6" : "h4"}
            component="h2"
          >
            Videos
          </Typography>

          <Grid container spacing={2} style={{ marginTop: 5 }}>
            {props.videos.map((video, i) => {
              return (
                <Grid item key={i} xs={12} sm={6}>
                  <Card>
                    <CardMedia>
                      <YouTube
                        fullWidth
                        videoId={video.file}
                        opts={props.mobile ? mobileVideoSpecs : videoSpecs}
                      />
                    </CardMedia>
                    <Typography variant="h6">{video.instrument}</Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Card>
      </Container>
    </div>
  );
}
