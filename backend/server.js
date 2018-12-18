const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dbUsers = require("./functions-db/users.js");
const dbPosts = require("./functions-db/posts.js");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3002;

app.route("/users").get(async (req, res) => {
    try {
        const users = await dbUsers.getAllUsers(req.query.limit);
        res.json({ users });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).post(async (req, res) => {
    try {
        const user = await dbUsers.createUser(req.body.email, req.body.password, req.body.displayName);
        res.json({ user });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/users/auth").post(async (req, res) => {
    try {
        const auth = await dbUsers.authenticateUser(req.body.email, req.body.password);
        res.json({ auth });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/users/:userId").get(async (req, res) => {
    try {
        const user = await dbUsers.getUser(req.params.userId);
        res.json({ user });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).delete(async (req, res) => {
    try {
        const result = dbUsers.deleteUser(req.params.userId);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/posts").get(async (req, res) => {
    try {
        const posts = await dbPosts.getAllPosts(req.query.limit);
        res.json({ posts });
    } catch (e) {
        res.status(500).send("Something broke!");
    }
});

app.route("/posts/:userId").get(async (req, res) => {
    try {
        const posts = await dbPosts.getAllPostsFromUser(req.params.userId, req.query.limit);
        res.json({ posts });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).post(async (req, res) => {
    try {
        const post = dbPosts.createPost(req.body.image, req.body.title, req.body.description, req.body.tags, req.body.username, req.params.userId);
        res.json({ post });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/posts/:userId/:postId").get(async (req, res) => {
    try {
        const post = await dbPosts.getPost(req.params.postId);
        res.json({ post });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).post(async (req, res) => {
    try {
        const result = dbPosts.updatePost(req.params.postId, req.body.title, req.body.description, req.body.tags);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).delete(async (req, res) => {
    try {
        const result = dbPosts.deletePost(req.params.postId);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.use(async (req, res) => {
    res.status(404).send(req.originalUrl + " not found");
});

app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log("Node listening on port " + port + "...");
});
