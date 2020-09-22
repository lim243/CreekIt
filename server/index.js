const express = require("express");
const app = express();
const cors = require("cors");
const { Client } = require("pg");
require("dotenv").config();

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("Server has already started at port 5000");
});

// Database Client
const db = new Client({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORTNUMBER,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

// Connect to DB
db.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log("Connected to DB");
  }
});
