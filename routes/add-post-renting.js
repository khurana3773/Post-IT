var express = require('express');
var router = express.Router();
//const Uploadaws = require('./imageupload');
//const multipart = require('connect-multiparty');
//const multipartMiddleware = multipart();
//console.log(Uploadaws.upload);

router.post('/',
	function (req, res) {

        console.log("add-post-renting");


		var userId = req.cookies.userId;
		// end
		var title = req.param("title");
		var img1 = req.param("img-1");
		var img2 = req.param("img-2");
		var img3 = req.param("img-3");

		var about = req.param("about");
		var price = parseInt(req.param("price"));
		var type = req.param("type");
		var timestamp = new Date().getTime();

		var location = {
			"street": req.param("street"),
			"city": req.param("city"),
			"zip": req.param("zip"),
			"state": req.param("state")
		};

		var postJSON = {
			"userId": userId,
			"title": title,
			"about":about,
			"price":price,
			"type": type,
			"timestamp": timestamp,
			"location":location,
			"img1": img1,
			"img2": img2,
			"img3": img3
		};

		var db = req.db;
		var collection = db.get("posts");

		collection.insert(postJSON, function (err, docs) {
			if(err){
				res.redirect("renting-post.html");
			}else{
				// success
				res.redirect("home.html");
			}
		});


    }
);

module.exports = router;