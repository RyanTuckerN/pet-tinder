import React, { useState, useEffect, useMemo } from "react";
import DogDisplay from "../Profile/DogDisplay";
import TinderCard from "react-tinder-card";
import "../Profile/Profile.css";
import "./PotentialMatches.css";

const alreadyRemoved = [];
let dogsState, originalArray;

const PotentialMatches = (props) => {
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [lastDirection, setLastDirection] = useState();

  const childRefs = useMemo(
    () =>
      Array(potentialMatches.length)
        .fill(0)
        .map((i) => React.createRef()),
    []
  );

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

  const swipe = (dir) => {
    const cardsLeft = potentialMatches.filter(
      (dog) => !alreadyRemoved.includes(dog.id)
    );
    if (cardsLeft.length) {
      const toBeRemoved = cardsLeft[cardsLeft.length - 1].id; // Find the card object to be removed
      const index = originalArray.map((dog) => dog.id).indexOf(toBeRemoved); // Find the index of which to make the reference to
      alreadyRemoved.push(toBeRemoved); // Make sure the next card gets removed next time if this card do not have time to exit the screen
      childRefs[index].current.swipe(dir); // Swipe the card!
    }
  };

  return (
    <>
      <div className="tinderCards__cardContainer">
        {/* BELOW: This loops through the array (loops through - outputs info, loops through again - outputs info, etc. )  */}
        {potentialMatches.map((dog, index) => (
          <TinderCard
            // onCardLeftScreen={() => onCardLeftScreen(dog.id)}
            // className="swipe"
            // onSwipe={onSwipe}
            // key={dog.id} //ALWAYS give keys in REACT (even if you don't see the benefit immediately) because it allows React to efficiently re-render a List which makes your app super fast.
            preventSwipe={["down"]}
            ref={childRefs[index]}
            className="swipe"
            key={dog.id}
            onSwipe={(dir) => swiped(dir, dog.id)}
            onCardLeftScreen={() => outOfFrame(dog.id)}
          >
            <DogDisplay dog={dog} className="card" />
          </TinderCard>
        ))}
      </div>
      {lastDirection ? <h2 key={lastDirection} className='infoText'>You swiped {lastDirection}</h2> : <h2 className='infoText'>Swipe a card or press a button to get started!</h2>}
    </>
  );
};

export default PotentialMatches;
