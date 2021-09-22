const { Sequelize } = require("sequelize");

const db = new Sequelize(
  // "pet-tinder",
  // process.env.dbName,
  // process.env.dbPass,
  process.env.DATABASE_URL,
  {
    // host: "localhost",
    dialect: "postgres",
    logging: false //comment out for SQL commands in console
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