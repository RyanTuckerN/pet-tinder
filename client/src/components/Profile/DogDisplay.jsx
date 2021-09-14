import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import { Chip } from "@material-ui/core";
// import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
// import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 345,
    maxWidth: 345,
    minHeight: 600,
    // background: 'linear-gradient(194deg, rgba(244,244,244,1) 0%, rgba(223,180,148,1) 68%, rgba(245,172,238,1) 100%)'
  },
  media: {
    height: 280,
  },
});

export default function DogDisplay(props) {
  const { dog } = props;
  const [showMore, setShowMore] = useState(false);
  const classes = useStyles();
  const toggleMore = () => setShowMore(!showMore);

  return (
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
      {/* <div id="button-container">
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary" onClick={toggleMore}>
            {showMore ? "Show Less" : "Learn More"}
          </Button>
        </CardActions>
      </div> */}
    </Card>
  );
}
