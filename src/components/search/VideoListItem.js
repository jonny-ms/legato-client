import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Link,
  CardActionArea
} from "@material-ui/core";
// CardMedia
// import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube";

// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345
//   },
//   media: {
//     height: 140
//   }
// });

export default function VideoListItem(props) {
  // const classes = useStyles();

  const opts = {
    height: "310",
    width: "540"
    //   playerVars: { // https://developers.google.com/youtube/player_parameters
    //   autoplay: 1
    // }
  };

  return (
    <div>
      <Card>
        <Box>
          <YouTube videoId={props.video.file} opts={opts}></YouTube>
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.video.level} {props.video.instrument}
          </Typography>
        </CardContent>
        <CardActionArea>
          <Button size="small" color="primary">
            <Link to={`/teachers/${props.teacher.id}`}>
              View {props.teacher.first_name}'s Profile
            </Link>
          </Button>
        </CardActionArea>
      </Card>
    </div>
  );
}
