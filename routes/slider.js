var express = require('express');
var router = express.Router();

router.post('/',
	function (req, res) {
		let miles = req.param("miles");
		console.log(miles);

    }
);

module.exports = router;
