var express = require('express');
var router = express.Router();
const querystring = require('querystring');
var User= " ";

//Controller to handle validation of Login form
router.post('/',
    function(req, res)
    {
        console.log("validate-sign-in");
        let username = req.param('username');
        let password = req.param('password');
        let db = req.db;
        let collection = db.get("users");

        collection.findOne({"username": username}, function (err, docs) {
            if(err){
                let query = querystring.stringify({
                    "v": 1
                });
                res.redirect('/login.html?'+query);
            }else{

                let user = docs;
                console.log(user===null);
                if(user === null){
                    let query = querystring.stringify({
                        "v": 1
                    });
                    res.redirect('/login.html?'+query);
                }else{
                    let validated = user.validated;

                    // user has validated the address through email
                    if(validated && password === user.password){
                        User = username;

                        let userId = user._id.toString();
                        res.cookie("userId", userId);
                        res.redirect('/');
                    }else{
                        // error
                        // send back error
                        let query = querystring.stringify({
                            "v": 1
                        });
                        res.redirect('/login.html?'+query);
                    }
                }
            }


        });
    }
);


module.exports = router;
