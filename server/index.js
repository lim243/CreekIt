const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const DB = require("./db.js");
const mountRoutes = require("./routes");
require("dotenv").config();

const app = express();
// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev")); // For logging
mountRoutes(app);

// Connect to DB
DB.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log(`Connected to DB at port ${process.env.RDS_PORTNUMBER}`);
  }
});

// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server has already started at port ${port}`);
});
