import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";

const ImageUpload = (props) => {
  const {photo_url, setPhoto_url} = props.twoProps

  const handlePhoto = e => setPhoto_url(e.target.value)
  return ( 
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload an image
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            required
            id="imageurl"
            name="imageurl"
            label="Image URL"
            fullWidth
            value={photo_url}
            onChange={handlePhoto}
            // autoComplete="given-name"
          />
        </Grid>
      </Grid>
    </React.Fragment>
   );
}
 
export default ImageUpload;