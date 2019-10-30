import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function TeacherListItem(props) {
  const classes = useStyles();

  let courses = {};
  for (let course of props.teacher.courses) {
    const courseName = `${course.instrument} - ${course.level} - ${course.rate}/hr`;
    courses[courseName] = course.id;
  }
  let coursesArray = Object.keys(courses);
  console.log("coursesArray: ", coursesArray);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.teacher.profile_pic}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {`${props.teacher.first_name}  ${props.teacher.last_name}`}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.teacher.bio}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {coursesArray.map((courseData, i) => (
              <div>{courseData}</div>
            ))}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Typography component="legend"></Typography>
        <Box component="fieldset" mb={3} borderColor="transparent">
          <Typography component="legend"></Typography>
          <Rating name="disabled" value={3.6} disabled />
        </Box>
      </Box>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
