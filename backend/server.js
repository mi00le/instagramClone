var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var dbUsers = require('./functions-db/users.js');
var dbPosts = require('./functions-db/posts.js');

app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 80;

app.get("/", (req, res) => {
	res.json({ response: "test success" });
});

app.route("/login").get((req, res) => {
	dbUsers.logIn("AAAAAA", "bbbbbb"); // testing only
	res.redirect("/");
}).post((req, res) => {
	if (req.body.email && req.body.password) {
		dbUsers.logIn(req.body.email, req.body.password, (success) => {
			res.json({success: success});
		});
	}
});

app.route("/createUser").post((req, res) => {
	if (req.body.email && req.body.password && req.body.displayName) {
		dbUsers.createUser(req.body.email, req.body.password, req.body.displayName, (success) => {
			res.redirect("/");
		});
	}
});

app.post("/publish", (req, res) => {
	res.json({ success: false });
});

app.post("/deleteUser", (req, res) => {
	if (req.body.userId) {
		dbUsers.deleteUser(req.body.userId, (success) => {
			res.json({success: success});
		});
	}
});

app.listen(port, () => {
	console.log("Node listening on port " + port + "...");
});