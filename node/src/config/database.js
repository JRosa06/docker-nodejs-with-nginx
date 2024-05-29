const mysql = require("mysql");

const config = {
  host: "db-mysql",
  user: "root",
  password: "root",
  database: "nodedb",
};

const connection = mysql.createConnection(config);

connection.connect();

const executeQuery = function (queryStr, callback) {
  try {
    const result = connection.query(queryStr, callback);

    return result;
  } catch (e) {
    console.error("e", e);
  }
};

module.exports = {
  executeQuery: executeQuery,
};