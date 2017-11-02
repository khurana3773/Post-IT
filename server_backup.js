'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const lineReader = require('line-reader');
const multer = require('multer');
const querystring = require('querystring');
const handle = require('./routes/handle');
const monk = require('monk');
var db = monk("mongodb://localhost:27017/post_it");

const Uploadaws = require('./routes/imageupload');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
console.log(Uploadaws.upload);

console.log("inside module export");


// Create the app.
var app = express();
var port = 8081;
app.listen(port);

var html_file_name ='./public/index.html';

//To store valid user credentials
var valid_password="xxxx"; 
var valid_user="xxxx";

//Variables for EJS
var User= " ";
var alert= 0;
var credential= 0;
var userCode;


// Use the bodyParser() middleware for all routes.
app.use(bodyParser());
app.use(express.static("public"));
app.use(bodyParser.json());

/*
var file_name=[];
var counter=0;

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
    	file_name[counter]=file.fieldname . + "_" + file.originalname;
    	callback(null, file_name[counter]);
        counter++;
    }
});

const upload = multer({ storage: Storage}).array("imgUploader", 3);
*/
//Controller to render application home page
app.get('/' ,
   function(req, res)
   {	
        var html = '';
		var i=0; //counter allows to dynamically add message on valid user login, at a certain line(45).
		
        lineReader.eachLine(html_file_name,
           function(line, last)
           {    i += 1;

				if (i===45 && valid_user!=="xxxx" && User!==" ")
				{ 
					html += '<h3 id = "valid">'+'Hi ' +valid_user+', please make a selection!</h3>' + '\n';
				}

               else{html += line + '\n';}

               if (last)
               {
                   res.send(html);
                   return false;
               }
               else
               {   
                   return true;
               }
           });
   });


//Controller to handle validation of Login form
app.post('/'+'validate-signin',
	function(req, res)
	{
		console.log("validate-signin");
		let username = req.param('username');
		let password = req.param('password');

		let collection = db.get("users");

		collection.findOne({"username": username}, function (e, docs) {
			console.log(docs["password"]);

			let valid = "OK"; // docs["validation-code"];

			// user has validated the address through email
			if(valid === "OK" && password === docs["password"]){
                User = username;

                const query = querystring.stringify({
                    "userId": docs["_id"].toString()
                });

                res.redirect('/?'+query);
			}else{
				// error
				// send back error
                res.redirect('/login.html');
			}

		});
	}	
);

//Controller to render sign-in page
app.post('/'+'sign-in',
	function(req, res)
	{
		res.render('../public/login.ejs',{credential:credential});
	}
);

//Controller to render sign-up page
app.post('/'+'sign-up',
	function(req, res)
	{
		res.redirect('/sign-up.html');
	}
);

//Controller to render sign-out page
app.post('/'+'sign-out',
	function(req, res)
	{
		User= " ";//resetting variables, other than valid credentials to allow user to re-signin
		alert= 0;
		credential= 0;

		res.redirect('/');
	}
);

//Controller to handle validation of sign-up page
app.post('/'+'validate-signup',
	function (req, res) {
		console.log("validate-signup");
		var firstName = req.param("first_name");
		var lastName = req.param("last_name");
		var studentId = req.param("student_id");
		var emailAddress = req.param('email');
		var userName = req.param("username");
		var password = req.param("password");

		// add to database

		let code = handle.generateCode();
		userCode = code;
		let userJSON = {
			"firstName": firstName,
			"lastName": lastName,
			"studentId": studentId,
			"emailAddress": emailAddress,
			"username": userName,
			"password": password,
			"validation-code": code
		};

		let collection = db.get("users");

		let searchUser = {
            "userName": userName,
            "emailAddress": emailAddress,
            "studentId": studentId
		};


		collection.find(searchUser, function (e, docs) {

			if(docs.length === 0){
                collection.insert(userJSON, function(e, docs){
                    if(e){

                    }else{

                        handle.sendEmail(emailAddress, code);
                        res.redirect("/validation.html");

                    }

                });


			}else{
                // already is database
                // can mean user just tried to sign up
                // or something is taken

                //TODO: Tell users what is wrong
                res.redirect("/sign-up.html");
			}
        });

		//User = userName ;
		//valid_password = password;

    }
);

//Controller to handle validation of code
app.post('/'+ 'validate-code',
	function (req, res){
		console.log("validate-code");
		let code = req.param("code");
		let userId = req.param("_id");

		let collection = db.get("users");

		if(code === userCode){
			collection.findOne({"validation-code": code}, function (e, docs) {

				if(docs.length === 1){
                    let query = querystring.stringify({
                        "userId": JSON.stringify(userId).toString()
                    });
                    res.redirect("/index.html?"+query);
				}
            });
		}else{
            const query = querystring.stringify({
                "alert": -1
            });

            res.redirect('/validation.html?'+query);
		}

	}
);
/**
 * Handles input value from search box
 * Returns a json
 */
app.post('/'+'search',
	function (req, res) {
		console.log("search");
		let searchKey = req.param("searchKey");
		console.log(searchKey);

		// tester
		var productJSON = {
			userId: "12312321",
			tag: ["a", "b", "c"],
			location: "2001 Pacific Ave, Alameda, CA",
			timestamp: "time"
		};

		var responses = [];


		for(var i = 0; i<4; i++){
			responses.push(productJSON);
		}
		console.log(JSON.stringify(responses));
		res.send(JSON.stringify(responses));

    }
);

/**
 * Allows user to request a pop up menu
 * of the current item.
 */
app.post('/'+'popup',
	function (req, res){
		// tester
		var productPopupJSON = {
			title: "The title",
			description: "a description",
			contact: "example@sjsu.edu",
        	address: { street: "1 Washingon Sq", city: "San Jose", state: "CA", zipcode:"95192"}
		};

		res.send(JSON.stringify(productPopupJSON));

	}
);

// handles auto-complete data request from request.js
app.post('/'+'auto-complete',
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


app.post('/'+'slider',
	function (req, res) {
		let miles = req.param("miles");
		console.log(miles);

    }
);

/**
 * Return a list of post from _id
 */

app.get('/'+'get-posts', function (req, res) {
	var collections = db.get("posts");

	var userId = req.param("userId");
	collections.find({userId: userId}, {}, function (e, docs) {
		res.send(JSON.stringify(docs));
    });
});

app.get('/'+'get-post', function (req, res) {
    var collections = db.get("posts");

    var postId = req.param("_id");
    collections.find({_id: postId}, {}, function (e, docs) {
        res.send(JSON.stringify(docs));
    });
});

//Controller to render selling-post page
app.get('/'+'sell',
	function(req, res)
	{
		res.redirect('/posts/selling-post.html');
	}
);

app.post('/'+'add-post-selling',multipartMiddleware, Uploadaws.upload);
/*
app.post('/'+'add-post-selling',
	function (req, res) {

		// test for now
		var userId = "123";
		// end
		var title = req.body.title;
		var about = req.body.about;
		var price = req.body.price;
		var type = req.body.type;
		var timestamp = req.body.timestamp;
		var imagenull =null;

		var location = {
			"street": req.body.street,
			"city": req.body.city,
			"zip": req.body.zip,
			"state": req.body.state
		};

		var postJSON = {
			"userId": userId,
			"title": title,
			"about":about,
			"price":price,
			"type": type,
			"timestamp": timestamp,
			"location":location,
			"image1":imagenull,
			"image2":imagenull,
			"image3":imagenull
		};

		var collection = db.get("posts");

		collection.insert(postJSON, function (err, doc) {
			if(err){

				//error
			}else{
				// success
				res.redirect("index.html");
			}
		});

    }
);
*/
app.post('/'+'add-post-job', function (req, res) {

    }
);

app.post('/'+'add-post-renting', function (req, res) {

    }
);


app.post('/'+'delete-post', function (req, res) {
	console.log("delete post");

    var collection = db.get("posts");
	var json = req.body.json;
	var userId = req.body.json.userId;
	console.log(json);
	console.log(json._id);
	collection.remove({ _id: json._id }, function (err, doc) {
        if(err){
        	res.send("ERROR");
        }else{
            res.send("OK");
        }
    });

});

app.post('/'+'edit-post', function (req, res) {
	console.log("edit post");
	let newPost = req.param("newPost");
	let oldPost = req.param("oldPost");
	let collection = db.get("posts");

	collection.update(oldPost, newPost, function (err, doc) {
		res.send("OK");
    });

});

app.get("/create-post", function (req, res) {
	console.log("create-post.html");
	res.redirect("create-post.html");
});

app.get("/login", function (req, res) {
    res.redirect("login.html");
});


/**
 * Handles selling-post.html file
 */
app.post('/'+'post-it',
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


