// import React from "react";

// const LessonStudent = props => {
//   console.log(props);

//   return (
//     <div>
//       <span>
//         You have a {props.course} lesson with {props.teacher} on {props.time}!
//       </span>
//       <button onClick={() => props.cancelLesson(props.currentLessonID)}>
//         Cancel Lesson
//       </button>
//     </div>
//   );
// };

// export default LessonStudent;

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

const theme = createMuiTheme({
  palette: {
    secondary: orange
  }
});

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
  },
  buttonGrid: {
    alignItems: "center"
  }
}));

const LessonStudent = props => {
  const classes = useStyles();

  return (
    <Card
      className={"calendar-appointment"}
      style={{ backgroundColor: "green" }}
      elevation={4}
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
              You have a {props.course} lesson with {props.teacher} on{" "}
              {props.time}
            </Typography>
          </Grid>
          <MuiThemeProvider theme={theme}>
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
                  color={"secondary"}
                  onClick={() => props.cancelLesson(props.currentLessonID)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </MuiThemeProvider>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LessonStudent;
