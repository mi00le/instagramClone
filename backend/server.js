var express = require('express');
var app = express();

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));

var port = process.env.PORT || 80;

app.get("/", (req, res) => {
	res.json({response: "test success"});
});

app.post("/publish", (req, res) => {
	res.json({success: false});
});

app.delete("/delete", (req, res) => {
	res.json({success: false});
});

app.listen(port, () => {
	console.log("Node listening on port " + port + "...");
});