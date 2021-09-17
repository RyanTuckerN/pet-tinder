import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

const ImageUpload = (props) => {
  const { photo_url, setPhoto_url } = props.twoProps;

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "lvcrltpx");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dpd08wa9g/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const File = await res.json();
    console.log(File);
    setPhoto_url(File.secure_url);
  };

  // const handlePhoto = e => setPhoto_url(e.target.value)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Upload an image
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <img
            src={photo_url}
            alt="dog profile photo"
            style={{ width: "100%", borderRadius: 20 }}
          />
        </Grid>
        <Grid item xs={12}>
          {/* <TextField
            required
            type="file"
            name="file"
            label="Image URL"
            // fullWidth
            // value={photo_url}
            // autoComplete="given-name"
          /> */}
          <input
            accept="image/*"
            // className={classes.input}
            onChange={uploadImage}
            style={{ display: "none" }}
            id="raised-button-file"
            // multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color='secondary'
              component="span"
              // className={classes.button}
            >
              Upload an Image
            </Button>
          </label>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ImageUpload;
