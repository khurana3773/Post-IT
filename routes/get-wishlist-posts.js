var express = require('express');
var router = express.Router();

/**
 * Return a list of post from _id
 */

router.get('/', function (req, res) {
	var db = req.db;
	var collections = db.get("wishlist");

//	console.log(req);
	var userId = req.param("userId");

	//adding title for simplification of calls
	//todo : get postIds and then get title from the posts.
	collections.find({userId: userId}, {"postId":1,"title":1}, function (e, docs) {

		res.send(JSON.stringify(docs));
    });
});

module.exports = router;
