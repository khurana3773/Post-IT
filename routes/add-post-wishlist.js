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
		// // end
		// var postId = req.param("id");

   //     console.log(JSON.stringify(req.body));


        //
        // var addToWishlistJSON = {
        //     "userId": userId,
        //     "postId": jsonParsed.postId,
        //     "title" : jsonParsed.title
        // };

        // adding title for simplification of calls
        // todo : only save postIds and User Ids
            var addToWishlistJSON = {
			"userId": userId,
			"postId": req.body.postId,
			"title" : req.body.title
        };

		var db = req.db;
		var collection = db.get("wishlist");

		var postAlreadyOnWishlist = false;

        // check if post is already wishlisted, if yes, return.
        collection.count({postId: req.body.postId}, function (error, count) {
            if(count>0)
            {
                console.log("already Wishlisted");
                var data = { "alreadyExists" : "yes"};
                res.send(JSON.stringify(data));
            }
            else
			{
                collection.insert(addToWishlistJSON, function (err, docs) {
                    console.log("New item Wishlisted");
                    var data = { "alreadyExists" : "no"};
                    res.send(JSON.stringify(data));
                });

            }

        });




    }
);

module.exports = router;
