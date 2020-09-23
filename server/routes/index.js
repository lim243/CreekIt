const posts = require("./posts");
const users = require("./users");
const comments = require("./comments");
const messages = require("./messages");

module.exports = (app) => {
  app.use("/api/v1/post", posts);
  app.use("/api/v1/user", users);
  app.use("/api/v1/comments", comments);
  app.use("/api/v1/messages", messages);
};
