var sql = require('./db-init.js');
var db = sql.getDb();

exports.createPost(image, description, userId) {
    // upload image somehow
    var url = "debug";

    db.run("INSERT INTO Posts(AuthorID, Url, CreatedAt, Description) VALUES(?, ?, ?, ?)", {
        1: userId, 2: url, 3: new Date().getTime(), 4: description
    });
}
