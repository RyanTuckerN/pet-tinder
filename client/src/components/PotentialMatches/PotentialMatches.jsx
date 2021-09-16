import React, { useState, useEffect } from "react";
import DogDisplay from "../Profile/DogDisplay";
import { Grid } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import "../Profile/Profile.css";
import "./PotentialMatches.css";

const alreadyRemoved = [];
let dogsState, originalArray;

const PotentialMatches = (props) => {
  const { socket, usersInfo } = props;
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const fetchPotentialMatches = async () => {
    const allLikes = await fetch("http://localhost:3333/like/mine", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    });
    const allDogs = await fetch("http://localhost:3333/dog/all", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    });
    const likesJson = await allLikes.json();

    const dogsJson = await allDogs.json();
    {
      const likedIds = likesJson.length ? likesJson.map((el) => el.dog.id) : [];
      const likesRemoved = dogsJson.dogs.filter(
        (dog) => !likedIds.includes(dog.id)
      );
      originalArray = likesRemoved;
      dogsState = likesRemoved;
      setPotentialMatches(likesRemoved);
    }
  };
  useEffect(fetchPotentialMatches, []);

  const handleLike = async (dir, id) => {
    //First fetch matches
    const firstMatchesFetch = await fetch(
      "http://localhost:3333/like/matches",
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
    const firstRes = await firstMatchesFetch.json();
    const firstCount = firstRes.count;
    const firstMatches = firstRes.matches;
    //Like the dog
    const likeFetch = await fetch(`http://localhost:3333/like/${id}`, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
      body: JSON.stringify({ superlike: dir === "up" ? true : false }),
    });
    const json = await likeFetch.json();
    console.log(json);
    //send socket request that online users update current matches, might need to move/remove?
    socket.emit("matchRequest", usersInfo?.user?.id);

    //fetch matches again, see if there is a change
    const secondMatchesFetch = await fetch(
      "http://localhost:3333/like/matches",
      {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
      }
    );
    const secondRes = await secondMatchesFetch.json();
    const secondCount = secondRes.count;
    const secondMatches = secondRes.matches;
    //if there is a new match...
    if (secondCount > firstCount) {
      const newMatch = secondMatches.filter(
        (match) => !firstMatches.map((d) => d.id).includes(match.id)
      )[0];
      console.log("NEW FUCKING MATCH BABY: ", newMatch);
      const selfNote = await fetch(
        `http://localhost:3333/note/${usersInfo?.user?.id}`,
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          }),
          body: JSON.stringify({
            message: `You have a new match! Send ${newMatch.name} a chat.`,
            target: newMatch?.id,
          }),
        }
      );
      const targetNote = await fetch(`http://localhost:3333/note/${id}`, {
        method: "POST",
        headers: new Headers({
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        }),
        body: JSON.stringify({
          message: `You have a new match! Send ${usersInfo?.user?.dog?.name} a chat.`,
          target: usersInfo?.user?.id,
        }),
      });

      const targetJson = await targetNote.json();
      const selfJson = await selfNote.json();
      console.log("NOTIFICATION RESPONSES: ", selfJson, targetJson);
      socket.emit("notificationRequest", {
        userId: usersInfo?.user?.id,
        target: id
      });
    }
  };

  const swiped = (dir, idToDelete) => {
    console.log("removing :", idToDelete);
    setLastDirection(dir);
    alreadyRemoved.push(idToDelete);
    if (dir === "left" || dir === "down") return;
    handleLike(dir, idToDelete);
  };

  const outOfFrame = (id) => {
    console.log(id + " left the screen!");
    dogsState = dogsState.filter((dog) => dog.id !== id);
    setPotentialMatches(dogsState);
  };

  return (
    <>
      <div className="tinderCards__cardContainer">
        {potentialMatches.map((dog) => (
          <TinderCard
            preventSwipe={["down"]}
            className="swipe"
            key={dog.id}
            onSwipe={(dir) => swiped(dir, dog.id)}
            onCardLeftScreen={() => outOfFrame(dog.id)}
          >
            <Grid container justifyContent="center">
              <DogDisplay dog={dog} showingMatches="false" className="card" />
            </Grid>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? (
        <h2 key={lastDirection} className="infoText">
          You swiped {lastDirection}
        </h2>
      ) : (
        <h2 className="infoText">
          Swipe left to REJECT, swipe right to LIKE, swipe up to SUPERLIKE
        </h2>
      )}
    </>
  );
};

export default PotentialMatches;
