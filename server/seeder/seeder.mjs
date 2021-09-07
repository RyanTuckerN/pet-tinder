import fetch from "node-fetch";
const port = process.env.PORT || 3333;
import dogOptions from "./dogOptions.js";

const petTinderSeeder = async () => {
  for (let i = 1; i <= 20; i++) {
    const userBody = {
      profile_name: `user${i}`,
      name: `${dogOptions.names[i]}'s breeder`,
      password: "password",
      email: `test${i}@test.com`,
      location: {
        zip: 46200 + Math.floor(Math.random() * 30),
        lat: 39 + Math.random(),
        lon: -89 + Math.random(),
      },
    };

    const seedThatDB = async () => {
      const user = await fetch(`http://localhost:${port}/user/signup`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(userBody),
        headers: {
          "Content-type": "application/json",
        },
      });
      const userJson = await user.json();
      // users[i] = json;
      console.log(userJson);
      const sliceNum = Math.floor(Math.random() * 16);
      const dogBody = {
        name: dogOptions.names[i],
        photo_url: dogOptions.pic,
        breed: dogOptions.breeds[Math.floor(Math.random() * 454)],
        weight: Math.floor(Math.random() * (100 - 15) + 15),
        age: Math.floor(Math.random() * (10 - 2) + 2),
        ad_description: dogOptions.ipsum,
        is_female: i % 2 === 0 ? true : false,
        temperament: dogOptions.temp.slice(sliceNum, sliceNum + 2),
      };
      const dog = await fetch(`http://localhost:${port}/dog/`, {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(dogBody),
        headers: {
          "Content-type": "application/json",
          Authorization: userJson.sessionToken,
        },
      });
      const dogJson = await dog.json();
      console.log(dogJson);

      for (let i = 0; i <= 20; i++) {
        const likeBody = { superlike: i % 2 === 0 ? true : false };
        const like = await fetch(
          `http://localhost:${port}/like/${Math.floor(Math.random() * 20 + 1)}`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(likeBody),
            headers: {
              "Content-type": "application/json",
              Authorization: userJson.sessionToken,
            },
          }
        );
        const likeJson = await like.json();
        console.log(likeJson);
      }
    };
    seedThatDB();
  }
};
console.log("🖥🖥🖥 SEEDING THE DB 🖥🖥🖥");
petTinderSeeder();
// console.log(dogOptions)
// console.log(result)

const users = [
  {
    user: {
      id: 14,
      profile_name: "user13",
      name: "Chewy's breeder",
      passwordhash:
        "$2a$13$OkTJR9yX/LBdu9BXBxioUur6m7sTzXTMZKUEvgoubM.YppM6GP5xC",
      email: "test13@test.com",
      location: {
        zip: 46208,
        lat: 39.850398890629485,
        lon: -88.88212913199885,
      },
      updatedAt: "2021-09-06T02:37:44.666Z",
      createdAt: "2021-09-06T02:37:44.666Z",
    },
    message: "Success! Profile for user13 created!",
    sessionToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTYzMDg5NTg2OCwiZXhwIjoxNjMwOTgyMjY4fQ.DAdtFktpC9dQqcHMEZU0OjNf84E3nW5S5OTrqvXOhW0",
  },
  {
    user: {
      id: 15,
      profile_name: "user16",
      name: "Cadbury's breeder",
      passwordhash:
        "$2a$13$1.bgG48sb0u1aNrzTycMAeVdojk79hfmyVKbAeI7x52Tpvvv4Usle",
      email: "test16@test.com",
      location: { zip: 46203, lat: 39.86142308821627, lon: -88.9930866030501 },
      updatedAt: "2021-09-06T02:37:45.245Z",
      createdAt: "2021-09-06T02:37:45.245Z",
    },
    message: "Success! Profile for user16 created!",
    sessionToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUsImlhdCI6MTYzMDg5NTg2OCwiZXhwIjoxNjMwOTgyMjY4fQ.zypnzIMXF7wvs55r3xGf5xco6zir8eGP_btmGNdDMPI",
  },
  {
    user: {
      id: 16,
      profile_name: "user17",
      name: "Wrigley's breeder",
      passwordhash:
        "$2a$13$GzItsekvFzXqEkPEWGX6A.SjBCcupY2NsCU6zj5xNqAAiz1XXbpkO",
      email: "test17@test.com",
      location: { zip: 46225, lat: 39.33406276199805, lon: -88.55464470524 },
      updatedAt: "2021-09-06T02:37:45.827Z",
      createdAt: "2021-09-06T02:37:45.827Z",
    },
    message: "Success! Profile for user17 created!",
    sessionToken:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYsImlhdCI6MTYzMDg5NTg2OCwiZXhwIjoxNjMwOTgyMjY4fQ.z-ocH8WXcf11bf9oZiIiga-HLfeSPJco-fOvZmrTCAI",
  },
];
