var express = require('express');
var router = express.Router();

router.delete('/', function (req, res) {
	console.log("delete post");
    var id = req.param("postId");

	var db = req.db;
	var collection = db.get("posts");




	collection.remove({ _id:id}, function (err, docs) {
        if(err){
        	console.log("error");
        	res.send("ERROR");
        }else{
        	console.log("success");
            res.send("OK");
        }
    });

});

module.exports = router;
