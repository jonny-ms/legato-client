// import React from "react";

// const PendingLessonStudent = props => {
//   return (
//     <div>
//       <span>
//         You have a {props.course} lesson with {props.teacher} on {props.time}?
//       </span>
//       <button onClick={() => props.cancelLesson(props.currentLessonID)}>
//         Cancel
//       </button>
//     </div>
//   );
// };

// export default PendingLessonStudent;

import React from "react";

import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { green, orange } from "@material-ui/core/colors";

import {
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  TextField
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  appointment: {
    margin: theme.spacing(2)
  },
  title: {
    textAlign: "left"
  },
  button: {
    variant: "contained",
    margin: theme.spacing(0.5)
  }
}));

const PendingLessonStudent = props => {
  const classes = useStyles();

  return (
    <Card
      className={"calendar-appointment"}
      style={{ backgroundColor: "#ffcc80" }}
    >
      <CardContent>
        <Grid container direction="row">
          <Grid item xs={8} sm={10}>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
              variant="h5"
            >
              {props.teacher}
            </Typography>
            <Typography variant="body2" component="p">
              You have a pending {props.course} lesson with {props.teacher} on{" "}
              {props.time}
            </Typography>
          </Grid>
          <Grid
            item
            container
            xs={4}
            sm={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <Grid item alignContent={"center"}>
              <Button
                variant={"contained"}
                className={classes.button}
                style={{ backgroundColor: "orange" }}
                onClick={() => props.cancelLesson(props.currentLessonID)}
              >
                Cancel Request
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingLessonStudent;
