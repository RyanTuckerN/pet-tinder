require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

// app.use(require("./middleware/headers"));

app.use(express.json());

//USER ENDPOINT
const controllers = require("./controllers");

//PROTECTED ENDPOINTS
// app.use(require("./middleware/validate-session"));
app.use("/user", controllers.usercontroller);


db.authenticate()
  .then(() => db.sync())
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`🚢 Server listening on port ${process.env.PORT} 🚢`)  
    );
  })
  .catch((err) => {
    console.error(err);
  });
