import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Autocomplete } from '@material-ui/lab'
import breeds from './assets/breedlist'

export default function BasicInfo(props) {
  // console.log(breeds)
  const { name, breed, age, weight, is_female, location, setName, setBreed, setAge, setWeight, setIsFemale, setLocation } = props.zeroProps
  const handleName = e => setName(e.target.value)
  const handleBreed = e => setBreed(e.target.value)
  const handleAge = e => setAge(e.target.value)
  const handleWeight = e => setWeight(e.target.value)
  const handleGender = e => setIsFemale(e.target.value==='female'?true:false)
  const handleLocation = e => setLocation({zip: e.target.value})

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Basic Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            value={name}
            onChange={handleName}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="breed"
            name="breed"
            label="Breed"
            fullWidth
            value={breed}
            onChange={handleBreed}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            value={location.zip}
            autoComplete="shipping postal-code"
            onChange={handleLocation}
          />
        </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id='age'
              name='age'
              label='Age'
              fullWidth
              value={age}
              type='number'
              onChange={handleAge}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <TextField
              required
              id='weight'
              name='weight'
              label='Weight (lbs)'
              fullWidth
              value={weight}
              type='number'
              onChange={handleWeight}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                onChange={handleGender}
                value={is_female?'female':'male'}
              >
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
                <FormControlLabel value="male" control={<Radio />} label="Male" />
              </RadioGroup>
            </FormControl>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
