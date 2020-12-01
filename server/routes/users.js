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
router.get("/:username/following", getFollowing); //TODO: Undefined
router.get("/:username/followed", getFollowed); //TODO: Undefined
router.get("/:username/blocked", getBlocked); //TODO: Undefined
router.get("/:username/topics", getTopics); //TODO: Undefined
router.get("/:username/posts", getPosts); //TODO: Undefined
router.get("/:username/interacted", getInteracted);

// SET ROUTER
router.post("/followStatus", followStatus);
router.post("/signIn", signIn);
router.post("/signUp", signUp);
router.post("/addfollow", addfollow);
router.post("/removefollow", removefollow);
router.post("/:username/followTopic", followTopic);
router.post("/:username/unfollowTopic", unfollowTopic);
router.post("/:username/deleteAccount", deleteAccount);
router.post("/:username/updateProfile", updateProfile);
router.post("/:username/password", setPassword);
router.post("/:username/updatePhoto", updatePhoto);
router.post("/refresh", refresh);

/**
 * GET FUNCTIONS
 */
async function getUsers(req, res) {
  const query = {
    name: "get-all-user",
    text: "SELECT *, encode(profile_picture,'base64') as profile_picture FROM users",
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
    text: `SELECT username, email, gender, date_of_birth, education, 
    about_me, profile_photo, following, followed, blocked, topics, 
    password, name, posts, interacted_post, private, encode(profile_picture,'base64') as profile_picture
    FROM public.users
    WHERE username = $1`,
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
    text: `SELECT p.id as post_id, p.username, u.name, encode(u.profile_picture,'base64') as profile_picture, p.date, p.body, p.topic, array_length(p.upvote_users, 1) as upvotes, array_length(p.downvote_users, 1) as downvotes , p.upvote_users, 
    p.downvote_users, p.comment_ids  FROM posts as p, users as u WHERE p.username = $1 AND p.username = u.username AND u.username = $1 ORDER BY p.date DESC;`,
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
async function getPassword(key, type) {
  let query = "";
  if (type === "username") {
    query = {
      name: "get-password",
      text: "SELECT username, email, password FROM Users WHERE username = $1",
      values: [key],
    };
  } else {
    query = {
      name: "get-password",
      text: "SELECT username, email, password FROM Users WHERE email = $1",
      values: [key],
    };
  }

  console.log("query", query);

  const { rows } = await db.query(query);

  if (rows.length > 0) {
    return rows[0];
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
      console.log(data.rows[0]);
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
async function getTopics(req, res) {
  let username = req.params.username;
  console.log("username", username);
  const query = {
    name: "get-followed",
    text: "select topics from users where username = $1",
    values: [username],
    //rowMode: "array",
  };

  console.log("query", query);

  db.query(query)
    .then((data) => {
      console.log(data);
      res.status(200).send(data.rows[0]);
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "payload": `ERROR ${error.code}: ${error.detail} - User ${username} was NOT existed!`,
      };
    });
} // TODO: Undefined yet
async function getPosts(req, res) {} // TODO: Undefined yet
async function getInteracted(req, res) {
  const username = req.params.username;

  const query = {
    name: "get-interacted-posts",
    text: `SELECT u.name, encode(u.profile_picture,'base64') as profile_picture, array_length(t.upvote_users,1) as upvotes,
    array_length(t.downvote_users,1) as downvotes, t.id, t.username, t.date, t.body, t.topic, t.anonymous
    FROM users, unnest(users.interacted_post) post_id
    LEFT JOIN posts t on t.id=post_id
    LEFT JOIN users u on u.username = t.username
    where users.username = $1 ORDER BY t.date DESC`,
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
async function deleteAccount(req, res) {
  let username = req.params.username;
  //following
  const query1 = {
    name: "delete-comments",
    text:
      "delete from comments where username = $1 OR parent_id in (select id from posts where username = $1);",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [username],
  };
  const query2 = {
    name: "delete-comments",
    text: "delete from posts where username = $1;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [username],
  };
  const query3 = {
    name: "delete-accouunt",
    text: "delete from users where username = $1;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [username],
  };
  console.log("query", query1);
  db.query(query1)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `ERROR ${error.code}: ${error.detail} - User ${email} was NOT created!`,
      };
      res.status(500).send(msg);
    });
  db.query(query2)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `ERROR ${error.code}: ${error.detail} - User ${email} was NOT created!`,
      };
      res.status(500).send(msg);
    });
  db.query(query3)
    .then((data) => {
      console.log("data", data);
      const msg = {
        success: "true",
        message: "User deleted!",
      };
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
}
async function updateProfile(req, res) {
  const { username } = req.params;
  const { email, gender, education, aboutme, profile_picture, private, name } = req.body;

  const query = {
    name: "update-profile-info",
    text: `UPDATE users 
    SET email = $2, gender = $3,  
      education = $4, about_me = $5, private = $6, name = $7
    WHERE username  = $1 returning *`,
    values: [
      username,
      email,
      gender,
      education,
      aboutme,
      private,
      name,
      // profile_picture,
    ],
  };
  console.log("query", query);
  db.query(query)
    .then((data) => {
      console.log("data", data);

      const msg = {
        success: true,
        message: `user updated!`,
        payload: data,
      };

      res.status(200).send(msg);
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `ERROR ${error.code}: ${error.detail} - Info was NOT updated!`,
      };
      res.status(500).send(msg);
    });
}

async function updatePhoto(req, res) {
  const { username } = req.params;
  const { filename, img } = req.body;

  const query = {
    name: "update-profile-picture",
    text: `UPDATE users 
    SET profile_picture = decode($2,'base64')
    WHERE username  = $1 returning *`,
    values: [username, img],
  };

  console.log("query", query, username);

  db.query(query)
    .then((data) => {
      console.log("data", data);
      const msg = {
        success: "true",
        message: "User deleted!",
        img: img,
      };
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
}

async function addfollow(req, res) {
  let user1 = req.body.user1;
  let user2 = req.body.user2;
  //following
  const query = {
    name: "add-following",
    text:
      "update users set following = array_append(following,cast($1 AS character varying)) where username  = $2 AND NOT ($1 = any(following)) returning username;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [user1, user2],
  };
  db.query(query)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `Cannot add following`,
      };
    });
  //followereds
  const query2 = {
    name: "add-followed",
    text:
      "update users set followed = array_append(followed,cast($1 AS character varying)) where username  = $2 AND NOT ($1 = any(followed)) returning username;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [user2, user1],
  };
  db.query(query2)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `Cannot add followed`,
      };
      res.status(500).send(msg);
    });
  res.status(200).send("success");
}
async function removefollow(req, res) {
  let user1 = req.body.user1;
  let user2 = req.body.user2;
  //following
  console.log(req.body);
  console.log(res.body);
  console.log(user1);
  console.log(user2);
  const query = {
    name: "remove-following",
    text: "update users set following = array_remove(following,$1) where username  = $2;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [user1, user2],
  };
  db.query(query)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `ERROR ${error.code}: ${error.detail} - User ${email} was NOT created!`,
      };
      res.status(500).send(msg);
    });
  //followereds
  const query2 = {
    name: "remove-followed",
    text: "update users set followed = array_remove(followed,$1) where username  = $2;",
    //text: "INSERT INTO Users (username, email, password) VALUES ($1, $1,$2)",
    values: [user2, user1],
  };
  db.query(query2)
    .then((data) => {
      console.log("data", data);
      //res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `ERROR ${error.code}: ${error.detail} - User ${email} was NOT created!`,
      };
      res.status(500).send(msg);
    });
  res.status(200).send("success");
}

async function signUp(req, res) {
  const { email, password, username, dob, name, gender, education } = req.body;
  console.log("req.body", req.body, Date.now());

  bcrypt.hash(password, saltRounds, (err, hashPw) => {
    // Now we can store the password hash in db.
    console.log("hashPw", hashPw);

    const query = {
      name: "create-user",
      text:
        "INSERT INTO Users (username, email, password, date_of_birth, name, gender, education ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      values: [username, email, hashPw, dob, name, gender, education],
    };

    console.log("query", query);

    db.query(query)
      .then((data) => {
        console.log("data", data);
        let payload = { email: email };
        let accessToken = jwt.sign(payload, "Creekit Secret", {
          algorithm: "HS256",
          expiresIn: 30,
        });

        const msg = {
          success: true,
          accessToken: accessToken,
          username: data.rows[0].username,
          email: data.rows[0].email,
          message: `User ${data.username} created!`,
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
//followStatus
async function followStatus(req, res) {
  const { user1, user2 } = req.body;
  console.log(req.body);
  //let user1 = req.body.user1;
  //let user2 = req.body.user2;
  console.log("usernames", user1, user2);
  const query = {
    name: "get followStatus",
    text: `select username from users where (username = $2) AND ($1 = any(followed))`,
    values: [user1, user2],
  };

  console.log("query", query);

  db.query(query)
    .then((data) => {
      console.log("data", data);
      let s = "";
      if (data.rows[0]) {
        s = "true";
      } else {
        s = "false";
      }
      console.log(data.rows[0]);
      const msg = {
        success: "true",
        message: "User deleted!",
        status: s,
      };
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
}

async function signIn(req, res) {
  const { username, email, password } = req.body;

  let user = "";

  if (username.length > 0) {
    user = await getPassword(username, "username");
  } else {
    user = await getPassword(email, "email");
  }

  const hashedPw = user.password;
  const DBusername = user.username;
  const DBemail = user.email;

  if (hashedPw === "error") {
    const msg = {
      head: "email",
      success: false,
      error: "Undefined Email or Username",
      message: "Error, Undefined Email or Username",
    };
    return res.status(500).send(msg);
  }

  bcrypt.compare(password, hashedPw, (err, result) => {
    let payload = { email: email };

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

    const data = {
      success: true,
      username: DBusername,
      email: DBemail,
      accessToken: accessToken,
    };

    res.status(200).send(data);
  });
}

async function refresh(req, res) {
  let username = req.body.username;
  let payload = { username: username };
  let accessToken = jwt.sign(payload, "Creekit Secret", {
    algorithm: "HS256",
    expiresIn: 30,
  });
  console.log("refresh token", accessToken);
  const data = {
    accessToken: accessToken,
  };
  console.log(data);
  res.status(200).send(data);
}

async function followTopic(req, res) {
  const { username } = req.params;

  const { topic } = req.body;
  //following
  const query = {
    name: "add-following-topic",
    text:
      "update users set topics = array_append(topics,$2::character varying) where username = $1 AND NOT ($2::character varying = any(topics)) returning username;",
    values: [username, topic],
  };

  db.query(query)
    .then((data) => {
      res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `Topic was not followed!`,
      };
      res.status(500).send(msg);
    });
}

async function unfollowTopic(req, res) {
  const { username } = req.params;

  const { topic } = req.body;
  //following
  const query = {
    name: "remove-following-topic",
    text:
      "update users set topics = array_remove(topics,$2::character varying) where username = $1 AND ($2::character varying = any(topics)) returning username;",
    values: [username, topic],
  };
  db.query(query)
    .then((data) => {
      res.status(200).send("success");
    })
    .catch((error) => {
      console.log("error", error);
      const msg = {
        "success": false,
        "message": `Topic was not removed!`,
      };
      res.status(500).send(msg);
    });
}
