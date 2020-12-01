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

// TODO: Direct messaging

// Connect to DB
DB.connect((err) => {
  if (err) {
    console.error("connection error", err.stack);
  } else {
    console.log(`Connected to DB at port ${process.env.RDS_PORTNUMBER}`);
  }
});




// TODO: SOCKET IO
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "*",
  },
});

const SOCKET_IO_PORT = process.env.SOCKET_IO_PORT || 8081;

http.listen(SOCKET_IO_PORT, () => {
  console.log(`listening on *:${SOCKET_IO_PORT}`);
});

const db = require('./db')
async function API_sendMessage(in_data) {
  console.log('data', in_data);
  const username_A = in_data.username1 
  const username_B = in_data.username2 
  const body = in_data.messages[0].messageText 
  const sender = in_data.username1 === in_data.title ? in_data.username2 : in_data.username1

  const time = Date.now();

  const query = {
    name: "send-message",
    text: `UPDATE direct_message 
      SET body = array_append(body, cast($3 AS character varying)),
        sender = array_append(sender, cast($4 AS character varying)),
        times = array_append(times, to_timestamp($5/1000.0)),
        last_updated_time = to_timestamp($5/1000.0)
      WHERE username1 = $1 AND username2 = $2 OR username2 = $1 AND username1 = $2
      RETURNING *`,
    values: [username_A, username_B, body, sender, time],
  };

  db.query(query)
    .then((res1) => {
      const convoId = res1.rows[0].id;
      const data = { success: true, payload: convoId };
      
      return data
    })
    .catch((error) => console.error(error));
}

io.on("connection", (socket) => {
  console.log(`new client at ${socket.id} connected`);

  socket.on('init', (user) => {
    console.log('user', user);
  })

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`);
  });

  socket.on("sendMessage", (data) => {

    // convoId, messages, usernames, title, createdAt
    API_sendMessage(data)
    
    // TODO: Connect sending message with routes folder
    console.log('MSG DATA', data);
    io.emit("getMessage", data)
  })

  socket.on("send.message", (message) => {
    console.log('got message', message);
    io.emit("message", message)
  })
});

app.set('socketio', io);
mountRoutes(app);




// Start Server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server has already started at port ${port}`);
});