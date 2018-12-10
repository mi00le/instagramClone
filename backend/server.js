var express = require('express');
var app = express();

var port = process.env.PORT || 80;

app.get("/", (req, res) => {
	res.json({response: "test success"});
});

app.listen(port, () => {
	console.log("Node listening on port " + port + "...");
});