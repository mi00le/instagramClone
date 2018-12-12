var sql = require('./db-init.js');
var db = sql.getDb();

exports.createPost = (image, title, description, tags, userId, callback) => {
    if (!userId) {
        if (callback && callback instanceof Function) callback(false);
        return;
    }

    // upload image somehow
    var url = "debug";

    title = title ? title : "";
    description = description ? description : "";
    tags = tags ? tags : "";


    db.run("INSERT INTO Posts(AuthorID, Url, CreatedAt, Title, Description, Tags) VALUES(?, ?, ?, ?, ?, ?)", {
        1: userId, 2: url, 3: new Date().getTime(), 4: title, 5: description, 6: ((tags instanceof String) ? tags : JSON.stringify(tags))
    }, (err) => {
        if (callback && callback instanceof Function) callback(!(err));
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

exports.getAllPostsFromUser = (userId, callback) => {
    db.all("SELECT * FROM Posts WHERE AuthorID=?", userId, (err, rows) => {
        if (err) console.log(err.message);
        if (rows.length > 0) {
            var result = [];
            for (var obj of rows) {
                result.push({
                    id: obj.ID,
                    userId: obj.AuthorID,
                    url: obj.Url,
                    createdAt: obj.CreatedAt,
                    title: obj.Title,
                    description: obj.Description,
                    tags: obj.Tags
                });
            }
            if (callback && callback instanceof Function) callback(true, result);
        }
        if (callback && callback instanceof Function) callback(false);
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
