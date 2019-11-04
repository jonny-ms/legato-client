// import React from "react";

// const PendingLessonTeacher = props => {
//   return (
//     <div>
//       <span>
//         Confirm {props.course} lesson with {props.student} on {props.time}?
//       </span>
//       <button onClick={() => props.acceptBooking(props.currentLessonID)}>
//         Confirm
//       </button>
//       <button onClick={() => props.rejectBooking(props.currentLessonID)}>
//         Reject
//       </button>
//       <button onClick={() => props.notNow()}>Not Now</button>
//     </div>
//   );
// };

// export default PendingLessonTeacher;

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

// const theme = createMuiTheme({
//   palette: {
//     primary: green,
//     secondary: orange
//   }
// });

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    textAlign: "center"
  },
  paper: {
    height: 140,
    width: 100
  },
  control: {
    padding: theme.spacing(2)
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

const PendingLessonTeacher = props => {
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
              {props.student}
            </Typography>
            <Typography variant="body2" component="p">
              You have a lesson teaching {props.course} with {props.student} on{" "}
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
                style={{ backgroundColor: "green" }}
                onClick={() => props.acceptBooking(props.currentLessonID)}
              >
                Confirm
              </Button>
              <Button
                variant={"contained"}
                className={classes.button}
                style={{ backgroundColor: "orange" }}
                onClick={() => props.rejectBooking(props.currentLessonID)}
              >
                Reject
              </Button>
              <Button
                variant={"contained"}
                className={classes.button}
                onClick={() => props.notNow()}
              >
                Not Now
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default PendingLessonTeacher;

// acceptBooking = { this.acceptBooking }
// rejectBooking = { this.rejectBooking }
// notNow = { this.notNow }
