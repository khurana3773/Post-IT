var express = require('express');
var router = express.Router();

/**
 * Return a list of post from _id
 */

router.get('/', function (req, res) {
	var db = req.db;
	var collections = db.get("posts");

	var userId = req.param("userId");


	collections.find({userId: userId}, {}, function (e, docs) {
//		console.log(docs);
		res.send(JSON.stringify(docs));
    });
});

module.exports = router;
