const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const DB = require("./db.js");
require("dotenv").config();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // For logging

// Routes
app.get("/api/v1/", (req, res) => {
  // Make whatever calls to DB
  console.log("req", req.body);
});

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server has already started at port ${port}`);
});
