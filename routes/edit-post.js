var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	console.log("edit post");

	var db = req.db;
	let collection = db.get("posts");

	var post = req.param("post");

	//collection.findOneAndUpdate({_id: post._id}, post);

	console.log(post._id);



    collection.update({_id: post._id}, {
    	"userId": post.userId,
		"title": post.title,
		"about": post.about,
		"price": parseInt(post.price),
		"type": post.type,
		"timestamp": post.timestamp,
		"location": post.location,

		"img1": post.img1,
		"img2": post.img2,
		"img3": post.img3
 	});

});

module.exports = router;
