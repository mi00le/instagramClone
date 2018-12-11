var sql = require('./db-init.js');
var db = sql.getDb();

exports.logIn = (email, password, callback) => {
    console.log("Attempt login");

    db.get("SELECT * FROM Users WHERE Email=? AND Password=?", {1: email, 2: password}, (err, row) => {
        if (err) console.log(err.message);
        if (row) console.log(row);
        else console.log("No results");

        if (callback && callback instanceof Function) callback(!(err) && !!(row));
    });

};

exports.logOut = (email, password, callback) => {
    console.log("Attempt logout");

    if (callback && callback instanceof Function) callback(true);
};

exports.createUser = (email, password, displayName, callback) => {
    console.log("Attempt create user");

    db.run("INSERT INTO Users(Email, Password, DisplayName) VALUES(?, ?, ?)", {1: email, 2: password, 3: displayName}, (err) => {
        if (err) console.log(err.message);
        else console.log("Added user " + email);

        if (callback && callback instanceof Function) callback(!(err));
    });
};

exports.deleteUser = (userId, callback) => {
    console.log("Attempt delete user");

    db.run("DELETE FROM Users WHERE ID=?", userId, (err) => {
        if (err) console.log(err.message);
        else console.log("Deleted.");

        if (callback && callback instanceof Function) callback(!(err));
    });

};
