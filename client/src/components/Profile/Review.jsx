import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";



export default function Review(props) {
  const { threeProps } = props
  React.useEffect(()=>{
    console.log(threeProps)
  },[props])
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Profile Submit
      </Typography>
      <Typography variant="subtitle2" gutterBottom>
        Would you like to make any changes?
      </Typography>
      
    </React.Fragment>
  );
}
