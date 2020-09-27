// const Router = require("express-promise-router");
const db = require("../db");
const express = require("express");
const router = express.Router();

module.exports = router;

// Router Functions
router.get("/", getUsers);
router.get("/:username", getOneUserByUsername);
router.use("/:username/email", getEmail);
router.use("/:username/name", getName);
router.use("/:username/username", getUsername); //TODO: Undefined
router.use("/:username/password", getPassword); //TODO: Undefined
router.use("/:username/gender", getGender);
router.use("/:username/dob", getDateOfBirth);
router.use("/:username/education", getEducation);
router.use("/:username/aboutme", getAboutMe);
router.use("/:username/photo", getPhoto);
router.use("/:username/following", getFollowing); //TODO: Undefined
router.use("/:username/followed", getFollowed); //TODO: Undefined
router.use("/:username/blocked", getBlocked); //TODO: Undefined
router.use("/:username/topics", getTopics); //TODO: Undefined
router.use("/:username/posts", getPosts); //TODO: Undefined

// TODO: Remove this is just an EXAMPLE of POST
router.post("/posts", async (req, res) => {
  console.log("req.body", req.body);
  const body = req.body;

  const query = {
    name: "create-post",
    text: "INSERT INTO POST (POSTID, POSTCONTENT) VALUES ($1, $2)",
    values: [body.id, body.content],
    rowMode: "array",
  };

  console.log("query", query);

  const { rows } = await db.query(query);
  // console.log("rows", rows);

  console.log("results", rows);

  res.status(201).send(rows);
});

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
async function getPassword(req, res) {} // TODO: Undefined yet
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
async function setPassword(req, res) {}
async function setGender(req, res) {}
async function setDateOfBirth(req, res) {}
async function setEmail(req, res) {}
async function setEducation(req, res) {}
async function setPhoto(req, res) {}
async function addFollowing(req, res) {}
async function addBlocked(req, res) {}
