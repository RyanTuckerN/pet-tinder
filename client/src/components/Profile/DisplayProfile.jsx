import React from "react";
import { useParams } from "react-router";
import { Grid, Typography } from "@material-ui/core";
import NotConnected from "../MainLayoutComponents/NotConnected";

const DisplayProfile = (props) => {
  const { dogId } = useParams();
  const { usersInfo } = props;
  const currentDog =
    usersInfo?.matches?.filter((match) => match.id === parseInt(dogId))[0] ??
    usersInfo?.user?.dog;

  console.log(currentDog ? currentDog : "undefined");

  // return <div>{currentDog?.name}</div>;
  return currentDog ? (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      style={{ marginTop: 30 }}
    >
      <Grid
        item
        direction="column"
        justifyContent="center"
        alignItems="center"
        container
        style={{ padding: 10 }}
        xs={11}
        md={6}
        lg={5}
      >
        <Grid item xs={11} style={{ height: 200, borderRadius: 20 }}>
          <img
            src={currentDog.photo_url}
            alt={currentDog.name}
            style={{ maxWidth: "100%", maxHeight: 350, borderRadius: 20 }}
          />
        </Grid>
        <Grid
          container
          item
          xs={11}
          style={{
            padding: 10,
          }}
          direction="row"
          justifyContent="center"
          alignItems="flex-end"
        >
          <Typography variant="h3" display="inline">
            {currentDog.name}
          </Typography>
          <Typography
            variant="subtitle1"
            display="inline"
            style={{ paddingBottom: 5, paddingLeft: 15 }}
          >
            {`${currentDog.breed} | ${currentDog.age} years old | ${currentDog.weight} pounds`}
          </Typography>
          <Typography variant="subtitle2">
            {`Eligible ${
              currentDog.is_female ? "bachelorette" : "bachelor"
            } since ${new Date(currentDog.createdAt).toLocaleDateString()}`}
          </Typography>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              style={{ paddingBottom: 5, paddingLeft: 15 }}
            >
              {`${currentDog.name}'s owner says:`}
            </Typography>
            <Typography
              variant="body2"
              style={{ paddingBottom: 5, paddingLeft: 15 }}
            >
              {currentDog.ad_description}
            </Typography>
            <Typography
              variant="h6"
              style={{ paddingBottom: 5, paddingLeft: 15 }}
            >
              {`${currentDog.name}'s owner describes ${
                currentDog.is_female ? "her" : "him"
              } as:`}
            </Typography>
            <Typography
              variant="body2"
              style={{ paddingBottom: 5, paddingLeft: 15 }}
            >
              {currentDog.temperament.join(" | ")}
            </Typography>
          </div>
        </Grid>
      </Grid>
    </Grid>
  ) : (
    <NotConnected />
  );
};

export default DisplayProfile;
