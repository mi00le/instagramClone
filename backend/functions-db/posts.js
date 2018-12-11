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
