var express = require('express');
var router = express.Router();
const Uploadaws = require('./routes/imageupload');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
console.log(Uploadaws.upload);

console.log("insode module export");

router.post('/',
	function (req, res) {

/*
		// test for now
		var userId = "123";
		// end
		var title = req.body.title;
		var about = req.body.about;
		var price = req.body.price;
		var type = req.body.type;
		var timestamp = req.body.timestamp;

		var location = {
			"street": req.body.street,
			"city": req.body.city,
			"zip": req.body.zip,
			"state": req.body.state
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

		collection.insert(postJSON, function (err, doc) {
			if(err){

				//error
			}else{
				// success
				res.redirect("index.html");
			}
		});

		*/

    }
);

module.exports = router;
