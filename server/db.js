const { Sequelize } = require("sequelize");

const db = new Sequelize(
  "journal-walkthrough",
  process.env.dbName,
  process.env.dbPass,
  {
    host: "localhost",
    dialect: "postgres",
  }
)

async function sqlize() {
  try {
    await db.authenticate()  
    console.log("🔥🔥🔥 Connection has been established successfully. 🔥🔥🔥")
  } catch (err) {
    console.error("😱😱😱 Unable to connect to the database: 😱😱😱", err)       
  }
}

sqlize()

module.exports = db;