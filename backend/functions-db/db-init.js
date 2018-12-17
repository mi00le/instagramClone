const sqlite3 = require("better-sqlite3");
const db = new sqlite3("server.db");

exports.getDb = () => {
    return db;
};
