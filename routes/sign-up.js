var express = require('express');
var router = express.Router();

//Controller to render sign-up page
router.post('/',
	function(req, res)
	{
		res.redirect('/sign-up.html');
	}
);

module.exports = router;
