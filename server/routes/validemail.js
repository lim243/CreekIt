const db = require("../db");
const express = require("express");
const nodemailer = require('nodemailer');
const router = express.Router();
module.exports = router;



const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'lovegrubbysky',
      pass: 'IMba147890'
    }
});




router.post("/", validateEmailAddr);
function validateEmailAddr (req, res){
    let email = req.body.email;
    console.log("Email:" ,email);
    let id = makeid(6);
    var mailOptions = {
        from: 'lovegrubbysky@gmail.com',
        to: 'zheng460@purdue.edu',
        subject: 'Sending Email using Node.js',
        text: 'That was easy!'
    };
    console.log(id);
    mailOptions.text = id;
    mailOptions.to = email;
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          res.status(200).send(id);
        }
      }); 
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
 