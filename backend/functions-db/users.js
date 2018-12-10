var sql = require('./db-init.js');
var db = sql.getDb();

exports.logIn = (email, password) => {
    console.log("Attempt login");

    db.get("SELECT * FROM Users WHERE Email=? AND Password=?", {1: email, 2: password}, (err, row) => {
        if (err) console.log(err.message);
        if (row) console.log(row);
        else console.log("No results");
    });
}

exports.logOut = (email, password) => {
    console.log("Attempt logout");
}

exports.createUser = (email, password, displayName) => {
    console.log("Attempt create user");

    db.run("INSERT INTO Users(Email, Password, DisplayName) VALUES(?, ?, ?)", {1: email, 2: password, 3: displayName}, (err) => {
        if (err) console.log(err.message);
        else console.log("Added user " + email);
    });
}

exports.deleteUser = (userId) => {
    console.log("Attempt delete user");

    // todo implement proper logic
    if (false) {
        db.run("DELETE FROM Users WHERE ID=?", userId, (err) => {
            if (err) console.log(err.message);
            else console.log("Deleted.");
        });
    }
}
