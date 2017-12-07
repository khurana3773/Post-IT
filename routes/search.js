var express = require('express');
var router = express.Router();

/**
 * Handles input value from search box
 * Returns a json
 */
router.get('/',
	function (req, res) {

		var db = req.db;
        var collection = db.get("posts");
        console.log(req.param("search"));
        var input=req.param("search").split(",");

        var query = {
            title: {
                $regex: input[0], $options : 'i'
            },
            price:{$gte:parseInt(input[1].split(":")[1])}
        };

        collection.find(query, {sort: {timestamp: 1}}, function (err, docs) {
            if(err){

            	res.status = 404;
            	res.send("Error");
            }else{
            	res.status = 202;
            	res.send(JSON.stringify(docs));
            }
        });
    }
);


module.exports = router;
