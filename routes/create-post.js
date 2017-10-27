var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {
	console.log("create-post.html");
	res.redirect("create-post.html");
});

module.exports = router;
