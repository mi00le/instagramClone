const sqlite3 = require("better-sqlite3");
const db = new sqlite3("server.db");

/**
 * Get the current database connection
 */
exports.getDb = () => {
    return db;
};
