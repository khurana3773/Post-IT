var express = require('express');
var router = express.Router();

//Controller to handle validation of Login form
router.post('/',
	function(req, res)
	{
		console.log("validate-sign-in");
		let username = req.param('username');
		let password = req.param('password');
		let db = req.db;
		let collection = db.get("users");

		collection.findOne({"userName": username}, function (e, docs) {

			let user = docs;
			let validated = user.validated;

			// user has validated the address through email
			if(validated && password === user.password){
                User = username;

                let userId = user._id.toString();
                res.cookie("id", userId);

                res.redirect('/');
			}else{
				// error
				// send back error
                res.redirect('/login.html');
			}

		});
	}
);

  module.exports = router;
