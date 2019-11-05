import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Grow from "@material-ui/core/Grow";

const useStyles = makeStyles({
  card: {
    minWidth: 275,
    minHeight: 400
  },
  media: {
    height: 200
  },
  bigAvatar: {
    margin: 10,
    width: 90,
    height: 90
  }
});

export default function TeacherListItem(props) {
  // console.log("props from TeacherListItem.js: ", props);
  const [shadow, setShadow] = useState(4);
  const classes = useStyles();

  let courses = {};
  for (let course of props.teacher.courses) {
    const courseName = `${course.instrument} - ${course.level} - ${course.rate}/hr`;
    courses[courseName] = course.id;
  }
  const coursesArray = Object.keys(courses);

  const clickFalse = e => {
    props.setTrigger(false);
  };
  const clickTrue = e => {
    props.setTrigger(true);
  };

  const triggerShadow = e => {
    setShadow(6);
  };

  const unTriggerShadow = e => {
    setShadow(4);
  };

  return (
    <Grow
      in={true}
      onMouseEnter={e => {
        triggerShadow(e);
      }}
      onMouseLeave={e => {
        unTriggerShadow(e);
      }}
    >
      <Card
        elevation={shadow}
        style={{
          maxWidth: "300px",
          minWidth: "300px",
          maxHeight: "375px",
          minHeight: "375px",
          marginTop: "25px"
        }}
      >
        {/* Continer for the 4 sections of the card: 
      1. Avatar and Name
      2. Rating
      3. Links to Profile and Calendar
      4. Tagline and courses
      */}

        <CardContent>
          <Grid
            container
            spacing={1}
            direction="column"
            justify="center"
            alignItems="center"
          >
            <Grid item>
              {/* 1. Container for Avatar and Name */}
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                <Grid>
                  <Avatar
                    alt="Remy Sharp"
                    src={props.teacher.profile_pic}
                    className={classes.bigAvatar}
                  />
                </Grid>
                <Grid item>
                  <Typography gutterBottom variant="h5" component="h2">
                    {`${props.teacher.first_name}  ${props.teacher.last_name}`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item style={{}}>
              {/* 2. Container for rating */}
              <Grid
                container
                justify="space-around"
                alignItems="center"
                direction="column"
              >
                <Grid item>
                  <Rating name="disabled" value={3.6} disabled />
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {/* 3. Container for Buttons */}
              <Grid
                container
                direction="row"
                alignItems="center"
                justify="space-evenly"
              >
                <Grid item>
                  <Button
                    size="small"
                    color="primary"
                    style={{ marginLeft: 20 }}
                  >
                    <Link
                      to={{
                        pathname: `/teachers/${props.teacher.id}`,
                        // sending teacher id as state to /teachers/
                        state: { teacher: props.teacher.id }
                      }}
                      onClick={e => {
                        clickTrue(e);
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      View Profile
                    </Link>
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    size="small"
                    color="primary"
                    style={{ marginRight: 20 }}
                  >
                    <Link
                      to={{
                        pathname: `/teachers/${props.teacher.id}`,
                        state: { teacher: props.teacher.id }
                      }}
                      onClick={e => {
                        clickFalse(e);
                      }}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      Book Now
                    </Link>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              {/* 4. Container for tagline and courses */}
              <Grid
                container
                direction="column"
                justify="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    {props.teacher.tagline}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    component="div"
                  >
                    {coursesArray.slice(0, 3).map((courseData, i) => (
                      <div key={i}>{courseData}</div>
                    ))}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Divider variant="middle" />
          </Grid>
        </CardContent>
      </Card>
    </Grow>
  );
}
