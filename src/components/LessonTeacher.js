import React from "react";

import {
  makeStyles,
  MuiThemeProvider,
  createMuiTheme
} from "@material-ui/core/styles";
import { orange } from "@material-ui/core/colors";

import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";

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

const LessonTeacher = props => {
  const classes = useStyles();

  return (
    <Card
      className={"calendar-appointment"}
      style={{ backgroundColor: "green" }}
      elevation={4}
    >
      <CardContent style={{ padding: 8 }}>
        <Card elevation={0}>
          <CardContent>
            <Grid container direction="row" spacing={2}>
              <Grid item xs={8} sm={10}>
                <Typography
                  className={classes.title}
                  gutterBottom
                  variant="h5"
                  style={{ color: "#696969" }}
                >
                  {props.student}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "#696969" }}
                >
                  {props.studentEmail}
                </Typography>
                <br></br>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "#696969" }}
                >
                  You have a lesson teaching {props.course} with {props.student}{" "}
                  on {props.time}
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
      </CardContent>
    </Card>
  );
};

export default LessonTeacher;
