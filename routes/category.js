var express = require('express');
var router = express.Router();

/**
 * Return a list of post for given type
 */

router.get('/', function (req, res) {

	var db = req.db;
	var collections = db.get("posts");
	var input=req.param("type").split(",");

	collections.find({type: input[0],price:{$gte:parseInt(input[1].split(":")[1])}}, {sort: {timestamp: 1}}, function (e, docs) {
            res.send(JSON.stringify(docs));
        });
});

module.exports = router;
