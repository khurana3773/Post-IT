var express = require('express');
var router = express.Router();

router.get('/',
	function (req, res) {
		let miles = req.param("miles");
	//	console.log(miles);

    }
);

module.exports = router;
