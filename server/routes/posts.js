const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("/", getUsers);

// Create a post
router.post("/posts", getPost);

/**
 * GET FUNCTIONS
 */

async function getPost(req, res) {}
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

async function setPost(req, res) {}
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
