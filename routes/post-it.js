var express = require('express');
var router = express.Router();

/**
 * Handles selling-post.html file
 */
router.post('/',
	function(req, res){
		var counter=0;

		if(file_name[0])
			delete file_name[0];
		if(file_name[1])
			delete file_name[1];
		if(file_name[2])
			delete file_name[2];

		upload(req, res, function (err) {
	        if (err) {

	            return res.end("<h1 style=\"text-align:center\">Something went wrong!<h1>"
	            		+"<p style=\"text-align:center\"> Please <a href=\"/posts/selling-post.html\">click here</a> to go back and try again!</p>");
	        }else{
	        var title = req.param("title");
			var about = req.param("about");

			var html="<!DOCTYPE html><html  lang=\"en\"><head>" +
					"<style>body{margin:2px;background-color: white;}#nav ul li a, visited {display: block;padding: 15px;color: #CCC; text-decoration: none; list-style-type: none;}#nav {background: #52809f; float:left;width: 100%;top: 0px;margin: 0px;padding: 0px;color:#e0e0dd;}." +
					"imgclass {display: inline-block;margin-left: 10px;margin-right: 10px;height: 240px;width:240px;box-shadow: 2px 2px 34px #888888;border-radius: 8px;border-color:white}#divclass{text-align:center;clear:both;}</style></head><body>" +
					"<div id=\"nav\"><div id=\"nav-wrapper\"><ul style=\"list-style: none;\"><li><a href=\"index.html\">Home</a></li></ul></div></div>" +
					"<div style=\"display:block;clear:both\"><h2 style=\"color:black;text-align:center;\">Post uploaded sucessfully with below details!</h1>"
				+"<div id= divclass><h3 style=\"box-shadow: 2px 2px 34px #888888;width:20%;display: inline-block;color:#52809f;margin:10px;\"> Product name: </h3><p style=\"word-wrap:break-word;margin:40px;font-style:italic\">"+title+ "</p></div><br/>"
				+"<div id=divclass><h3 style=\"box-shadow: 2px 2px 34px #888888;width:20%;display: inline-block;color: #52809f;margin:10px;\"> Product description:</h3><pre style=\"white-space: pre-wrap;/* Since CSS 2.1 */ white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */" +
						"white-space: -pre-wrap; /* Opera 4-6 */white-space: -o-pre-wrap;/* Opera 7 */ word-wrap: break-word; margin:40px;font-style:italic\"> "+about+ "</pre></div><br/>"
				+"<div id=divclass><h3 style=\"box-shadow: 2px 2px 34px #888888;width:20%;display: inline-block;color:#52809f;margin:10px;\"> Product picture(s):</h3>";

			html+="<div id=\"divclass\"><img class=\"imgclass\"  src='/images/"+file_name[0]+"'>"
				+"<img class=\"imgclass\" onerror=\"this.style.display = 'none'\" src='/images/"+file_name[1]+"'>"
				+"<img class=\"imgclass\"  onerror=\"this.style.display = 'none'\" src='/images/"+file_name[2]+"'></div></div></div></body></html>";

	        return res.end(html);
	        }

	    });

    }
);

module.exports = router;
