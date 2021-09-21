// import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Grid, Card, Tooltip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import "./Matches.css";
import distanceBetCoor from "../../functions/distanceBetCoor";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 20,
    textAlign: "left",
    flexGrow: 1,
    flexShrink: 1,
    color: '#F3F0EE',
    background:
      // "linear-gradient(194deg, rgba(244,244,244,1) 0%, rgba(223,180,148,1) 68%, rgba(245,172,238,1) 100%)",
      "#FF655B",
  },
  media: {
    height: 280,
  },
  superlike: {
    position: "absolute",
    margin: 5,
    color: "rgb(255, 235, 201)",
    fontSize: 40,
    borderRadius: 20,
    backgroundColor: "rgb(117, 52, 34)",
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
  };

  const buttonStyle = {
    backgroundColor: "#514949",
    color: "#F3F0EE",
    margin: 6,
    borderRadius: 5,
  };

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
      <Card
        key={dog.id}
        className={[classes.root, "matches-card-body"].join(" ")}
      >
        {dog.user.likes[0].superlike && superlikeRef[dog.id] ? (
          <Tooltip title="SUPERMATCH!">
            <StarBorderIcon id="superlike-star" className={classes.superlike} />
          </Tooltip>
        ) : null}
        <CardMedia
          className={classes.media}
          image={dog.photo_url}
          title={dog.ad_description}
        />
        <Typography
          variant="caption"
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          {dog.location.lat && usersInfo?.user?.dog?.location?.lat
            ? distanceBetCoor.calcMiles([
                dog.location.lat,
                dog.location.lon,
                usersInfo.user.dog.location.lat,
                usersInfo.user.dog.location.lon,
              ]) < 5
              ? "Less than 5 miles away"
              : `About ${distanceBetCoor.calcMiles([
                  dog.location.lat,
                  dog.location.lon,
                  usersInfo.user.dog.location.lat,
                  usersInfo.user.dog.location.lon,
                ])} miles away`
            : null}
        </Typography>
        <CardContent style={{ maxHeight: 320 }}>
          <span id="title">{`${dog.name}, `}</span>
          <span id="subtitle">{dog.is_female ? "female" : "male"}</span>
          <Typography variant="caption"  component="p">
            {dog.breed} | Age: {dog.age} | Weight: {dog.weight} lbs
          </Typography>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 18,
            }}
          >
            <ButtonGroup>
              <Button onClick={() => handleUnlike(dog.id)} style={buttonStyle}>
                Unlike
              </Button>
              <Link to={`/profile/${dog.id}`}>
                <Button style={buttonStyle}>{`${dog.name}'s Profile`}</Button>
              </Link>
            </ButtonGroup>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
