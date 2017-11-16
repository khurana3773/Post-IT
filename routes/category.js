var express = require('express');
var router = express.Router();

/**
 * Return a list of post for given type
 */

router.get('/', function (req, res) {
	var db = req.db;
	var collections = db.get("posts");
	console.log("req.param:"+ req.param("type"));

	collections.find({type:req.param("type")}, {sort:{timestamp:1}}, function (e, docs) {
		//console.log(docs);
		res.send(JSON.stringify(docs));
    });
});

module.exports = router;
