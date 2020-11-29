const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("/convo/:convoId", getConversationById);
router.get("/:username", getAllConversationByUsername);

router.post("/createConvo", createConversation);
router.post("/sendMessage", sendMessage);

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
async function getAllConversationByUsername(req, res) {
  const { username } = req.params;

  const query = {
    name: "get-all-conversation-by-username",
    text: `SELECT *
          FROM direct_message WHERE username1 = $1 or username2 = $1
          order by last_updated_time DESC
          `,
    values: [username],
  };

  db.query(query)
    .then((result) => {
      const { rows } = result;
      let conversations_list = [];
      if (rows.length > 0) {
        rows.forEach((conversation) => {
          // Map and make into message object
          const { body, sender, times } = conversation;
          const messages = mapMessagesWithMetaAndUsername(body, sender, times, username);

          const removed = {
            username1: conversation.username1,
            username2: conversation.username2,
            title:
              conversation.username2 === username
                ? conversation.username1
                : conversation.username2,
            createdAt: conversation.last_updated_time,
            latestMessageText: (messages.length > 0 && messages[0].messageText) || "New conversation",
            messages,
            id: conversation.id,
          };

          conversations_list.push(removed);
        });
      }

      return res.status(200).json(conversations_list);
    })
    .catch((err) => console.error(err));
}

function mapMessagesWithMetaAndUsername(body, sender, times, username) {
  let messages = [];

  for (let i = 0; i < body.length; i++) {
    const msg_entry = {
      messageText: body[i],
      sender: sender[i],
      createdAt: times[i],
      isMyMessage: sender[i] === username ? true : false,
    };
    messages.unshift(msg_entry);
  }
  return messages;
}

function mapMessagesWithMeta(body, sender, times) {
  let messages = [];

  for (let i = 0; i < body.length; i++) {
    const msg_entry = {
      messageText: body[i],
      sender: sender[i],
      createdAt: times[i],
      // isMyMessage: true
    };
    messages.unshift(msg_entry);
  }
  return messages;
}

async function getConversationById(req, res) {
  const { convoId } = req.params;

  const query = {
    name: "get-conversation-by-id",
    text: `SELECT *
          FROM direct_message WHERE id = $1`,
    values: [convoId],
  };

  db.query(query)
    .then((result) => {
      const { rows } = result;
      let data = {};
      if (rows.length > 0) {
        // Map and make into message object

        const { body, sender, times } = rows[0];
        const messages = mapMessagesWithMeta(body, sender, times);

        data = {
          createdAt: (messages.length > 0 && messages[0].createdAt) || null,
          latestMessageText: (messages.length > 0 && messages[0].messageText) || "New conversation",
          messages,
          id: convoId
        }
      } else {
        data = { id: convoId, success: false, payload: [] };
      }

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

  const query = {
    name: "create-new-conversation",
    text: `INSERT INTO direct_message(username1, username2)
      VALUES ($1, $2)
      RETURNING id`,
    values: [username_A, username_B],
  };

  db.query(query)
    .then((res1) => {
      const convoId = res1.rows[0].id;
      console.log("convoId", convoId);
      const data = { success: true, payload: convoId };
      res.status(200).send(data);
    })
    .catch((error) => console.error(error));
}

async function sendMessage(req, res) {
  const { username_A, username_B, body, sender } = req.body;

  const time = Date.now();

  const query = {
    name: "send-message",
    text: `UPDATE direct_message 
      SET body = array_append(body, cast($3 AS character varying)),
        sender = array_append(sender, cast($4 AS character varying)),
        times = array_append(times, to_timestamp($5/1000.0)),
        last_updated_time = to_timestamp($5/1000.0)
      WHERE username1 = $1 AND username2 = $2 OR username2 = $1 AND username1 = $2
      RETURNING *`,
    values: [username_A, username_B, body, sender, time],
  };

  db.query(query)
    .then((res1) => {
      const convoId = res1.rows[0].id;
      console.log("convoId", res1.rows);
      const data = { success: true, payload: convoId };
      res.status(200).send(data);
    })
    .catch((error) => console.error(error));
}
// async function createConversation(req, res) {
//   const { username_A, username_B } = req.body;

//   // 1. update users table convo list
//   // 2. create a new convo by sending a default message from A -> B
//   // 3. when B receives the msg, add convo id to convo list
//   const date = Date.now();
//   const newMessage = `Hi, I'm ${username_A}`;

//   const query = {
//     name: "create-new-conversation",
//     text: `INSERT INTO messages(date, username, message_body)
//       VALUES (to_timestamp($2/1000.0), $1, $3)
//       RETURNING conversation_id`,
//     values: [username_A, date, newMessage],
//   };

//   db.query(query)
//     .then((res1) => {
//       const convoId = res1.rows[0].conversation_id;
//       console.log("convoId", convoId);

//       const query2 = {
//         name: "append-convo-list",
//         text: `update users set
//                 convo_id = array_append(convo_id, cast($3 AS bigint))
//                 where username in ($1, $2)`,
//         values: [username_A, username_B, convoId],
//       };

//       console.log("query2", query2);

//       db.query(query2)
//         .then((res2) => {
//           console.log("res2", res2);
//           const data = {
//             "success": true,
//             "payload": { conversation_id: convoId },
//           };

//           res.status(200).send(data);
//         })
//         .catch((err2) => console.error(err2));
//     })
//     .catch((error) => console.error(error));
// }
