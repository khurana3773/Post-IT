var express = require('express');
var router = express.Router();

// handles auto-complete data request from request.js
router.get('/',
	function (req, res) {
		console.log('auto-complete');

		let keyword = req.param("suggested");
		// tester
		var source = [
            "T-Shirt",
            "Job",
            "Love",
            "Bob Dylan",
            "iPhone",
            "Meaning of Life"
        ];


		res.send(JSON.stringify(source));
    }
);

module.exports = router;
