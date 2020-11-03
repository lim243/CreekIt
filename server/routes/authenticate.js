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
    const token = bearer.split(" ")[1]
    // const search_params = current_url.searchParams;

    // const accessToken = search_params.get('accessToken');
    console.log('accessToken', token);
    // let token = req.body.accessToken;
    // console.log(token);
    try{
        let accessToken = jwt.sign(payload, "Creekit Secret", {
            algorithm: "HS256",
            expiresIn: 300,
        });
        console.log("acess Token", accessToken);
        req.accessToken = accessToken;
        req.email = email;
        const data = {
            success: true,
            accessToken: accessToken,
        };
        //authenticate.storeToken(username,accessToken);
        res.status(200).send(data);
    } catch(err){
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