const db = require("../db");
const express = require("express");
const router = express.Router();

module.exports = router;

// Router Functions

router.get("/:pid", getPost);
router.get("/:pid/upvotes", getUpvotesUsers);
router.get("/:pid/downvotes", getDownvoteUsers);
router.get("/:pid/comments", getComments);

router.get("/:uid/somepost", getAllPosts);

router.post("/new", createPost);
router.post("/:pid/upvote", setUpvote);
router.post("/:pid/downvote", setDownvote);
router.post("/:pid/newcomment", addPostComments);
router.post("/:pid/deletepost", deleteposts);

router.post("/:pid/topic", setTopic);

/**
 * GET FUNCTIONS
 */
async function getAllPosts(req, res) {
  uname = req.params.uid;
  // console.log(uname);
  const query = {
    name: "get-all-post",
    text: `SELECT p.id as post_id, p.username, u.name, encode(u.profile_picture,'base64') as profile_picture, p.date as date, p.anonymous,
      p.body, p.topic, array_length(p.upvote_users, 1) as upvotes, array_length(p.downvote_users, 1) as downvotes, p.upvote_users, p.downvote_users, p.comment_ids
      FROM posts as p, users as u WHERE (p.username = u.username AND p.username in (select unnest(following) from users where username = $1)) OR (p.username = u.username AND p.username = $1 ) ORDER BY p.date DESC`,
    values: [uname],
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
    text: `SELECT p.id as post_id, p.username, u.name, encode(u.profile_picture,'base64') as profile_picture, p.date as date, p.body, p.topic, 
      array_length(p.upvote_users, 1) as upvotes, array_length(p.downvote_users, 1) as downvotes,
      p.upvote_users, p.downvote_users, p.comment_ids , p.anonymous
      FROM posts as p, users as u 
      WHERE p.id = $1 AND p.username = u.username;`,
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

async function getTopics(req, res) {
  const { topic } = req.body;
  console.log("topic", topic);

  const query = {
    name: "get-topics",
    text: `SELECT p.id as post_id, p.username, u.name, u.profile_photo, 
    p.date as date,
    p.body, p.topic, p.upvotes, p.downvotes, 
    array_length(p.upvote_users, 1) as upvotes, array_length(p.downvote_users, 1) as downvotes,
    p.comment_ids  
    FROM posts as p, users as u 
    WHERE p.topic = $1 AND p.username = u.username;`,
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
  // console.log("rows", rows);
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
    text: `SELECT u.name, c.username as username, c.date as date, encode(u.profile_picture,'base64') as profile_picture,
    c.body , array_length(c.upvote_users, 1) as upvotes, array_length(c.downvote_users, 1) as downvotes, c.upvote_users ,
    c.downvote_users  , c.parent_id , c.anonymous
    FROM posts as p, comments as c, users as u
    WHERE p.id = $1 and p.id = c.parent_id 
	  AND u.username = c.username
    ORDER BY c.date DESC;`,
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
  // console.log("req.body", req.body);
  // Date
  date = Date.now();

  const query1 = {
    name: "create-post",
    text:
      "INSERT INTO posts (username, date, body, topic, anonymous) VALUES ($1, to_timestamp($2/1000.0), $3, $4, $5) RETURNING id",
    values: [username, date, body, topic, anonymous],
  };
  const { rows } = await db.query(query1);
  // console.log(rows);
  let id = rows[0].id;
  const query2 = {
    name: "append-post",
    text: "update users set posts = array_append(posts,$1) where username  = $2;",
    values: [id, username],
  };

  const { rows2 } = await db.query(query2);

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
  // console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
async function setUpvote(req, res) {
  const pid = req.params.pid;
  const { username } = req.body;

  const query = {
    name: "set-upvote",
    text: `WITH src as (
      UPDATE posts
      SET upvotes = upvotes + 1, upvote_users = array_append(upvote_users, $2::character varying),  downvote_users = array_remove(downvote_users, $2::character varying)
      WHERE id = $1::bigint AND NOT ($2 = any(upvote_users)) RETURNING id
      )
    UPDATE users dst
    SET interacted_post = array_append(dst.interacted_post, src.id::bigint)
    FROM src
    where dst.username = $2 AND NOT (src.id = any(dst.interacted_post)) returning src.id`,
    values: [pid, username],
  };

  // console.log("query", query);

  const { rows } = await db.query(query);
  // console.log("rows", rows);
  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}
// async function setUpvotesUsers(req, res) {}
async function setDownvote(req, res) {
  const pid = req.params.pid;
  const { username } = req.body;

  const query = {
    name: "set-downvote",
    text: `WITH src as (
      UPDATE posts 
      SET downvotes = downvotes + 1, downvote_users = array_append(downvote_users, $2::character varying) , upvote_users = array_remove(upvote_users, $2::character varying)
      WHERE id = $1::bigint AND NOT ($2 = any(downvote_users)) RETURNING id
      )
    UPDATE users dst
    SET interacted_post = array_append(dst.interacted_post, src.id::bigint)
    FROM src
    where dst.username = $2 AND NOT (src.id = any(dst.interacted_post)) returning src.id`,
    values: [pid, username],
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
// async function setDownvoteUsers(req, res) {}
async function setPostComments(req, res) {}
async function setSaved(req, res) {}
// async function setId(req, res) {}
async function addPostComments(req, res) {
  const pid = req.params.pid;
  const { username, body, anonymous } = req.body;
  // console.log("req.body", req.body);
  // Date
  date = Date.now();
  const query = {
    name: "create-post",
    text: `WITH src as (
        INSERT INTO public.comments
        (username, date, body, parent_id, anonymous) 
        VALUES ($1, to_timestamp($2/1000.0), $3, $4, $5) RETURNING *
      )
    UPDATE users dst
      SET interacted_post = array_append(dst.interacted_post, src.parent_id::bigint)
      FROM src
      WHERE dst.username = $1 AND NOT (src.parent_id = any(dst.interacted_post)) RETURNING src.id`,
    values: [username, date, body, pid, anonymous],
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

async function deleteposts(req, res) {
  const pid = req.params.pid;
  //const { username, body, anonymous } = req.body;
  console.log("req.body", req.body);
  //TODO: delete comment
  const query1 = {
    name: "delete comments",
    text: "delete from comments where parent_id = $1;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [pid],
  };
  const query2 = {
    name: "delete post",
    text: `delete from posts where id = $1 RETURNING id`,
    values: [pid],
  };

  const { rows1 } = await db.query(query1);
  const { rows2 } = await db.query(query2);

  // console.log("rows", result);
  // Send data back
  const msg = {
    success: true,
    commentId: rows1[0].id,
  };
  return res.status(200).json(msg);
}
