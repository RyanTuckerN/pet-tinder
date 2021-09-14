import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, ButtonGroup, Chip, Grid, Card, Tooltip } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import StarBorderIcon from "@material-ui/icons/StarBorder";

const useStyles = makeStyles({
  root: {
    // width: 345,
    minWidth: 345,
    maxWidth: 345,
    // minHeight: 600,
    maxHeight: 600,
    borderRadius: 20,
    // margin: 25,
    textAlign: "left",
    background:
      "linear-gradient(194deg, rgba(244,244,244,1) 0%, rgba(223,180,148,1) 68%, rgba(245,172,238,1) 100%)",
  },
  media: {
    height: 280,
  },
  superlike: {
    position: 'absolute',
    color: 'rgba(223,180,148,1)',
    fontSize: 40
  }
});

export default function MatchDisplay(props) {
  const { dog, socket, usersInfo } = props;
  // const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  const handleUnlike = async (id) => {
    const unlikeFetch = await fetch(`http://localhost:3333/like/${id}`, {
      method: "DELETE",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    });
    const unlikeJson = await unlikeFetch.json();
    console.log(unlikeJson);
    socket.emit("newLogin", usersInfo?.user?.id);
    alert(unlikeJson.message);
  };

  return (
    <Grid
      container
      item
      xs={12}
      md={6}
      lg={4}
      style={{ display: "flex", justifyContent: "space-around", padding: 18 }}
    >
      <Card key={dog.id} className={classes.root}>
        {dog.user.likes[0].superlike ? (
          <Tooltip title={`${dog.name} superlikes you!!!`}>
            <StarBorderIcon id="superlike-star" className={classes.superlike} />
          </Tooltip>
        ) : null}
        <CardMedia
          className={classes.media}
          image={dog.photo_url}
          title={dog.name}
        />
        <CardContent style={{ maxHeight: 320 }}>
          <span id="title">{`${dog.name}, `}</span>
          <span id="subtitle">{dog.is_female ? "female" : "male"}</span>
          <Typography variant="caption" color="textSecondary" component="p">
            {dog.breed} | Age: {dog.age} | Weight: {dog.weight} lbs
          </Typography>
          {/* <p>{showMore ? dog.ad_description : null}</p> */}
          <ul className="chips-list">
            {dog.temperament.map((temp, i) => {
              return (
                <li key={i} className="chip">
                  <Chip label={temp} className={classes.chip} />
                </li>
              );
            })}
          </ul>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <ButtonGroup>
              <Button onClick={() => handleUnlike(dog.id)}>
                Unlike this dog
              </Button>
            </ButtonGroup>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}
