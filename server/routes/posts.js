const db = require("../db");
const express = require("express");
const router = express.Router();

module.exports = router;

// Router Functions
router.get("/", getAllPosts);
router.get("/:pid", getPost);
router.get("/topic", getTopic);
router.get("/:pid/upvotes", getUpvotesUsers);
router.get("/:pid/downvotes", getDownvoteUsers);
router.get("/:pid/comments", getComments);

router.post("/new", createPost);
router.post("/:pid/upvote", setUpvote);
router.post("/:pid/downvote", setDownvote);
router.post("/:pid/newcomment", addPostComments);

router.post("/:pid/topic", setTopic);

/**
 * GET FUNCTIONS
 */
async function getAllPosts(req, res) {
  const query = {
    name: "get-all-post",
    text:
      "SELECT p.username, u.name, u.profile_photo, to_char(p.date, 'YYYY-MM-DD') as date, to_char(p.date, 'HH24:MI') as time, p.body, p.topic, p.upvotes, p.downvotes, p.upvote_users, p.downvote_users, p.comment_ids  FROM posts as p, users as u WHERE p.username = u.username ORDER BY p.date DESC",
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}

async function getPost(req, res) {
  const pid = req.params.pid;

  const query = {
    name: "get-post",
    text:
      "SELECT p.username, u.name, u.profile_photo, p.date, p.body, p.topic, p.upvotes, p.downvotes, p.upvote_users, p.downvote_users, p.comment_ids  FROM posts as p, users as u WHERE p.id = $1 AND p.username = u.username;",
    values: [pid],
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}

async function getTopic(req, res) {
  const { topic } = req.body;

  const query = {
    name: "get-topic",
    text: "SELECT * FROM posts WHERE topic = $1;",
    values: [topic],
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function getUpvotesUsers(req, res) {
  const pid = req.params.pid;

  const query = {
    name: "get-upvotes",
    text:
      "SELECT upvote_users, array_length(upvote_users,1) as count  FROM posts WHERE id = $1;",
    values: [pid],
  };

  const { rows } = await db.query(query);
  console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function getDownvoteUsers(req, res) {
  const pid = req.params.pid;

  const query = {
    name: "get-downvotes",
    text:
      "SELECT downvote_users, array_length(downvote_users,1) as count  FROM posts WHERE id = $1;",
    values: [pid],
  };

  const { rows } = await db.query(query);
  // console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function getComments(req, res) {
  const pid = req.params.pid;

  const query = {
    name: "get-all-post-comments",
    text: `SELECT c.usename username, c.date , c.body , c.upvotes , c.upvotes_user , c.downvotes  , 
    c.downvote_users  , c.parent_id  
    FROM public.posts as p, public.comments as c
    where p.id = $1 and p.id = c.parent_id
    order by c.date DESC;`,
    values: [pid],
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */

async function createPost(req, res) {
  const { username, body, topic, anonymous } = req.body;
  console.log("req.body", req.body);
  // Date
  date = Date.now();

  const query = {
    name: "create-post",
    text:
      "INSERT INTO posts (username, date, body, topic, anonymous) VALUES ($1, to_timestamp($2/1000.0), $3, $4, $5) RETURNING id",
    values: [username, date, body, topic, anonymous],
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
async function setTopic(req, res) {
  const pid = req.params.pid;
  const { topic } = req.body;

  const query = {
    name: "set-topic",
    text: "UPDATE posts SET topic = $2 where id = $1 RETURNING id",
    values: [pid, topic],
  };

  const { rows } = await db.query(query);
  console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function setUpvote(req, res) {
  // TODO: Need to worry about "A user can only upvote or downvote"
  const pid = req.params.pid;
  const { username } = req.body;

  const query = {
    name: "set-upvote",
    text:
      "UPDATE posts SET upvotes = upvotes + 1, upvote_users = array_append(upvote_users, $2) where id = $1 RETURNING id",
    values: [pid, username],
  };

  const { rows } = await db.query(query);
  console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
// async function setUpvotesUsers(req, res) {}
async function setDownvote(req, res) {
  // TODO: Need to worry about "A user can only upvote or downvote"
  const pid = req.params.pid;
  const { username } = req.body;

  const query = {
    name: "set-downvote",
    text:
      "UPDATE posts SET downvotes = downvotes + 1, downvote_users = array_append(downvote_users, $2) where id = $1 RETURNING id",
    values: [pid, username],
  };

  const { rows } = await db.query(query);
  console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
// async function setDownvoteUsers(req, res) {}
async function setPostComments(req, res) {}
async function setSaved(req, res) {}
// async function setId(req, res) {}
async function addPostComments(req, res) {
  const pid = req.params.pid;
  const { username, body } = req.body;
  console.log("req.body", req.body);
  // Date
  date = Date.now();

  const query = {
    name: "create-post",
    text: `INSERT INTO public.comments
        (username, date, body, parent_id) 
        VALUES ($1, to_timestamp($2/1000.0), $3, $4) RETURNING id`,
    values: [username, date, body, pid],
  };

  const { rows } = await db.query(query);

  // console.log("rows", result);
  // Send data back
  const msg = {
    success: true,
    commentId: rows[0].id,
  };
  return res.status(200).json(msg);
}
