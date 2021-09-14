import React, { useState, useEffect, useMemo } from "react";
import DogDisplay from "../Profile/DogDisplay";
import { Grid } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import "../Profile/Profile.css";
import "./PotentialMatches.css";

const alreadyRemoved = [];
let dogsState, originalArray;

const PotentialMatches = (props) => {
  const {socket, usersInfo} = props
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
      const likedIds = likesJson.length? likesJson.map((el) => el.dog.id) : [] 
      const likesRemoved = dogsJson.dogs.filter(
        (dog) => !likedIds.includes(dog.id)
      );
      originalArray = likesRemoved;
      dogsState = likesRemoved;
      setPotentialMatches(likesRemoved);
    }
  };
  useEffect(fetchPotentialMatches, []);

  const handleLike = async(dir, id) => {
    const likeFetch = await fetch(`http://localhost:3333/like/${id}`, {
      method: 'POST',
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('token') 
      }),
      body: JSON.stringify({superlike: dir==='up'?true : false})
    })
    const json = await likeFetch.json()
    console.log(json)
    socket.emit("newLogin", usersInfo.user.id);

  
  }

  const swiped = (dir, idToDelete) => {
    console.log("removing :", idToDelete);
    setLastDirection(dir);
    alreadyRemoved.push(idToDelete);
    if(dir==='left' || dir==='down')return
    handleLike(dir, idToDelete)
  };

  const outOfFrame = (id) => {
    console.log(id + " left the screen!");
    dogsState = dogsState.filter((dog) => dog.id !== id);
    setPotentialMatches(dogsState);
  };

  return (
    <>
      <div className="tinderCards__cardContainer">
        {potentialMatches.map((dog, index) => (
          <TinderCard
            preventSwipe={["down"]}
            // ref={childRefs[index]}
            className="swipe"
            key={dog.id}
            onSwipe={(dir) => swiped(dir, dog.id)}
            onCardLeftScreen={() => outOfFrame(dog.id)}
          >
            <Grid container justifyContent='center'>
              <DogDisplay dog={dog} showingMatches='false' className="card" />
            </Grid>
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe left to REJECT, swipe right to LIKE, swipe up to SUPERLIKE</h2>}
    </>
  );
};

export default PotentialMatches;
