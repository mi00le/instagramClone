const sql = require("./db-init.js");
const db = sql.getDb();

const crypto = require("crypto");

var getRandomSalt = (length) => {
    length = length ? length : 16;
    return crypto.randomBytes(Math.ceil(length/2)).toString("hex").slice(0, length);
};

var sha512 = (password, salt) => {
    return crypto.createHmac("sha512", salt).update(password).digest("hex");
};

var encryptPass = (password, salt) => {
    salt = salt ? salt : getRandomSalt(16);

    return {
        salt: salt,
        hash: sha512(password, salt)
    };
};

exports.authenticateUser = (email, password, callback) => {
    const row = db.prepare("SELECT * FROM Users WHERE Email=?").get(email);

    let pass;
    if (row) {
        pass = encryptPass(password, row.Salt);
        if (row.Password === pass.hash) {
            // log user in

            if (callback && callback instanceof Function) callback(true);
        } else if (callback && callback instanceof Function) callback(false, {message: "Invalid auth", id: "badAuth"});
    } else {
        pass = encryptPass(password); // spoof hashing time even if no user was found

        if (callback && callback instanceof Function) callback(false, {message: "Invalid auth", id: "badAuth"});
    }
};

exports.getUser = (userId, callback) => {
    const row = db.prepare("SELECT * FROM Users WHERE ID=?").get(userId);

    if (row) {
        if (callback && callback instanceof Function) callback(true, {
            email: row.Email,
            displayName: row.displayName,
            id: row.ID
        });
    } else if (callback && callback instanceof Function) callback(false, {}, {message: "No user found with id", id: "notFound"});
};

exports.getAllUsers = (callback) => {
    const rows = db.prepare("SELECT * FROM Users").get();

    if (rows) {
        let result = [];
        for (let obj of rows) {
            result.push({
                email: obj.Email,
                displayName: obj.Password,
                id: obj.ID
            });
        }
        if (callback && callback instanceof Function) callback(true, result); 
    } else if (callback && callback instanceof Function) callback(false);
};

exports.createUser = (email, password, displayName, callback) => {
    let pass = encryptPass(password);

    const row = db.prepare("SELECT * FROM Users WHERE Email=? OR DisplayName=?").get(email, displayName);

    if (row) {
        if (row.Email === email) {
            if (callback && callback instanceof Function) callback(false, null, {message: "Email taken", id: "inUseEmail"});
        } else if (row.DisplayName === displayName) {
            if (callback && callback instanceof Function) callback(false, null, {message: "Name taken", id: "inUseName"});
        } else {
            if (callback && callback instanceof Function) callback(false, null, {message: "Unknown error", id: "unknownError"});
        }
    } else {
        const result = db.prepare("INSERT INTO Users(Email, Password, Salt, DisplayName) VALUES(?, ?, ?, ?)").run(
            email, pass.hash, pass.salt, displayName
        );

        if (callback && callback instanceof Function) callback(!!(result), {
            email: email,
            displayName: displayName,
            id: result.lastInsertRowid
        });
    }
};

exports.deleteUser = (userId, callback) => {
    db.prepare("DELETE FROM Posts WHERE AuthorID=?").run(userId);
    const result = db.prepare("DELETE FROM Users WHERE ID=?").run(userId);
    
    if (callback && callback instanceof Function) callback(!!(result));
};
