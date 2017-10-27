var express = require('express');
var router = express.Router();
var alert= 0;
var credential= 0;

//Controller to render sign-out page
router.post('/',
	function(req, res)
	{
		User= " ";//resetting variables, other than valid credentials to allow user to re-signin
		alert= 0;
		credential= 0;

		res.redirect('/');
	}
);

module.exports = router;
