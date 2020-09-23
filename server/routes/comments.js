const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("/", getUsers);

// Create a post
router.post("/posts");

/**
 * GET FUNCTIONS
 */

async function getComment(req, res) {}
async function getUpvotes(req, res) {}
async function getUpvoteUsers(req, res) {}
async function getDownvotes(req, res) {}
async function getDownvoteUsers(req, res) {}
async function getPostComments(req, res) {}
async function getOriginalPost(req, res) {}
async function getId(req, res) {}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */

async function setComment(req, res) {}
async function setUpvotes(req, res) {}
async function setUpvoteUsers(req, res) {}
async function setDownvotes(req, res) {}
async function setDownvoteUsers(req, res) {}
async function setPostComments(req, res) {}
async function addPostComments(req, res) {}
async function setId(req, res) {}
