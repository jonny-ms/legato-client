import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Card, Typography, Paper, CardActionArea, CardContent } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundImage: `url(https://s17026.pcdn.co/wp-content/uploads/sites/9/2017/06/Music-teacher.jpeg)`,
    backgroundSize: "cover",
    width: "100vw",
    height: "100vh",
  },
  backgroundImage: {
    width: "100%",
    position: "absolute",
    zIndex: -1,
    height: "auto",
  },
  cards: {
    backgroundColor: "rgb(0,0,0)", /* Fallback color */
    backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
    color: "white",
    fontWeight: "bold",
    border: "2px solid #f1f1f1",
    zIndex: 2,
    width: "60%",
    margin: "auto",
    borderRadius: 10,
    height: "100%"
  },
  becoming: {
    position: "absolute",
    top: "65%",
  },
  about: {
    backgroundColor: "rgb(0,0,0)", /* Fallback color */
    backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
    color: "white",
    fontWeight: "bold",
    margin: "auto",
    width: "50%",
    position: "absolute",
    top: "20%",
    right: "9%",
    padding: "2%"
  },
  mobileAbout: {
    backgroundColor: "rgb(0,0,0)", /* Fallback color */
    backgroundColor: "rgba(0,0,0, 0.4)", /* Black w/opacity/see-through */
    color: "white",
    fontWeight: "bold",
    margin: "auto",
    width: "60%",
    padding: "4%",
    position: "absolute",
    top: "20%",
    left: "17%"
  }
  
}))
  
  
export default function Landing(props) {
  const classes = useStyles();

  return(
    <Paper className={classes.container}>

{props.mobile &&
<Card className={classes.mobileAbout}>
  <Typography variant="h4">
    Connecting music students and teachers.
  </Typography>
</Card>
}
{!props.mobile &&
  <Card className={classes.about}>
  <Typography variant="h4">
    At Legato, our goal is to connect those who want to learn with those who want to teach.
  </Typography>
  </Card>
}

<Grid container spacing={5} direction="row" justify="center" 
className={classes.becoming}
>
<Grid item xs={12} md={6} >

    <Card className={classes.cards}>
      <CardActionArea
        component={Link}
        to="/students/new">
          <CardContent>
          <Typography variant="h4" >
            Become a Student
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
  <Grid item xs={12} md={6}>
    <Card className={classes.cards}>
      <CardActionArea
        component={Link}
        to="/teachers/new">      
        <CardContent>
          <Typography variant="h4" >
            Become a Teacher
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>

</Grid>

    </Paper>
  )
  
}