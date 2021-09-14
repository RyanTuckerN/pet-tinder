import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import { Chip, Grid } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    // width: 345,
    minWidth: 345,
    maxWidth: 345,
    minHeight: 600,
    maxHeight:600,
    borderRadius: 20,
    // margin: 25,
    textAlign: 'left',
    background: 'linear-gradient(194deg, rgba(244,244,244,1) 0%, rgba(223,180,148,1) 68%, rgba(245,172,238,1) 100%)'
  },
  media: {
    height: 280,
  },

});

export default function DogDisplay(props) {
  const { dog, showingMatches } = props;
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();

  return (
    // <div >
      <Grid contatiner item xs={12} md={6} lg={4} style={{display: 'flex', justifyContent:'space-around'}} >
        <Card key={dog.id} className={classes.root} >
          <CardMedia
            className={classes.media}
            image={dog.photo_url}
            title={dog.name}
          />
          <CardContent style={{overflow: 'auto', maxHeight: 320}}>
            <span id="title">{`${dog.name}, `}</span>
            <span id="subtitle">{dog.is_female ? "female" : "male"}</span>
            <Typography variant="caption" color="textSecondary" component="p">
              {dog.breed} | Age: {dog.age} | Weight: {dog.weight} lbs
            </Typography>
            <p>{showMore ? dog.ad_description : null}</p>
            <ul className="chips-list">
              {dog.temperament.map((temp, i) => {
                return (
                  <li key={i} className="chip">
                    <Chip label={temp} className={classes.chip} />
                  </li>
                );
              })}
            </ul>
            <Typography variant="caption" color="textSecondary" component="p">
              {dog.ad_description}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    // </div>
  );
}
