const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const DB = require("./db.js");
const bodyParser = require("body-parser");
const mountRoutes = require("./routes");

require("dotenv").config();

const app = express();
// middleware
app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
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

// TODO: SOCKET IO
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT || 3001;

http.listen(SOCKET_IO_PORT, () => {
  console.log(`listening on *:${SOCKET_IO_PORT}`);
});

io.on("connection", (socket) => {
  console.log("new client connected");
  socket.emit("connection", null);
});
// TODO: Direct messaging
