var express = require('express');
var router = express.Router();

//Controller to handle validation of Login form
router.post('/',
	function(req, res)
	{
		console.log("validate-signin");
		let username = req.param('username');
		let password = req.param('password');
		var db = req.db;
		let collection = db.get("users");

		collection.findOne({"username": username}, function (e, docs) {
			console.log(docs["password"]);

			let valid = "OK"; // docs["validation-code"];

			// user has validated the address through email
			if(valid === "OK" && password === docs["password"]){
                User = username;

                const query = querystring.stringify({
                    "userId": docs["_id"].toString()
                });

                res.redirect('/?'+query);
			}else{
				// error
				// send back error
                res.redirect('/login.html');
			}

		});
	}
);

  module.exports = router;
