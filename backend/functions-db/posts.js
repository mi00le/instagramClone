const sql = require("./db-init.js");
const utils = require("../utils/posts");
const db = sql.getDb();

/**
 * Create a post and insert it into the database
 * @param {*} image - The image to be stored, as a blob
 * @param {string} [title] - Post title
 * @param {string} [description] - Post description
 * @param {string} [tags] - Post tags, as a comma-separated string
 * @param {string} userName - Post author's display name
 * @param {string|number} userId - Post author's ID
 */
exports.createPost = (image, title = "", description = "", tags = "", userName, userId) => new Promise(async (resolve, reject) => {
    try {
        if (!userId) {
            return reject();
        }

        const currentTime = new Date().getTime();
        const prep = db.prepare("INSERT INTO Posts(AuthorID, AuthorName, Url, CreatedAt, Title, Description, Tags) VALUES(?, ?, ?, ?, ?, ?, ?)");
        const result = prep.run(userId, userName, image, currentTime, title, description, tags);

        return resolve({
            id: result.lastInsertRowid,
            userId: userId,
            username: userName,
            url: image,
            createdAt: currentTime,
            title: title,
            description: description,
            tags: tags
        });
    } catch (e) {
        return reject(e);
    }
});

/**
 * Get single post
 * @param {string|number} postId - ID of post to return
 */
exports.getPost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const row = db.prepare("SELECT * FROM Posts WHERE ID=?").get(postId);
        return resolve(utils.toClientStructure(row));
    } catch (e) {
        return reject(e);
    }
});

/**
 * Get all posts, up to an optional limit
 * @param {number} [limit=-1] - How many posts to return
 * @param {string} [tag]
 * @param {string} [cursor=0]
 */
exports.getAllPosts = (limit = -1, tag = "", cursor = 0) => new Promise(async (resolve, reject) => {
    try {
        const rows = await db.prepare("SELECT * FROM Posts WHERE instr(Tags, ?) LIMIT ?, ?").all(tag, cursor, limit);
        return resolve(rows ? rows.reverse().slice(0, limit < 0 ? rows.length : limit).map(utils.toClientStructure) : []);
    } catch (e) {
        return reject(e);
    }
});

/**
 * Get all posts from a user, up to an optional limit
 * @param {string|number} userId
 * @param {number} [limit=-1]
 * @param {string} [tag]
 */
exports.getAllPostsFromUser = (userId, limit = -1, tag) => new Promise(async (resolve, reject) => {
    try {
        if (!tag) tag = "";
        const rows = db.prepare("SELECT * FROM Posts WHERE AuthorID=? AND instr(Tags, ?)").all(userId, tag);
        return resolve(rows ? rows.reverse().slice(0, limit < 0 ? rows.length : limit).map(utils.toClientStructure) : []);
    } catch (e) {
        return reject(e);
    }
});

/**
 * Update a post in the database
 * @param {string|number} postId - ID of post to update
 * @param {string} [title] - New post title
 * @param {string} [description] - New post description
 * @param {string} [tags] - New post tags as a comma-separated string
 */
exports.updatePost = (postId, title, description, tags) => new Promise(async (resolve, reject) => {
    try {
        const row = db.prepare("SELECT * FROM Posts WHERE ID=?").get(postId);
        if (!row) {
            return resolve(false);
        }
        const result = db.prepare("UPDATE Posts SET Title=?,Description=?,Tags=? WHERE ID=?").run(
            (title ? title : row.Title),
            (description ? description : row.Description),
            (tags ? tags : row.Tags),
            postId
        );

        return resolve(result.changes > 0);
    } catch (e) {
        return reject(e);
    }
});

/**
 * Delete a post from the database
 * @param {string|number} postId - ID of post to remove
 */
exports.deletePost = (postId) => new Promise(async (resolve, reject) => {
    try {
        const result = db.prepare("DELETE FROM Posts WHERE ID=?").run(postId);
        return resolve(result.changes > 0);
    } catch (e) {
        return reject(e);
    }
});
