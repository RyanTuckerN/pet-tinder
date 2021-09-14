import React, { useState, useEffect } from "react";
import DogDisplay from "../Profile/DogDisplay";
import '../Profile/Profile.css'
const dog = {
  id: 4,
  name: "Lassie",
  photo_url:
    "https://images.unsplash.com/photo-1588344862058-0072276d3542?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y2FuZSUyMGNvcnNvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
  breed: "Irish Setter",
  weight: 27,
  age: 3,
  ad_description:
    "Pit bull lap dog puppies chihuahua, german shephard peanut butter growl milk bone pomeranian sit. Squirrel stand english mastiff release dog bone growl dog bone, jump milk bone lab greyhound take it heel. Tennis ball stay jump beagle sit pretty german shephard pomsky. Dog milk bone bulldog german shephard dachshund, puppy speak shih tzu stand husky bark doberman pinscher dog stay. Bell bulldog release Morkie great dance paw tennis ball leash bulldog, dog come yorkshire terrier german shephard.",
  temperament: ["Loving", "Protective"],
  is_female: true,
  location: { zip: 46202, lat: 39.0431477052854, lon: -88.23562207044014 },
  createdAt: "2021-09-08T05:12:00.606Z",
  updatedAt: "2021-09-08T05:12:00.606Z",
  userId: 4,
};

const PotentialMatches = (props) => {
  const { usersInfo } = props;
  const [potentialMatches, setPotentialMatches] = useState([]);

  const fetchPotentialMatches = async () => {
    const allDogs = await fetch("http://localhost:3333/dog/all/", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      }),
    });
    const dogsJson = await allDogs.json();
    if (usersInfo?.user) {
      //COMPARING ALL DOGS TO THE ARRAY OF MATCHES, REMOVING MATCHES!
      setPotentialMatches(
        dogsJson.dogs.filter(
          (dog) => !usersInfo.matches.map((d) => d.id).includes(dog.id)
        )
      );
    }
  };
  useEffect(fetchPotentialMatches, [usersInfo]);

  // return (
  //   <div>
  //     Hello from PotentialMatches!
  //     <ul>
  //       {potentialMatches.length ? (
  //         potentialMatches.map((dog) => <li key={dog.id}>{dog.name}</li>)
  //       ) : (
  //         <>...Connecting</>
  //       )}
  //     </ul>
  //   </div>
  // );

  return (
    <div id='tinder-wrapper'>
      <DogDisplay dog={dog} />
    </div>
  )
};

export default PotentialMatches;
