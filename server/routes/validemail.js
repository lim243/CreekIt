const db = require("../db");
const express = require("express");
const router = express.Router();
module.exports = router;



router.get("/", validateEmailAddr);
function validateEmailAddr (req, res){
    console.log("Email:" ,req.body.email);
}