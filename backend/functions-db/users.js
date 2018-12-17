var sql = require('./db-init.js');
var db = sql.getDb();

const crypto = require('crypto');

var getRandomSalt = (length) => {
    length = length ? length : 16;
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0, length);
}

var sha512 = (password, salt) => {
    return crypto.createHmac('sha512', salt).update(password).digest('hex');
}

var encryptPass = (password, salt) => {
    salt = salt ? salt : getRandomSalt(16);

    return {
        salt: salt,
        hash: sha512(password, salt)
    };
}

exports.authenticateUser = (email, password, callback) => {
    console.log("Attempt auth");

    db.get("SELECT * FROM Users WHERE Email=?", {1: email}, (err, row) => {
        if (err) console.log(err.message);
        if (row) {
            var pass = encryptPass(password, row.Salt);
            if (row.Password === pass.hash) {
                // log user in
                console.log("Log in");

                if (callback && callback instanceof Function) callback(true);
            } else if (callback && callback instanceof Function) callback(false, {message: "Invalid auth", id: "badAuth"});
        } else {
            var pass = encryptPass(password); // spoof hashing time even if no user was found
            console.log("No results");

            if (callback && callback instanceof Function) callback(false, {message: "Invalid auth", id: "badAuth"});
        }

    });
};

exports.getUser = (userId, callback) => {
    db.get("SELECT * FROM Users WHERE ID=?", userId, (err, row) => {
        if (err) console.log(err.message);
        if (row) {
            if (callback && callback instanceof Function) callback(true, {
                email: row.Email,
                displayName: row.displayName,
                id: row.ID
            });
        } else if (callback && callback instanceof Function) callback(false, {}, {message: "No user found with id", id: "notFound"});
    })
};

exports.getAllUsers = (callback) => {
    db.all("SELECT * FROM Users", (err, rows) => {
        if (err) console.log(err.message);

        if (rows) {
            var result = [];
            for (var obj of rows) {
                result.push({
                    email: obj.Email,
                    displayName: obj.Password,
                    id: obj.ID
                })
            }
            if (callback && callback instanceof Function) callback(true, result); 
        } else if (callback && callback instanceof Function) callback(false);
    });
};

exports.createUser = (email, password, displayName, callback) => {
    console.log("Attempt create user");
    var pass = encryptPass(password);

    db.get("SELECT * FROM Users WHERE Email=? OR DisplayName=?", {1: email, 2: displayName}, (err, row) => {
        if (row) {
            if (row.Email === email) {
                if (callback && callback instanceof Function) callback(false, null, {message: "Email taken", id: "inUseEmail"});
            } else if (row.DisplayName === displayName) {
                if (callback && callback instanceof Function) callback(false, null, {message: "Name taken", id: "inUseName"});
            } else {
                if (callback && callback instanceof Function) callback(false, null, {message: "Unknown error", id: "unknownError"});
            }
        } else if (err) {
            console.log(err.message);
            if (callback && callback instanceof Function) callback(false);
        } else {
            db.run("INSERT INTO Users(Email, Password, Salt, DisplayName) VALUES(?, ?, ?, ?)", {
                1: email,
                2: pass.hash,
                3: pass.salt,
                4: displayName
            }, function (err) {
                if (err) {
                    if (callback && callback instanceof Function) callback(false);
                    console.log(err.message);
                    return;
                }

                if (callback && callback instanceof Function) callback(true, {
                    email: email,
                    displayName: displayName,
                    id: this.lastID
                });
            });
        }
    });
};

exports.deleteUser = (userId, callback) => {
    console.log("Attempt delete user");

    db.run("DELETE FROM Posts WHERE AuthorID=?", userId, (err) => {
        if (err) {
            console.log(err);
            if (callback && callback instanceof Function) callback(false);
        } else {
            db.run("DELETE FROM Users WHERE ID=?", userId, (err) => {
                if (err) console.log(err.message);
                else console.log("Deleted.");

                if (callback && callback instanceof Function) callback(!(err));
            });
        }
    });
};
