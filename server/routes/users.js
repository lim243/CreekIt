const db = require("../db");
const express = require("express");
const router = express.Router();

// Encryption password
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticate = require("./authenticate");
const saltRounds = 10;

module.exports = router;

// Router Functions
router.get("/", authenticate.isauth, getUsers);
router.get("/:username", getOneUserByUsername);
router.get("/:username/posts", getPostsByUsername);
router.get("/:username/email", getEmail);
router.get("/:username/name", getName);
router.get("/:username/username", getUsername); //TODO: Undefined
router.get("/:username/password", getPassword); //TODO: Undefined
router.get("/:username/gender", getGender);
router.get("/:username/dob", getDateOfBirth);
router.get("/:username/education", getEducation);
router.get("/:username/aboutme", getAboutMe);
router.get("/:username/photo", getPhoto);
router.get("/:username/following", authenticate.isauth, getFollowing); //TODO: Undefined
router.get("/:username/followed", authenticate.isauth, getFollowing); //TODO: Undefined
router.get("/:username/blocked", getBlocked); //TODO: Undefined
router.get("/:username/topics", getTopics); //TODO: Undefined
router.get("/:username/posts", getPosts); //TODO: Undefined

// SET ROUTER
router.post("/:username/password", setPassword);
router.post("/signIn", signIn);
router.post("/signUp", signUp);

/**
 * GET FUNCTIONS
 */
async function getUsers(req, res) {
  const query = {
    name: "get-all-user",
    text: "SELECT * FROM users",
  };

  const result = await db.query(query);
  console.log("query result", result);
  const { rows, rowCount } = result;
  // console.log("rows", rowCount, rows);
  const data = { rowCount, rows };

  // Send data back
  return res.status(200).json(data);
}

async function getOneUserByUsername(req, res) {
  // Params
  const username = req.params.username;

  const query = {
    name: "get-post",
    text: "SELECT * FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);

  const { rows, rowCount } = result;
  // console.log("rows", rowCount, rows);
  const data = { rowCount, rows };

  // Send data back
  return res.status(200).json(data);
}

async function getPostsByUsername(req, res) {
  const username = req.params.username;

  const query = {
    name: "get-all-posts-by-username",
    text: `SELECT p.id as post_id, p.username, u.name, u.profile_photo, to_char(p.date, 'YYYY-MM-DD') as date,
    to_char(p.date, 'HH24:MI') as time, p.body, p.topic, p.upvotes, p.downvotes, p.upvote_users, 
    p.downvote_users, p.comment_ids  FROM posts as p, users as u WHERE p.username = $1 AND p.username = u.username;`,
    values: [username],
  };

  const { rows } = await db.query(query);

  // Send data back
  const msg = {
    success: true,
    payload: rows,
  };
  return res.status(200).json(msg);
}

async function getEmail(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT email FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);

  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getUsername(req, res) {} // TODO: Undefined yet
async function getName(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT name FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getPassword(email) {
  const query = {
    name: "get-password",
    text: "SELECT password FROM Users WHERE email = $1",
    values: [email],
  };

  console.log("query", query);

  const { rows } = await db.query(query);

  if (rows.length > 0) {
    return rows[0].password;
  } else {
    return "error";
  }
} // TODO: Undefined yet
async function getGender(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT gender FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getDateOfBirth(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT date_of_birth FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getEducation(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT education FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getAboutMe(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT about_me FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getPhoto(req, res) {
  const username = req.params.username;
  const query = {
    name: "get-post",
    text: "SELECT profile_photo FROM users WHERE username = $1",
    values: [username],
  };

  const result = await db.query(query);
  const { rows } = result;
  const data = rows[0];

  // Send data back
  return res.status(200).json(data);
}
async function getFollowing(req, res) {
  let username = req.params.username;
  console.log("username", username);
  const query = {
    name: "get-following",
    text: "select following from users where username = $1",
    values: [username],
    //rowMode: "array",
  };

  console.log("query", query);

  db.query(query)
    .then((data) => {
      console.log(data);
      /*const msg = {
        "success": true,
        "following": `User ${username} created!`,
      };*/
      res.status(200).send(data.rows[0]);
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "payload": `ERROR ${error.code}: ${error.detail} - User ${username} was NOT created!`,
      };
    });
} // TODO: Undefined yet
async function getFollowed(req, res) {
  let username = req.params.username;
  console.log("username", username);
  const query = {
    name: "get-followed",
    text: "select followed from users where username = $1",
    values: [username],
    //rowMode: "array",
  };

  console.log("query", query);

  db.query(query)
    .then((data) => {
      console.log(data);
      /*const msg = {
        "success": true,
        "following": `User ${username} created!`,
      };*/

      /*for (followered in followereds){

      }*/
      res.status(200).send(data.rows[0]);
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "payload": `ERROR ${error.code}: ${error.detail} - User ${username} was NOT created!`,
      };
    });
} // TODO: Undefined yet
async function getBlocked(req, res) {} // TODO: Undefined yet
async function getTopics(req, res) {} // TODO: Undefined yet
async function getPosts(req, res) {} // TODO: Undefined yet

/**
 * POST FUNCTIONS
 * A list of setter functions
 */
async function setEmail(req, res) {}
async function setUsername(req, res) {}
async function setName(req, res) {}
async function setPassword(req, res) {
  const { password } = req.body;
  const username = req.params.username;
  console.log("password", password);

  bcrypt.hash(password, saltRounds, (err, hashPw) => {
    // Now we can store the password hash in db.
    console.log("hashPw", hashPw);

    // Send to DB
    const query = {
      name: "update-password",
      text: "UPDATE Users SET password = $2 WHERE username = $1",
      values: [username, hashPw],
    };

    console.log("query", query);

    db.query(query).then((data) => {
      const msg = {
        "success": true,
        "payload": `User ${username}'s password updated`,
      };
      res.status(200).send(msg);
    });
  });
}
async function setGender(req, res) {}
async function setDateOfBirth(req, res) {}
async function setEducation(req, res) {}
async function setPhoto(req, res) {}
async function addFollowing(req, res) {}
async function addBlocked(req, res) {}
async function signUp(req, res) {
  const { email, password } = req.body;

  bcrypt.hash(password, saltRounds, (err, hashPw) => {
    // Now we can store the password hash in db.
    console.log("hashPw", hashPw);

    const query = {
      name: "create-user",
      text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
      values: [email, hashPw],
    };

    console.log("query", query);

    db.query(query)
      .then((data) => {
        let accessToken = jwt.sign(payload, "Creekit Secret", {
          algorithm: "HS256",
          expiresIn: 30,
        });
        console.log("acess Token", accessToken);
        req.accessToken = accessToken;
        req.email = email;
        const msg = {
          success: true,
          accessToken: accessToken,
          message: `User ${email} created!`,
        };
        //authenticate.storeToken(username,accessToken);
        res.status(200).send(msg);
      })
      .catch((error) => {
        console.log("error", error);
        const msg = {
          "success": false,
          "message": `ERROR ${error.code}: ${error.detail} - User ${email} was NOT created!`,
        };
        res.status(500).send(msg);
      });
  });
}

async function signIn(req, res) {
  console.log("req.body", req.body);

  const { email, password } = req.body;

  const hashedPw = await getPassword(email);
  if (hashedPw === "error") {
    const msg = {
      head: "email",
      success: false,
      error: "Undefined Email or Username",
      message: "Error, Undefined Email or Username",
    };
    return res.status(500).send(msg);
  }
  // console.log("passed getPW", hashedPw);
  bcrypt.compare(password, hashedPw, (err, result) => {
    let payload = { email: email };
    console.log("password", result);
    if (!result) {
      console.log("Password doest not match!");
      const msg = {
        head: "pass",
        success: false,
        error: err,
        message: "Error,  Password did not match",
      };
      return res.status(500).send(msg);
    }
    let accessToken = jwt.sign(payload, "Creekit Secret", {
      algorithm: "HS256",
      expiresIn: 30,
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
    //req.accessToken = accessToken;
  });
}
