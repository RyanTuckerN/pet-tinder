import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";

const Signup = (props) => {
  const { classes, updateToken, toggleView } = props;
  const [name, setName] = useState("");
  const [profile_name, setProfile_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("@");

  const handleName = (e) => setName(e.target.value);
  const handleProfileName = (e) => setProfile_name(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleEmail = (e) => setEmail(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{const fetchResults = await fetch("http://localhost:3333/user/signup", {
      method: "POST",
      body: JSON.stringify({ profile_name, name, password, email }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
    const json = await fetchResults.json();
    console.log("json response", json);
    updateToken(json.sessionToken);}catch(err){
      console.error(err)
    }
  };

  return (
    <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full-name"
            label="Full Name"
            name="full-name"
            autoFocus
            value={name}
            onChange={handleName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={profile_name}
            onChange={handleProfileName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            type="email"
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={email}
            onChange={handleEmail}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePassword}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={toggleView} variant="body2" >
                {"Already have an account? Log in!"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Grid>
  );
};

export default Signup;
