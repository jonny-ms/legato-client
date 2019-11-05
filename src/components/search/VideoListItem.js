import React, {useState} from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  CardActionArea,
  Grow,
  Grid,
  CardMedia
} from "@material-ui/core";
import { Link } from "react-router-dom";
import YouTube from "react-youtube";


export default function VideoListItem(props) {

  const [shadow, setShadow] = useState(4);


  const opts = {
    height: "300vh",
    width: "100%"

  };

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
        minWidth: "300px",
        marginTop: "25px",
        padding: "3%"
      }}
    >
      <Typography gutterBottom variant="h5" component="h2">
        {`${props.teacher.first_name}  ${props.teacher.last_name}`}{props.instrument === "Select" && ` - ${props.video.instrument}` }
      </Typography>

      <YouTube videoId={props.video.file} opts={opts}></YouTube>

      <Grid
        container
        direction="row"
        alignItems="center"
        justify="space-evenly"
        style={{marginTop: "1em"}}
      >
        <Grid item>
          <Button size="small" color="primary">
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
          <Button size="small" color="primary">
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
      </Card>
    </Grow>
  );
}
