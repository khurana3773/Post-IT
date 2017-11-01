var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
	res.redirect("create-post.html");
});


module.exports = router;
