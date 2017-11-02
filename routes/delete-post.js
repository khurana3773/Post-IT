var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
	console.log("delete post");
	var db = req.db;
	var collection = db.get("posts");
	var json = req.body.json;

	collection.remove({ _id: json._id }, function (err, doc) {
        if(err){
        	res.send("ERROR");
        }else{
            res.send("OK");
        }
    });

});

module.exports = router;
