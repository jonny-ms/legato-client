import React from "react";

import { makeStyles } from "@material-ui/core/styles";

import { Button, Card, CardContent, Grid, Typography } from "@material-ui/core";

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

  // console.log(props);

  return (
    <Card
      className={"calendar-appointment"}
      style={{ backgroundColor: "#ffcc80" }}
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
                  {props.teacher}
                </Typography>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "#696969" }}
                >
                  {props.teacherEmail}
                </Typography>
                <br></br>
                <Typography
                  variant="body2"
                  component="p"
                  style={{ color: "#696969" }}
                >
                  You have a pending {props.course} lesson with {props.teacher}{" "}
                  on {props.time}
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
      </CardContent>
    </Card>
  );
};

export default PendingLessonStudent;
