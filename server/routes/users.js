const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("/", getUsers);

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
    text: "SELECT * FROM USERS",
    rowMode: "array",
  };

  const { rows } = await db.query(query);

  console.log("results", rows);

  res.status(200).send(rows);
}
async function getOneUserById(req, res) {}
async function getEmail(req, res) {}
async function getUsername(req, res) {}
async function getName(req, res) {}
async function getPassword(req, res) {}
async function getGender(req, res) {}
async function getDateOfBirth(req, res) {}
async function getEmail(req, res) {}
async function getEducation(req, res) {}
async function getPhoto(req, res) {}
async function getFollowing(req, res) {}
async function getBlocked(req, res) {}
async function getTopics(req, res) {}
async function getPosts(req, res) {}

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
