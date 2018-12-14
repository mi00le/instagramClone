var sql = require('./db-init.js');
var db = sql.getDb();

exports.createPost = (image, title, description, tags, userName, userId, callback) => {
    if (!userId || !userName) {
        if (callback && callback instanceof Function) callback(false);
        return;
    }

    // upload image somehow
    const url = typeof(image) === "string" ? image : "testStringPlsFix";

    title = title ? title : "";
    description = description ? description : "";
    tags = tags ? tags : "";

    var currentTime = new Date().getTime();

    db.run("INSERT INTO Posts(AuthorID, AuthorName, Url, CreatedAt, Title, Description, Tags) VALUES(?, ?, ?, ?, ?, ?, ?)", {
        1: userId, 2: userName, 3: url, 4: currentTime, 5: title, 6: description, 7: ((tags instanceof String) ? tags : JSON.stringify(tags))
    }, function(err) {
        if (callback && callback instanceof Function) callback(!(err), {
            id: this.lastID,
            userId: userId,
            username: userName,
            url: url,
            createdAt: currentTime,
            title: title,
            description: description,
            tags: ((tags instanceof String) ? tags : JSON.stringify(tags))
        });
    });
};

exports.getPost = (postId, callback) => {
    db.get("SELECT * FROM Posts WHERE ID=?", postId, (err, row) => {
        if (err) {
            console.log(err.message);
        } else if (row) {
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
            return;
        }
        if (callback && callback instanceof Function) callback(false);
    })
};

exports.getAllPosts = (limit, callback) => {
    db.all("SELECT * FROM Posts", (err, rows) => {
        if (err) console.log(err.message);
        if (rows) {
            var result = [];
            for (var i = rows.length - 1; i >= 0; i--) {
                if (limit && limit > 0)
                    if (result.length >= limit)
                        break;
                var obj = rows[i];
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
    });
};

exports.getAllPostsFromUser = (userId, callback) => {
    db.all("SELECT * FROM Posts WHERE AuthorID=?", userId, (err, rows) => {
        if (err) console.log(err.message);
        if (rows) {
            var result = [];
            for (var i = rows.length - 1; i >= 0; i--) {
                var obj = rows[i];
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
    });
};

exports.updatePost = (postId, title, description, tags, callback) => {
    db.get("SELECT * FROM Posts WHERE ID=?", postId, (err, row) => {
        if (row) {
            db.run("UPDATE Posts SET Title=?,Description=?,Tags=? WHERE ID=?",
            {
                1: title ? title : row.Title,
                2: description ? description : row.Description,
                3: tags ? tags : row.Tags,
                4: postId
            }, (err) => {
                if (callback && callback instanceof Function) callback(!(err));
            });
        } else {
            if (callback && callback instanceof Function) callback(false);
        }
    });
};

exports.deletePost = (postId, callback) => {
    // delete image somehow

    db.run("DELETE FROM Posts WHERE ID=?", postId, (err) => {
        if (callback && callback instanceof Function) callback(!(err));
    });
};
