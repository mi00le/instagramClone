var sqlite3 = require("sqlite3");
var db = new sqlite3.Database("server.db");

exports.getDb = () => {
    return db;
};
