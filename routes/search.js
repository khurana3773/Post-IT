var express = require('express');
var router = express.Router();

/**
 * Handles input value from search box
 * Returns a json
 */
router.post('/',
	function (req, res) {
		console.log("search");
		let searchKey = req.param("searchKey");
		console.log(searchKey);

		// tester
		var productJSON = {
			userId: "12312321",
			tag: ["a", "b", "c"],
			location: "2001 Pacific Ave, Alameda, CA",
			timestamp: "time"
		};

		var responses = [];


		for(var i = 0; i<4; i++){
			responses.push(productJSON);
		}
		console.log(JSON.stringify(responses));
		res.send(JSON.stringify(responses));

    }
);


module.exports = router;
