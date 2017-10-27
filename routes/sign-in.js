var express = require('express');
var router = express.Router();

//Controller to render sign-in page
router.post('/',
	function(req, res)
	{
		res.render('../public/login.ejs',{credential:credential});
	}
);

module.exports = router;
