var express = require('express');
var router = express.Router();

/**
 * Allows user to request a pop up menu
 * of the current item.
 */
router.post('/',
	function (req, res){
		// test
		var productPopupJSON = {
			title: "The title",
			description: "a description",
			contact: "example@sjsu.edu",
        	address: { street: "1 Washingon Sq", city: "San Jose", state: "CA", zipcode:"95192"}
		};

		res.send(JSON.stringify(productPopupJSON));

	}
);

module.exports = router;
