const { Client } = require("pg");
require("dotenv").config();

// Database Client
const client = new Client({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORTNUMBER,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

// Connect to DB
const db = client.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Connected to DB");
  }
});

module.exports = db;
