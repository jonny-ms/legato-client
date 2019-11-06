import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Card,
  Typography,
  Paper,
  CardActionArea,
  CardContent,
  Divider
} from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(https://s17026.pcdn.co/wp-content/uploads/sites/9/2017/06/Music-teacher.jpeg)`,
    backgroundSize: "cover",
    width: "100hw",
    height: "94vh"
  },
  backgroundImage: {
    width: "100%",
    position: "absolute",
    zIndex: -1,
    height: "auto"
  },
  cards: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    color: "white",
    fontWeight: "bold",
    border: "2px solid silver",
    zIndex: 2,
    width: "60%",
    margin: "auto",
    borderRadius: 15,
    height: "100%"
  },
  becoming: {
    position: "absolute",
    top: "65%"
  },
  about: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    color: "white",
    fontWeight: "bold",
    margin: "auto",
    width: "50%",
    padding: "2%",
    textAlign: "left",
    fontSize: 20,
    position: "absolute",
    top: "20%",
    left: "23%",
    borderRadius: 7
  },
  mobileAbout: {
    backgroundColor: "rgba(0,0,0, 0.4)",
    color: "white",
    fontWeight: "bold",
    margin: "auto",
    width: "60%",
    padding: "4%",
    position: "absolute",
    top: "20%",
    left: "17%",
    borderRadius: 7
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },
  divider: {
    marginTop: 15,
    marginBottom: 15,
    height: "3px"
  }
}));

export default function Landing(props) {
  const classes = useStyles();

  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Paper className={classes.container}>
      {props.mobile && (
        <Card className={classes.mobileAbout}>
          <Typography
            variant="h3"
            component="h1"
            style={{ marginBottom: "2px" }}
          >
            le
            {bull}
            ga
            {bull}
            to
          </Typography>
          <Divider className={classes.divider} />

          <Typography variant="h5" component="p">
            to connect music students and teachers.
          </Typography>
        </Card>
      )}
      {!props.mobile && (
        <Card className={classes.about}>
          <CardContent>
            <Typography
              variant="h3"
              component="h1"
              style={{ marginBottom: "2px" }}
            >
              le
              {bull}
              ga
              {bull}
              to
            </Typography>
            <Typography
              className={classes.pos}
              variant="h6"
              style={{ color: "silver" }}
            >
              adverb
            </Typography>
            <Typography variant="h5" component="p">
              in a smooth flowing manner, without breaks between notes.
            </Typography>
            <Divider className={classes.divider} />
            <Typography
              className={classes.pos}
              variant="h6"
              style={{ color: "silver" }}
            >
              our mission
            </Typography>
            <Typography variant="h5" component="p">
              to connect music students and teachers.
            </Typography>
          </CardContent>
        </Card>
      )}

      <Grid
        container
        spacing={0}
        direction="row"
        justify="center"
        className={classes.becoming}
      >
        <Grid item xs={12} md={6} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Card className={classes.cards}>
            <CardActionArea component={Link} to="/students/new">
              <CardContent>
                <Typography variant="h4">Become a Student</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Card className={classes.cards}>
            <CardActionArea component={Link} to="/teachers/new">
              <CardContent>
                <Typography variant="h4">Become a Teacher</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </Paper>
  );
}
