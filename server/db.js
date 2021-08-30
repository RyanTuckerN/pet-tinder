const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "pet-tinder",
  process.env.dbName,
  process.env.dbPass,
  {
    host: "localhost",
    dialect: "postgres",
  }
)

async function authenticateDB() {
  try {
    await db.authenticate()  
    console.log("🔥🔥🔥 Connection has been established successfully. 🔥🔥🔥")
  } catch (err) {
    console.error("😱😱😱 Unable to connect to the database: 😱😱😱", err)       
  }
}

authenticateDB()

module.exports = db;