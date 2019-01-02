const sql = require("./db-init.js");
const utils = require("../utils/users");
const db = sql.getDb();

const crypto = require("crypto");

/**
 * Get a random string of bytes
 * @param {number} [length=16] - Length of returned string
 */
var getRandomSalt = (length) => {
    length = length ? length : 16;
    return crypto.randomBytes(Math.ceil(length/2)).toString("hex").slice(0, length);
};

/**
 * Hash a password, with a salt, through SHA-512
 * @param {string} password - Password to hash
 * @param {string} salt - Salt to hash with
 */
var sha512 = (password, salt) => {
    return crypto.createHmac("sha512", salt).update(password).digest("hex");
};

/**
 * Encrypt a password, using a pre-existing salt, or a generated one
 * @param {string} password - Password to hash
 * @param {string} [salt] - (Optional) salt to use, randomly generated if none supplied
 */
var encryptPass = (password, salt) => {
    salt = salt ? salt : getRandomSalt(16);

    return {
        salt: salt,
        hash: sha512(password, salt)
    };
};

/**
 * Verify if user email and password are correct
 * @param {string} email
 * @param {string} password
 */
exports.authenticateUser = (email, password) => new Promise(async (resolve, reject) => {
    try {
        if (!email) email = "";
        if (!password) password = "";
        const row = db.prepare("SELECT * FROM Users WHERE Email=?").get(email);
    
        let pass;
        if (row) {
            pass = encryptPass(password, row.Salt);
            if (row.Password === pass.hash) {
                // log user in
    
                return resolve({ success: true, user: utils.toClientStructure(row) });
            }
        }
        pass = encryptPass(password); // spoof hashing time even if no user was found
        return resolve({ success: false, err: { message: "Invalid auth", id: "badAuth" } });
    } catch (e) {
        return reject(e);
    }
});

/**
 * Get user with ID
 * @param {string|number} userId - ID of user
 */
exports.getUser = (userId) => new Promise(async (resolve, reject) => {
    try {
        const row = db.prepare("SELECT * FROM Users WHERE ID=?").get(userId);
        return resolve(utils.toClientStructure(row));
    } catch (e) {
        return reject(e);
    }
});

/**
 * Get all users from database, with an optional limit
 * @param {number} [limit=-1] - How many users to return
 */
exports.getAllUsers = (limit = -1) => new Promise(async (resolve, reject) => {
    try {
        const rows = db.prepare("SELECT * FROM Users LIMIT ?").get(limit);
        return resolve(rows ? rows.map(utils.toClientStructure) : []);
    } catch (e) {
        return reject(e);
    }
});

/**
 * Create a user, and insert it into database
 * @param {string} email - User email
 * @param {string} password - User password to be hashed
 * @param {string} displayName - User displayed name
 */
exports.createUser = (email, password, displayName) => new Promise(async (resolve, reject) => {
    try {
        if (!email || !password || !displayName) return resolve({ success: false, err: {message: "Missing params", id:"missingParams"} });

        let pass = encryptPass(password);

        const emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;

        if (!emailRegex.test(email)) return resolve({ success: false, err: { message: "Invalid email address", id: "malformedEmail" } });

        const nameRegex = /^[A-Za-z0-9\._-]$/;

        if (!nameRegex.test(displayName)) return resolve({ success: false, err: { message: "Invalid display name (Alphanumeric and .-_ only)", id: "malformedName" } });

        const row = db.prepare("SELECT * FROM Users WHERE Email LIKE ? OR DisplayName=?").get(email, displayName);

        if (row) {
            if (row.Email === email) {
                return resolve({ success: false, err: { message: "Email taken", id: "inUseEmail" } });
            } else if (row.DisplayName === displayName) {
                return resolve({ success: false, err: { message: "Name taken", id: "inUseName" } });
            } else {
                return resolve({ success: false, err: { message: "Unknown error", id: "unknownError" } });
            }
        } else {
            const result = db.prepare("INSERT INTO Users(Email, Password, Salt, DisplayName) VALUES(?, ?, ?, ?)").run(
                email, pass.hash, pass.salt, displayName
            );

            const uid = result.lastInsertRowid;

            return resolve({ success: true, user: {
                email: email,
                displayName: displayName,
                id: uid
            }});
        }
    } catch (e) {
        return reject(e);
    }
});

/**
 * Delete a user, and their posts, from the database
 * @param {string|number} userId - ID of user to remove
 */
exports.deleteUser = (userId) => new Promise(async(resolve, reject) => {
    try {
        db.prepare("DELETE FROM Posts WHERE AuthorID=?").run(userId);
        const result = db.prepare("DELETE FROM Users WHERE ID=?").run(userId);
        return resolve(result.changes > 0);
    } catch (e) {
        return reject(e);
    }
});
