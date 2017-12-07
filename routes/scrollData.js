var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var db = req.db;
	var collections = db.get("posts");
	console.log('on scrolldata route');

  collections.find({}, {sort: {timestamp: -1}}, function(e, docs){
		//collections.find({}, {sort: {timestamp: -1}}, {limit: 5}, function(e, docs){
            console.log(docs);
						retdocs = docs.slice(0, 0+5);
            res.send(JSON.stringify(retdocs));
        });
});

module.exports = router;
