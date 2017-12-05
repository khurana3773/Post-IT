var express = require('express');
var router = express.Router();
//const Uploadaws = require('./imageupload');
//const multipart = require('connect-multiparty');
//const multipartMiddleware = multipart();
//console.log(Uploadaws.upload);

router.post('/',
	function (req, res) {
        console.log("delete-post-wishlist");

		 var userId = req.cookies.userId;
		// // end
		// var postId = req.param("id");
        // console.log(JSON.stringify(req.body));
      // console.log(JSON.stringify(req.body.postId[0]));


		var db = req.db;
		var collection = db.get("wishlist");
		// console.log("Post id " + req.body[0].postId + "User ID "+ userId);



        collection.remove({ postId:req.body.postId , userId: userId}, function (err, docs) {
            if (err) {
                console.log("error");
                res.send("ERROR");
            } else
            {
                console.log("successfully deleted from wishlist");
                // console.log(docs)
                console.log("success");
                res.send("OK");
            }
        });




    }
);

module.exports = router;
