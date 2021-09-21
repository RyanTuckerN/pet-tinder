import React, { useState, useEffect } from "react";
import DogDisplay from "../Profile/DogDisplay";
import { Grid, Radio, Typography } from "@material-ui/core";
import TinderCard from "react-tinder-card";
import "../Profile/Profile.css";
import "./PotentialMatches.css";
// import distanceBetCoor from "../../functions/distanceBetCoor";

const alreadyRemoved = [];
let dogsState, originalArray;

const PotentialMatches = (props) => {
  const { socket, usersInfo } = props;
  const [potentialMatches, setPotentialMatches] = useState([]);
  const [lastDirection, setLastDirection] = useState();
  const [potentialFilter, setPotentialFilter] = useState(null);
  // const [value, setValue] = React.useState(null);

  // const handleChange = e => setValue(e.target.value)

  // const handleMaleFilter = () => setPotentialFilter('males')
  // const handleFemaleFilter = () => setPotentialFilter('females')
  // const handle100Filter = () => setPotentialFilter('100')
  // const handle50Filter = () => setPotentialFilter('50')
  // const handle25Filter = () => setPotentialFilter('25')
  // const handle10Filter = () => setPotentialFilter('10')

  const fetchPotentialMatches = async (filter) => {
    try {
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
        const likedIds = likesJson.length
          ? likesJson.map((el) => el.dog.id)
          : [];
        const likesRemoved = dogsJson.dogs.filter(
          (dog) => !likedIds.includes(dog.id)
        );
        originalArray = likesRemoved;
        dogsState = likesRemoved;
        setPotentialMatches(likesRemoved);

        // switch (filter) {
        //   case "males":
        //     setPotentialMatches(likesRemoved.filter((d) => !d.is_female));
        //     break;
        //   case "females":
        //     setPotentialMatches(likesRemoved.filter((d) => d.is_female));
        //     break;
        //   case "100":
        //     setPotentialMatches(
        //       likesRemoved.filter((d) => {
        //         return distanceBetCoor.calcMiles([
        //           d.location?.lat,
        //           d.location?.lon,
        //           usersInfo?.user?.dog?.location?.lat,
        //           usersInfo?.user?.dog?.location?.lon,
        //         ]) < 100;
        //       })
        //     );
        //     break;
        //   case "50":
        //     setPotentialMatches(
        //       likesRemoved.filter((d) => {
        //         return distanceBetCoor.calcMiles([
        //           d.location?.lat,
        //           d.location?.lon,
        //           usersInfo?.user?.dog?.location?.lat,
        //           usersInfo?.user?.dog?.location?.lon,
        //         ]) < 50;
        //       })
        //     );
        //     break;
        //   case "25":
        //     setPotentialMatches(
        //       likesRemoved.filter((d) => {
        //         return distanceBetCoor.calcMiles([
        //           d.location?.lat,
        //           d.location?.lon,
        //           usersInfo?.user?.dog?.location?.lat,
        //           usersInfo?.user?.dog?.location?.lon,
        //         ]) < 25;
        //       })
        //     );
        //     break;
        //   case "10":
        //     setPotentialMatches(
        //       likesRemoved.filter((d) => {
        //         return distanceBetCoor.calcMiles([
        //           d.location?.lat,
        //           d.location?.lon,
        //           usersInfo?.user?.dog?.location?.lat,
        //           usersInfo?.user?.dog?.location?.lon,
        //         ]) < 10;
        //       })
        //     );
        //     break;
        //   default:
        //     setPotentialMatches(likesRemoved);
        //     break;
        // }
      }
    } catch (err) {
      console.error(err);
      alert("There was an error! Please try again.");
    }
  };
  useEffect(() => fetchPotentialMatches(potentialFilter), [potentialFilter]);

  const handleLike = async (dir, id) => {
    try {
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
        console.log("NEW MATCH: ", newMatch);
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
          target: id,
        });
      }
    } catch (err) {
      console.error(err);
      alert("There was an error! Please try again");
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

  return usersInfo?.user?.dog ? (
    <>
      {lastDirection ? (
        <Typography variant='h6'
          key={lastDirection}
          className="infoText"
          style={{ color:'#574949', marginTop:15 }}
        >
          {lastDirection === "left"
            ? "REJECTED!"
            : lastDirection === "up"
            ? "SUPERLIKE!"
            : "LIKED!"}
        </Typography>
      ) : (
        <Typography variant='h6' className="infoText" style={{color:'#574949', marginTop:15}}>
          Swipe left to REJECT, swipe right to LIKE, swipe up to SUPERLIKE
        </Typography>
      )}
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
              <DogDisplay
                dog={dog}
                usersInfo={usersInfo}
                showingMatches="false"
                className="card"
              />
            </Grid>
          </TinderCard>
        ))}
      </div>
      {/* <div>
      <Radio
        checked={value === 'a'}
        onChange={handleFemaleFilter}
        value="a"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'A' }}
      />
      <Radio
        checked={value === 'b'}
        onChange={handleMaleFilter}
        value="b"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'B' }}
      />
      <Radio
        checked={value === 'c'}
        onChange={handle100Filter}
        value="c"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'C' }}
      />
      <Radio
        checked={value === 'd'}
        onChange={handle50Filter}
        value="d"
        // color="default"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'D' }}
      />
      <Radio
        checked={value === 'e'}
        onChange={handle25Filter}
        value="e"
        name="radio-button-demo"
        inputProps={{ 'aria-label': 'E' }}
      />
      <Radio
        checked={value === 'f'}
        onChange={handle10Filter}
        value="f"
        inputProps={{ 'aria-label': 'F' }}
        // size="small"
      />
    </div> */}
    </>
  ) : (
    <Typography variant='h6'>
      You need to create a profile for your dog before you can see potential
      matches!
    </Typography>
  );
};

export default PotentialMatches;
