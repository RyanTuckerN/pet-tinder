import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Chip, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import "../Matches/Matches.css";
import distanceBetCoor from "../../functions/distanceBetCoor";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: 2,
    height: 500,
    textAlign: "left",
    color: "#F3F0EE",
    background: "#FF655B",
  },
  media: {
    height: 280,
  },
  chip: {
    backgroundColor: "#f3f0ee",
    color: "#514949",
    fontFamily: "Montserrat",
  },
}));

export default function DogDisplay(props) {
  const { dog, usersInfo } = props;
  const classes = useStyles();

  return (
    <Grid
      container
      item
      xs={12}
      style={{ display: "flex", justifyContent: "space-around", padding: 18 }}
    >
      <Card
        key={dog.id}
        className={[classes.root, "matches-card-body"].join(" ")}
      >
        <CardMedia
          className={classes.media}
          image={dog.photo_url}
          title={dog.name}
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
        <CardContent style={{ overflow: "auto", maxHeight: 320 }}>
          <span id="title">{`${dog.name}, `}</span>
          <span id="subtitle">{dog.is_female ? "female" : "male"}</span>
          <Typography variant="caption" component="p">
            {dog.breed} | Age: {dog.age} | Weight: {dog.weight} lbs
          </Typography>
          <ul className="chips-list">
            {dog.temperament.map((temp, i) => {
              return (
                <li key={i} className="chip">
                  <Chip label={temp} className={classes.chip} />
                </li>
              );
            })}
          </ul>
          <Typography variant="caption" component="p">
            {dog.ad_description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
