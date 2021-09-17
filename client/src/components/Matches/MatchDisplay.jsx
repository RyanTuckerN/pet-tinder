// import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  ButtonGroup,
  Chip,
  Grid,
  Card,
  Tooltip,
  useMediaQuery,
} from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import './Matches.css'
const useStyles = makeStyles(theme=>({
  root: {
    borderRadius: 20,
    textAlign: "left",
    flexGrow: 1,
    flexShrink: 1,
    background:
      "linear-gradient(194deg, rgba(244,244,244,1) 0%, rgba(223,180,148,1) 68%, rgba(245,172,238,1) 100%)",
  },
  media: {
    height: 280,
  },
  superlike: {
    position: "absolute",
    margin: 5,
    color: "#fa91dc",
    fontSize: 40,
    borderRadius: 20,
    backgroundColor: "#78436c",
    // textAlign: "right"
  },
}));

export default function MatchDisplay(props) {
  const { dog, socket, usersInfo, superlikeRef } = props;
  const classes = useStyles();


  const handleUnlike = async (id) => {
    const unlikeFetch = await fetch(`http://localhost:3333/like/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    });
    const deleteNotificationFetch = await fetch(
      `http://localhost:3333/note/${id}`,
      {
        method: "DELETE",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
    const noteJson = await deleteNotificationFetch.json();
    const unlikeJson = await unlikeFetch.json();
    console.log(unlikeJson);
    console.log(noteJson);
    socket.emit("matchRequest", usersInfo?.user?.id);
    socket.emit("notificationRequest", {
      userId: usersInfo?.user?.id,
      target: id,
    });
    // alert(unlikeJson.message);
  };

  const buttonStyle = {backgroundColor:'rgba(255, 0, 133, 0.34)', color: 'white', margin: 6, borderRadius: 5}

  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      lg={4}
      xl={3}
      style={{ display: "flex", justifyContent: "space-around", padding: 18 }}
    >
      <Card key={dog.id} className={[classes.root, 'matches-card-body'].join(' ')}>
        {dog.user.likes[0].superlike && superlikeRef[dog.id] ? (
          <Tooltip title='SUPERMATCH!'>
            <StarBorderIcon id="superlike-star" className={classes.superlike} />
          </Tooltip>
        ) : null}
        <CardMedia
          className={classes.media}
          image={dog.photo_url}
          title={dog.ad_description}
        />
        <CardContent style={{ maxHeight: 320 }}>
          <span id="title">{`${dog.name}, `}</span>
          <span id="subtitle">{dog.is_female ? "female" : "male"}</span>
          <Typography variant="caption" color="textSecondary" component="p">
            {dog.breed} | Age: {dog.age} | Weight: {dog.weight} lbs
          </Typography>
          {/* <p>{showMore ? dog.ad_description : null}</p> */}
          {/* <ul className="chips-list">
            {dog.temperament.map((temp, i) => {
              return (
                <li key={i} className="chip">
                  <Chip label={temp} className={classes.chip} />
                </li>
              );
            })}
          </ul> */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop:18 }}>
            <ButtonGroup>
              <Button onClick={() => handleUnlike(dog.id)} style={buttonStyle}>
                Unlike this dog
              </Button>
              <Link to={`/profile/${dog.id}`}>
                <Button style={buttonStyle}>
                  {`See ${dog.name}'s Profile'`}
                </Button>
              </Link>
            </ButtonGroup>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
