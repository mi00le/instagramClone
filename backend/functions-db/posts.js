const sql = require("./db-init.js");
const utils = require("../utils/posts");
const db = sql.getDb();

exports.createPost = (image, title, description, tags, userName, userId, callback) => {
    if (!userId || !userName) {
        if (callback && callback instanceof Function) callback(false);
        return;
    }

    // upload image somehow
    const url = typeof image === "string" ? image : "testStringPlsFix";

    title = title ? title : "";
    description = description ? description : "";
    tags = tags ? tags : "";

    const currentTime = new Date().getTime();

    const prep = db.prepare("INSERT INTO Posts(AuthorID, AuthorName, Url, CreatedAt, Title, Description, Tags) VALUES(?, ?, ?, ?, ?, ?, ?)");
    const result = prep.run(userId, userName, url, currentTime, title, description, tags);

    if (callback && callback instanceof Function) callback(!!(result), {
        id: result.lastInsertRowid,
        userId: userId,
        username: userName,
        url: url,
        createdAt: currentTime,
        title: title,
        description: description,
        tags: tags
    });
};

exports.getPost = (postId, callback) => {
    const row = db.prepare("SELECT * FROM Posts WHERE ID=?").get(postId);

    if (row) {
        if (callback && callback instanceof Function) callback(true, {
            id: row.ID,
            userId: row.AuthorID,
            username: row.AuthorName,
            url: row.Url,
            createdAt: row.CreatedAt,
            title: row.Title,
            description: row.Description,
            tags: row.Tags
        });
    } else if (callback && callback instanceof Function) callback(false);
};

exports.getAllPosts = (limit = -1) => new Promise(async (resolve, reject) => {
    try {
        const rows = await db.prepare("SELECT * FROM Posts LIMIT ?").all(limit);
        return resolve(rows.map(utils.toClientStructure));
    } catch (e) {
        return reject(e);
    }
});

exports.getAllPostsFromUser = (userId, callback) => {
    const rows = db.prepare("SELECT * FROM Posts WHERE AuthorID=?").all(userId);

    if (rows) {
        let result = [];
        for (let i = rows.length - 1; i >= 0; --i) {
            let obj = rows[i];
            result.push({
                id: obj.ID,
                userId: obj.AuthorID,
                username: obj.AuthorName,
                url: obj.Url,
                createdAt: obj.CreatedAt,
                title: obj.Title,
                description: obj.Description,
                tags: obj.Tags
            });
        }
        if (callback && callback instanceof Function) callback(true, result);
    } else if (callback && callback instanceof Function) callback(false);
};

exports.updatePost = (postId, title, description, tags, callback) => {
    const row = db.prepare("SELECT * FROM Posts WHERE ID=?").get(postId);

    if (row) {
        const result = db.prepare("UPDATE Posts SET Title=?,Description=?,Tags=? WHERE ID=?").run(
            (title ? title : row.Title),
            (description ? description : row.Description),
            (tags ? tags : row.Tags),
            postId
        );

        if (callback && callback instanceof Function) callback(!!(result), result.changes);
    } else {
        if (callback && callback instanceof Function) callback(false);
    }
};

exports.deletePost = (postId, callback) => {
    // delete image somehow

    const result = db.prepare("DELETE FROM Posts WHERE ID=?").run(postId);

    if (callback && callback instanceof Function) callback(!!(result));
};
