import React from "react";
import { Typography } from "@material-ui/core";

const Logo = (props) => {
  const {title} = props

  return (
    <Typography variant="h6" noWrap classStyle={title}>
      Pet Tinder
    </Typography>
  );
};

export default Logo;
