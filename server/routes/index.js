const posts = require("./posts");
const users = require("./users");
const comments = require("./comments");
const messages = require("./messages");
// const authenticate = require("./authenticate");
module.exports = (app) => {
  app.use("/api/v1/posts", posts);
  app.use("/api/v1/users", users);
  app.use("/api/v1/comments", comments);
  app.use("/api/v1/messages", messages);
  //app.use("/api/v1/authenticate", authenticate);
};
//dsfdsf