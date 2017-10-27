var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	console.log("edit post");
	let newPost = req.param("newPost");
	let oldPost = req.param("oldPost");
	var db = req.db;
	let collection = db.get("posts");

	collection.update(oldPost, newPost, function (err, doc) {
		res.send("OK");
    });

});

module.exports = router;
