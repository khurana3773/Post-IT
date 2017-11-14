var express = require('express');
var router = express.Router();

/**
 * Function fetches posts to stream on main page
 */

router.get('/', function (req, res) {
    var db = req.db;
    var collections = db.get("posts");

    collections.find({}, {sort: {timestamp: 1}}, function (err, docs) {
        if(err){

        }else{

        }
    });
});

module.exports = router;