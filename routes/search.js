var express = require('express');
var router = express.Router();

/**
 * Handles input value from search box
 * Returns a json
 */
router.post('/',
	function (req, res) {

	var search = req.param("search");

        var collection = db.get("posts");

        var query = {
            title: {
                $regex: search
            }
        };
        // search the oldest 
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
