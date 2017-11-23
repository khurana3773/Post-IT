var express = require('express');
var router = express.Router();

/**
 * Return a list of post for given type
 */

router.get('/', function (req, res) {

	var db = req.db;
	var collections = db.get("posts");
	var input=req.param("type").split(",");

	console.log("req"+ input[0]+", "+ input[1].split(":")[1]);
	//var query = "price >= "+input[1].split(":")[1]+" AND type='"+input[0]+"'";,price:{$gte:input[1].split(":")[1]}
	collections.find({type: input[0],price:{$gte:parseInt(input[1].split(":")[1])}}, {sort: {timestamp: 1}}, function (e, docs) {
   // collections.find(query, {sort: {timestamp: 1}}, function (e, docs) {
            console.log(docs);
            res.send(JSON.stringify(docs));
        });
});

module.exports = router;
