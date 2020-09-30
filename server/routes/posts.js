const db = require("../db");
const express = require("express");
const router = express.Router();

module.exports = router;

// Router Functions
router.get("/", getPost);

router.post("/new", createPost);

/**
 * GET FUNCTIONS
 */

async function getPost(req, res) {
  const { id } = req.body;

  const query = {
    name: "create-post",
    text: "SELECT * FROM posts WHERE id = $1;",
    values: [id],
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function getTopic(req, res) {}
async function getUpvotes(req, res) {}
async function getUpvotesUsers(req, res) {}
async function getDownvotes(req, res) {}
async function getDownvoteUsers(req, res) {}
async function getPostComments(req, res) {}
async function getSaved(req, res) {}
async function getId(req, res) {}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */

async function createPost(req, res) {
  const { username, body, topic } = req.body;

  // Date
  date = Date.now();
  // console.log("date", date);

  // console.log("username", username);

  const query = {
    name: "create-post",
    text:
      "INSERT INTO posts (username, date, body, topic) VALUES ($1, to_timestamp($2/1000.0), $3, $4) RETURNING id",
    values: [username, date, body, topic],
  };

  const { rows } = await db.query(query);

  // console.log("rows", result);
  // Send data back
  const msg = {
    success: true,
    postId: rows[0].id,
  };
  return res.status(200).json(msg);
}
async function setTopic(req, res) {}
async function setUpvotes(req, res) {}
async function setUpvotesUsers(req, res) {}
async function setDownvotes(req, res) {}
async function setDownvoteUsers(req, res) {}
async function setPostComments(req, res) {}
async function setSaved(req, res) {}
async function setId(req, res) {}
async function addPostComments(req, res) {}
async function addSaved(req, res) {}
