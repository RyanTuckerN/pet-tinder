import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const ImageUpload = (props) => {
  return ( 
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload an image
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="name"
            name="name"
            label="Name"
            fullWidth
            // autoComplete="given-name"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="breed"
            name="breed"
            label="Breed"
            fullWidth
            // autoComplete="family-name"
          />
        </Grid>
      </Grid>
    </React.Fragment>
   );
}
 
export default ImageUpload;