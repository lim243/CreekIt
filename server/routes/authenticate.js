const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const jwt = require('jsonwebtoken');
let user_token = new Map();

// Router Functions
// router.get("/", getUsers);

// Create a post


exports.login = function(req, res){

    let username = req.body.username
    let password = req.body.password
    
    // Neither do this!
    if (!username || !password || users[username] !== password){
        return res.status(401).send()
    }    
}


exports.isauth = async function(req,res,next){
    console.log("req.body", req.body);
    let token = req.body.accessToken;
    console.log(token);
    try{
        var decoded = jwt.verify(token, 'Creekit Secret');
    } catch(err){
        console.log(err);
        res.status(401).send("No Valid token found.");
        return;
    }
    next();

}


exports.storeToken = async function(username,accessToken){
    console.log("Map username:",username );
    console.log("Map username:",accessToken);
    user_token.set(username,accessToken);
}
//router.post("/authenticate");