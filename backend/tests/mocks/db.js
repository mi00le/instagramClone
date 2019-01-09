const sqlite = require("better-sqlite3");
const db = require("../../functions-db/db-init");
const users = require("../../functions-db/users");
const fs = require("fs");
const path = require("path");
const { stub } = require("sinon");

const query = fs.readFileSync(path.resolve(__dirname, "../../server.sql")).toString();

// init test db
const mDb = new sqlite("server.db", { memory: true });
const pass = users.encryptPass("test");
mDb.exec(query);
mDb.prepare("INSERT INTO Users(Email, Password, Salt, DisplayName) VALUES(?, ?, ?, ?)")
    .run("test@test.com", pass.hash, pass.salt, "test user");
mDb.prepare("INSERT INTO Posts(AuthorID, AuthorName, Url, CreatedAt, Title, Description, Tags) VALUES(?, ?, ?, ?, ?, ?, ?)")
    .run(1, "test", "test", new Date().getTime(), "test", "test", "test");

stub(db, "getDb").returns(mDb);
