var express = require('express');
var router = express.Router();

router.get("/", function (req, res) {

    console.log("create-post.html");

    let userId = req.cookies.userId;

    if (userId) {
    	console.log(userId);
    	res.redirect("create-post.html");
	}else{
    	res.redirect("/");
	}
});


module.exports = router;
