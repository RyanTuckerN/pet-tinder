import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import MatchDisplay from "./MatchDisplay";

const Matches = (props) => {
  const { usersInfo, socket } = props;
  const [superlikeRef, setSuperlikeRef] = useState({});

  const fetchLikes = () => {
    const fetchLikesFetch = async () => {
      try {
        const likesFetch = await fetch(
          "http://localhost:3333/like/superlikes",
          {
            method: "GET",
            headers: new Headers({
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            }),
          }
        );
        const likesJson = await likesFetch.json();
        const superlikeHash = !likesJson.message
          ? likesJson.reduce((a, b) => {
              a[b.liked_dog_id] = b.superlike;
              return a;
            }, {})
          : {};
        setSuperlikeRef(superlikeHash);
      } catch (err) {
        console.error(err);
        alert("There was an error! Please try again");
      }
    };
    fetchLikesFetch();
  };

  useEffect(fetchLikes, [setSuperlikeRef, usersInfo]);
  return (
    <Grid container justifyContent="center">
      {usersInfo?.matches?.length ? (
        usersInfo?.matches?.map((match) => (
          <MatchDisplay
            dog={match}
            socket={socket}
            usersInfo={usersInfo}
            key={match.id}
            superlikeRef={superlikeRef}
          />
        ))
      ) : (
        <h2>No matches yet!</h2>
      )}
    </Grid>
  );
};

export default Matches;
