const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("/:convoId", getConversationById);

router.post("/createConvo", createConversation);

router.get("/text", async (req, res) => {
  //console.log("req.body", req.body);
  //const body = req.body;

  var list = getMessageInfo("kotori");

  res.status(201).send(list);
});
const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

async function getMessageInfo(name) {
  const query = {
    name: "getmessage-post",
    text:
      "select * from direct_message where username1 = '" +
      name +
      "' OR username2 = '" +
      name +
      "'",
    //values: [body.id, body.content],
    rowMode: "array",
  };

  console.log("query", query);

  const { rows } = await db.query(query);
  // console.log("rows", rows);

  console.log("results", rows);
  var list = [];
  for (row of rows) {
    let id = row[0];
    let name = row[1];
    let time = row[2];
    //let sender = row[4];
    for (message_sender of zip(row[5], row[6])) {
      message = message_sender[0];
      sender = message_sender[1];
      list.push([time, sender, message]);
    }
  }
  console.log("list", list);
  return list;
}

/**
 * GET FUNCTIONS
 */

async function getConversationById(req, res) {
  const { convoId } = req.params;

  const query = {
    name: "get-conversation-by-id",
    text: `SELECT username, date, message_body
          FROM messages WHERE conversation_id = $1`,
    values: [convoId],
  };

  db.query(query)
    .then((result) => {
      console.log("query result", result);

      const { rows } = result;

      const data = { conversation_id: convoId, rows };

      // Send data back
      return res.status(200).json(data);
    })
    .catch((err) => console.error(err));
}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */
async function createConversation(req, res) {
  const { username_A, username_B } = req.body;

  // 1. update users table convo list
  // 2. create a new convo by sending a default message from A -> B
  // 3. when B receives the msg, add convo id to convo list
  const date = Date.now();
  const newMessage = `Hi, I'm ${username_A}`;

  const query = {
    name: "create-new-conversation",
    text: `INSERT INTO messages(date, username, message_body)
      VALUES (to_timestamp($2/1000.0), $1, $3)
      RETURNING conversation_id`,
    values: [username_A, date, newMessage],
  };

  db.query(query)
    .then((res1) => {
      const convoId = res1.rows[0].conversation_id;
      console.log("convoId", convoId);

      const query2 = {
        name: "append-convo-list",
        text: `update users set
                convo_id = array_append(convo_id, cast($3 AS bigint))
                where username in ($1, $2)`,
        values: [username_A, username_B, convoId],
      };

      console.log("query2", query2);

      db.query(query2)
        .then((res2) => {
          console.log("res2", res2);
          const data = {
            "success": true,
            "payload": { conversation_id: convoId },
          };

          res.status(200).send(data);
        })
        .catch((err2) => console.error(err2));
    })
    .catch((error) => console.error(error));
}
