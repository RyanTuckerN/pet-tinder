import React, {useState} from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, Grid, TextField, Chip, Paper } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    margin: 0,
  },
  chip: {
  },
}));

export default function PaymentForm() {
  const classes = useStyles() 
  const [length, setLength] = useState(0);
  const [chipData, setChipData] = useState(['happy', 'sad', 'playful', 'cool', 'protective'] ); 

  const handleChange = e => setLength(e.target.value.length)
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) => chips.filter(chip=>chip!=chipToDelete));
  };

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Description
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Help other users get a feel for your dog! (500 character maximum length)
      </Typography>
      <div style={{height:20}}/>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField variant='outlined' required id="adDesc" label="Describe your dog!" fullWidth onChange={handleChange}/>
        </Grid>
      </Grid>
      <div style={{height:20}}/>
      <Typography variant='caption'>{`${length}/500`} </Typography>
      <div style={{height:20}}/>
      <Typography variant="h6" gutterBottom>
        Temperament
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Add some descriptive keywords that describe your dog's temperament
      </Typography>
      <div style={{height:20}}/>
      <Grid container spacing={3}>
        <Grid xs={12}>
          <TextField variant='outlined' required id="adDesc" label="Temperament keywords" fullWidth onChange={handleChange}/>
        </Grid>
      </Grid>
      <div style={{height:40}}/>
      <ul className={classes.root}>
      {chipData.map((temp,i) => {
        return (
          <li key={i}>
            <Chip
              label={temp}
              onDelete={handleDelete(temp)}
              className={classes.chip}
            />
          </li>
        );
      })}
    </ul>
    </React.Fragment>
  );
}