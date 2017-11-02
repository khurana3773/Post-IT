var express = require('express');
var router = express.Router();
//const Uploadaws = require('./imageupload');
//const multipart = require('connect-multiparty');
//const multipartMiddleware = multipart();
//console.log(Uploadaws.upload);

router.post('/',
	function (req, res) {

        console.log("add-post-selling");

		var userId = req.cookies.userId;
		// end
		var title = req.param("title");

		var about = req.param("about");
		var price = req.param("price");
		var type = req.param("type");
		var timestamp = req.param("timestamp");

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
			"location":location
		};

		var db = req.db;
		var collection = db.get("posts");

		collection.insert(postJSON, function (err, docs) {
			if(err){
				//error
			}else{
				// success
				res.redirect("index.html");
			}
		});


    }
);

module.exports = router;
