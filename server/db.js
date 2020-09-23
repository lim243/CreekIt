const { Pool } = require("pg");
require("dotenv").config();

// Database Client AWS
const client = new Pool({
  host: process.env.RDS_HOSTNAME,
  port: process.env.RDS_PORTNUMBER,
  user: process.env.RDS_USERNAME,
  password: process.env.RDS_PASSWORD,
});

module.exports = client;
