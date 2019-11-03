import React from "react";
import { Card, CardContent, Box, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import YouTube from "react-youtube"


// const useStyles = makeStyles({
//   card: {
//     maxWidth: 345
//   },
//   media: {
//     height: 140
//   }
// });

export default function VideoListItem (props) {

  // const classes = useStyles();


  const opts = {
    height: '310',
    width: '540',
  //   playerVars: { // https://developers.google.com/youtube/player_parameters
  //   autoplay: 1
  // }
}

    return (
    <div>
      <Card >
        <Box>
          <YouTube videoId={props.video.file} opts={opts}></YouTube>
          {props.video.level} {props.video.instrument} {props.teacher.first_name}
        </Box>
      </Card>
    </div>
  );

}