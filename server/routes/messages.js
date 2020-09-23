const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("", getMessage);
router.post("", sendMessage);

/**
 * GET FUNCTIONS
 */

async function getMessage(req, res) {}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */
async function sendMessage(req, res) {}
