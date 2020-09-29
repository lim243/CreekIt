const Router = require("express-promise-router");
const db = require("../db");
const router = new Router();

module.exports = router;

// Router Functions
router.get("", getMessage);
router.post("", sendMessage);

router.get("/text", async (req, res) => {
    //console.log("req.body", req.body);
    //const body = req.body;
  
  var list = getMessageInfo("kotori");
  
    res.status(201).send(list);
});
const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);
async function getMessageInfo(name){
  const query = {
    name: "getmessage-post",
    text: "select * from direct_message where username1 = \'" + name + "\' OR username2 = \'" + name + "\'",
    //values: [body.id, body.content],
    rowMode: "array",
  };

  console.log("query", query);

  const { rows } = await db.query(query);
  // console.log("rows", rows);

  console.log("results", rows);
  var list = [];
  for (row of rows){
    let id = row[0];
    let name = row[1];
    let time = row[2];
    //let sender = row[4];
    for (message_sender of zip(row[5],row[6])){
      message = message_sender[0]
      sender = message_sender[1]
      list.push([time,sender,message]);
    }
  }
  console.log("list", list);
  return list;
}

/**
 * GET FUNCTIONS
 */

async function getMessage(req, res) {}

/**
 * POST FUNCTIONS
 * A list of setter functions
 */
async function sendMessage(req, res) {}
