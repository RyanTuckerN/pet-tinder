import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Grid, Paper, Typography } from "@material-ui/core";

const DisplayProfile = (props) => {
  const { dogId } = useParams();
  const { usersInfo } = props;
  const currentDog =
    usersInfo?.matches?.filter((match) => match.id === parseInt(dogId))[0] ??
    usersInfo?.user?.dog;

  console.log(currentDog);

  return <div>{currentDog?.name}</div>;
};

export default DisplayProfile;
