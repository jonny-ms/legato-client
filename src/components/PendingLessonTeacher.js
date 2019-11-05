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

const PendingLessonTeacher = props => {
  const classes = useStyles();

  return (
    <Card
      className={"calendar-appointment"}
      style={{ backgroundColor: "#ffcc80" }}
      elevation={4}
    >
      <CardContent style={{ padding: 8 }}>
        <Card elevation={0}>
          <CardContent>
            <Grid container direction="row">
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
                  You have a lesson teaching {props.course} with {props.student}{" "}
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
      </CardContent>
    </Card>
  );
};

export default PendingLessonTeacher;
