require("dotenv").config();
const express = require("express");
const db = require("./db");
const app = express();

db.sync()
// db.drop()
// app.use(require("./middleware/headers"));

app.use(express.json());
const controllers = require("./controllers");

//USER ENDPOINT
app.use("/user", controllers.usercontroller);

//PROTECTED ENDPOINTS
// app.use(require("./middleware/validate-session"));
app.use("/dog", controllers.dogcontroller)

app.listen(process.env.PORT, () =>
  console.log(`🚢 Server listening on port ${process.env.PORT} 🚢`)
);
