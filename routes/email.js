var express = require('express');
var router = express.Router();

//Controller to handle validation of Login form
router.post('/',
    function(req, res)
    {
        console.log("email requested");
        let id = req.param('id');
        let db = req.db;
        let collection = db.get("users");

        collection.findOne({"userId": id}, function (err, docs) {
            if(err){
                res.redirect('/');
            }else{
                res.send(docs.emailAddress);
            }
        });
    }
);


module.exports = router;
