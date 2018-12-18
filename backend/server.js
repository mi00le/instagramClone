const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dbUsers = require("./functions-db/users.js");
const dbPosts = require("./functions-db/posts.js");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3002;

app.route("/users").get((req, res) => {
    dbUsers.getAllUsers((result, users) => {
        if (result && !!(users)) {
            res.json({ success: true, users: users });
        } else {
            res.json({ success: false });
        }
    });
}).post((req, res) => {
    if (req.body.email && req.body.password && req.body.displayName) {
        dbUsers.createUser(req.body.email, req.body.password, req.body.displayName, (result, user, err) => {
            res.json(result ? { success: result, user: user } : { success: result, error: err });
        });
    } else res.json({ success: false, error: { message: "Invalid request, missing email, password, or displayName", id: "missingParams" } });
});

app.route("/users/auth").post((req, res) => {
    if (req.body.email && req.body.password) {
        dbUsers.authenticateUser(req.body.email, req.body.password, (result, err) => {
            res.json(result ? { success: result } : { success: result, error: err });
        });
    } else {
        res.json({ success: false, error: { message: "Invalid request, missing email or password", id: "missingParams" } });
    }
});

app.route("/users/:userId").get((req, res) => {
    dbUsers.getUser(req.params.userId, (result, user, err) => {
        if (result && !!(user)) {
            res.json({ success: true, user: user });
        } else {
            res.json({ success: false, error: err });
        }
    });
}).delete((req, res) => {
    dbUsers.deleteUser(req.params.userId, (result) => {
        res.json({ success: result });
    });
});

app.route("/posts").get(async (req, res) => {
    try {
        const posts = await dbPosts.getAllPosts(req.query.limit);
        res.json({ posts });
    } catch (e) {
        res.status(500).send("Something broke!");
    }
});

app.route("/posts/:userId").get((req, res) => {
    dbPosts.getAllPostsFromUser(req.params.userId, (result, posts) => {
        if (result && !!(posts)) {
            res.json({ success: true, posts: posts });
        } else res.json({ success: false });
    });
}).post((req, res) => {
    dbPosts.createPost(req.body.image, req.body.title, req.body.description, req.body.tags, req.body.username, req.params.userId, (result, post) => {
        res.json({ success: result, post: result ? post : null });
    });
});

app.route("/posts/:userId/:postId").get((req, res) => {
    dbPosts.getPost(req.params.postId, (result, post) => {
        if (result && !!(post)) {
            if (req.params.userId === post.userId) {
                res.json({ success: true, post: post });
            } else {
                res.json({ success: false });
            }
        } else {
            res.json({ success: false });
        }
    });
}).post((req, res) => {
    dbPosts.updatePost(req.params.postId, req.body.title, req.body.description, req.body.tags, (result) => {
        res.json({ success: result });
    });
}).delete((req, res) => {
    dbPosts.deletePost(req.params.postId, (result) => {
        res.json({ success: result });
    });
});

app.use((req, res) => {
    res.status(404).send(req.originalUrl + " not found");
});

app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log("Node listening on port " + port + "...");
});
