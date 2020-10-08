const db = require("../db");
const express = require("express");
const router = express.Router();

module.exports = router;

// Router Functions
router.get("/:topic", getTopics)

/**
 * GET FUNCTIONS
 */
async function getTopics(req, res) {
  const topic = req.params.topic;
  console.log('topic', topic);

  const query = {
    name: "get-topics",
    text: `SELECT p.id as post_id, p.username, u.name, u.profile_photo, 
    to_char(p.date, 'YYYY-MM-DD') as date,to_char(p.date, 'HH24:MI') as time, 
    p.body, p.topic, p.upvotes, p.downvotes, 
    p.upvote_users, p.downvote_users, p.comment_ids  
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