const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();
const jwt = require('jsonwebtoken');
const url = require('url');

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
    bearer = req.headers.authorization
    try{
        const token = bearer.split(" ")[1]
    }
    catch(err){
        //altert("You do not have access to this page")
        res.redirect(401, 'loalhost:3000')
        console.log("here");
        return;
    }
    // const search_params = current_url.searchParams;

    // const accessToken = search_params.get('accessToken');
    console.log('accessToken', token);
    // let token = req.body.accessToken;
    // console.log(token);
    try{
        var decoded = jwt.verify(token, 'Creekit Secret');
        console.log('result', decoded);
    } catch(err){
        altert("password does not match")
        console.log(err);
        res.status(401).send(err);
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