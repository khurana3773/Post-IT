var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
    var db = req.db;
    var collections = db.get("posts");

    var postId = req.param("_id");
    collections.find({_id: postId}, {}, function (e, docs) {
        res.send(JSON.stringify(docs));
    });
});

module.exports = router;
