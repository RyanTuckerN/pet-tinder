import CssBaseline from "@material-ui/core/CssBaseline";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Signup from "./Signup";
import video from "./assets/puppies.mp4";
import useWindowDimensions from "../customHooks/useWindowDimension";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Auth(props) {
  const { updateToken, setUsersInfo } = props;
  const [loginShowing, setLoginShowing] = useState(true);
  const classes = useStyles();
  const { width } = useWindowDimensions()

  const toggleView = () => setLoginShowing(!loginShowing);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      {width >= 960 ? (<Grid item xs={false} sm={4} md={7} 
      style={{display: 'flex', justifyContent: 'center', overflow: 'hidden'}}
      >
        <video autoPlay loop muted className={classes.image}>
          <source src={video} />
        </video>
      </Grid>): null}
      {loginShowing ? (
        <Login
          classes={classes}
          updateToken={updateToken}
          setUsersInfo={setUsersInfo}
          toggleView={toggleView}
        />
      ) : (
        <Signup
          classes={classes}
          updateToken={updateToken}
          setUsersInfo={setUsersInfo}
          toggleView={toggleView}
        />
      )}
    </Grid>
  );
}
