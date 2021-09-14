import CssBaseline from "@material-ui/core/CssBaseline";
import React, {useState} from "react";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Login from "./Login";
import Signup from "./Signup";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
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
  const { updateToken, setUsersInfo, socket } = props;
  const [loginShowing, setLoginShowing] = useState(true);
  const classes = useStyles();

  const toggleView = () => setLoginShowing(!loginShowing);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      {loginShowing ? (
        <Login
          classes={classes}
          updateToken={updateToken}
          setUsersInfo={setUsersInfo}
          socket={socket}
          toggleView={toggleView}
        />
      ) : (
        <Signup
          classes={classes}
          updateToken={updateToken}
          setUsersInfo={setUsersInfo}
          socket={socket}
          toggleView={toggleView}
        />
      )}
      <Box mt={5}>
        <Copyright />
      </Box>
    </Grid>
  );
}
