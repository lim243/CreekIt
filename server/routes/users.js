const db = require("../db");
const express = require("express");
const router = express.Router();

// Encryption password
const bcrypt = require("bcrypt");
const saltRounds = 10;

module.exports = router;

// Router Functions
router.get("/", getUsers);
router.get("/:username", getOneUserByUsername);
router.get("/:username/email", getEmail);
router.get("/:username/name", getName);
router.get("/:username/username", getUsername); //TODO: Undefined
router.get("/:username/password", getPassword); //TODO: Undefined
router.get("/:username/gender", getGender);
router.get("/:username/dob", getDateOfBirth);
router.get("/:username/education", getEducation);
router.get("/:username/aboutme", getAboutMe);
router.get("/:username/photo", getPhoto);
router.get("/:username/following", getFollowing); //TODO: Undefined
router.get("/:username/followed", getFollowed); //TODO: Undefined
router.get("/:username/blocked", getBlocked); //TODO: Undefined
router.get("/:username/topics", getTopics); //TODO: Undefined
router.get("/:username/posts", getPosts); //TODO: Undefined

// SET ROUTER
router.post("/:username/password", setPassword);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

/**
 * GET FUNCTIONS
 */

async function getUsers(req, res) {
  const query = {
    name: "get-post",
    text: "SELECT * FROM users",
  };

  const result = await db.query(query);

  const { rows, rowCount } = result;
  // console.log("rows", rowCount, rows);
  const data = { rowCount, rows };

  // Send data back
  return res.status(200).json(data);
}
async function getOneUserByUsername(req, res) {
  // Params
  const username = req.params.username;

  const query = {
    name: "get-post",
    text: "SELECT * FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);

  const { rows, rowCount } = result;
  // console.log("rows", rowCount, rows);
  const data = { rowCount, rows };

  // Send data back
  return res.status(200).json(data);
}
async function getEmail(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT email FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);

  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getUsername(req, res) {} // TODO: Undefined yet
async function getName(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT name FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getPassword(username) {
  const query = {
    name: "get-password",
    text: "SELECT password FROM Users WHERE username = $1",
    values: [username],
  };

  console.log("query", query);

  const { rows } = await db.query(query);
  // console.log("res", res);

  return rows[0].password;
} // TODO: Undefined yet
async function getGender(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT gender FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getDateOfBirth(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT date_of_birth FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getEducation(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT education FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getAboutMe(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT about_me FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getPhoto(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT profile_photo FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getFollowing(req, res) {} // TODO: Undefined yet
async function getFollowed(req, res) {} // TODO: Undefined yet
async function getBlocked(req, res) {} // TODO: Undefined yet
async function getTopics(req, res) {} // TODO: Undefined yet
async function getPosts(req, res) {} // TODO: Undefined yet

/**
 * POST FUNCTIONS
 * A list of setter functions
 */
async function setEmail(req, res) {}
async function setUsername(req, res) {}
async function setName(req, res) {}
async function setPassword(req, res) {
  const { password } = req.body;
  const username = req.params.username;
  console.log("password", password);

  bcrypt.hash(password, saltRounds, (err, hashPw) => {
    // Now we can store the password hash in db.
    console.log("hashPw", hashPw);

    // Send to DB
    const query = {
      name: "update-password",
      text: "UPDATE Users SET password = $2 WHERE username = $1",
      values: [username, hashPw],
    };

    console.log("query", query);

    db.query(query).then((data) => {
      const msg = {
        "success": true,
        "payload": `User ${username}'s password updated`,
      };
      res.status(200).send(msg);
    });
  });
}
async function setGender(req, res) {}
async function setDateOfBirth(req, res) {}
async function setEducation(req, res) {}
async function setPhoto(req, res) {}
async function addFollowing(req, res) {}
async function addBlocked(req, res) {}

async function signUp(req, res) {
  const { username, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashPw) => {
    // Now we can store the password hash in db.
    console.log("hashPw", hashPw);

    const query = {
      name: "create-user",
      text: "INSERT INTO Users (username, password) VALUES ($1,$2)",
      values: [username, hashPw],
    };

    console.log("query", query);

    db.query(query)
      .then((data) => {
        const msg = {
          "success": true,
          "payload": `User ${username} created!`,
        };
        res.status(200).send(msg);
      })
      .catch((error) => {
        console.log("error", error);
        const msg = {
          "success": false,
          "payload": `ERROR ${error.code}: ${error.detail} - User ${username} was NOT created!`,
        };
        res.status(500).send(msg);
      });
  });
}

async function signIn(req, res) {
  const { username, password } = req.body;

  const hashedPw = await getPassword(username);
  console.log("hashedPw", hashedPw, password);

  bcrypt.compare(password, hashedPw, (err, result) => {
    if (result) {
      res.status(200).send("Login Success!");
    } else {
      res.status(500).send("Login failed!");
    }
  });
}
