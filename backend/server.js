const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const dbUsers = require("./functions-db/users.js");
const dbPosts = require("./functions-db/posts.js");
const jwt = require("./utils/tokens");

const cors = require("cors");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

const port = process.env.PORT || 3002;

app.route("/users").post(async (req, res) => {
    try {
        const data = await dbUsers.createUser(req.body.email, req.body.password, req.body.displayName);
        if (data.success) {
            const token = jwt.createToken(data.user.id, data.user.email);
            res.json({ data, token });
        } else {
            res.status(403).json({ data });
        }
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/users/auth").post(async (req, res) => {
    try {
        const auth = await dbUsers.authenticateUser(req.body.email, req.body.password);
        if (auth.success) {
            const token = jwt.createToken(auth.user.id, auth.user.email);
            res.json({ auth, token });
        } else {
            res.status(403).json({ auth });
        }
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/users/:userId").get(async (req, res) => {
    try {
        const user = await dbUsers.getUser(req.params.userId);
        if (user) res.json({ user });
        else res.status(404).send("User not found");
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
});

app.route("/posts/:userId").get(async (req, res) => {
    try {
        const posts = await dbPosts.getAllPostsFromUser(req.params.userId, req.query.limit, req.query.tag);
        res.json({ posts });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/posts").get(async (req, res) => {
    try {
        const posts = await dbPosts.getAllPosts(req.query.limit, req.query.tag, req.query.cursor);
        res.json({ posts });
    } catch (e) {
        res.status(500).send("Something broke!");
    }
});

app.use((req, res, next) => {
    try {
        // const token = req.body.token || req.query.token || req.headers["x-access-token"];
        const token = req.headers.authorization;

        if (token) {
            jwt.jwt.verify(token, jwt.options.secret, (err, decoded) => {
                if (err) {
                    return res.status(403).send("Invalid token");
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            res.status(403).send("No token provided");
        }
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

const verifyUser = (req, res, next) => {
    try {
        let uid = req.params.userId || req.body.userId || req.query.userId;

        if (typeof(req.decoded.userId) === "number") {
            uid = parseInt(uid, 10);
        }

        if (req.decoded.userId === uid) {
            next();
        } else {
            res.status(403).json({ message: "Invalid user", id: "invalidUser" });
        }
    } catch (e) {
        res.status(500).send("Internal error");
    }
};

app.use("/users/:userId", verifyUser);
app.use("/posts/:userId", verifyUser);
app.use("/posts/:userId/:postId", verifyUser);

app.route("/users").get(async (req, res) => {
    try {
        const users = await dbUsers.getAllUsers(req.query.limit);
        res.json({ users });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/users/:userId").delete(async (req, res) => {
    try {
        const result = await dbUsers.deleteUser(req.params.userId);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/posts/:userId/:postId").post(async (req, res) => {
    try {
        const result = await dbPosts.updatePost(req.params.postId, req.body.title, req.body.description, req.body.tags);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
}).delete(async (req, res) => {
    try {
        const result = await dbPosts.deletePost(req.params.postId);
        res.json({ result });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.route("/posts/:userId").post(async (req, res) => {
    try {
        const post = await dbPosts.createPost(req.body.image, req.body.title, req.body.description, req.body.tags, req.body.username, req.params.userId);
        res.json({ post });
    } catch (e) {
        res.status(500).send("Internal error");
    }
});

app.use((req, res) => {
    res.status(404).send(req.originalUrl + " not found");
});

app.listen(port, () => {
    /* eslint-disable-next-line no-console */
    console.log("Node listening on port " + port + "...");
});

module.exports = app;
