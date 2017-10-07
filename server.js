'use strict';
const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const lineReader = require('line-reader');
const db = require('./database/database');
var multer = require('multer');

// Create the app.
var app = express();
app.listen(8081);

var html_file_name ='./public/index.html';

//To store valid user credentials
var valid_password="xxxx"; 
var valid_user="xxxx";

//Variables for EJS
var User= " ";
var alert= 0;
var credential= 0;

// Use the bodyParser() middleware for all routes.
app.use(bodyParser());
app.use(express.static("public"));
app.use(bodyParser.json());
var file_name=[];
var counter=0;

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
    	file_name[counter]=file.fieldname + "_" + Date.now() + "_" + file.originalname;
    	console.log("file names:"+file_name[counter]+" and counter:"+counter );
    	callback(null, file_name[counter]);
        counter++;
    }
});

let upload = multer({ storage: Storage}).array("imgUploader", 3);

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
		var username = req.param('username');
		var password = req.param('password');
		
		if( username === valid_user && password === valid_password){// If credentials are valid, redirect to homepage and send welcome message
			User = username;
			res.redirect('/');
        }else{ // If credentials are invalid, redirect to same login page and send flag- credential to alert
			credential=1;
			res.render('../public/login.ejs',{credential:credential});
		}	
			
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
		var firstName = req.param("first_name");
		var lastName = req.param("last_name");
		var studentID = req.param("student_id");
		var emailAddress = req.param('email');
		var userName = req.param("username");
		var password = req.param("password");
		
		//Populate the variables for server to remember user credentials
		//For mockup, we havent stored other details.
		User = userName ;
		valid_password = password;
		res.render('../public/validation.ejs',{alert:alert});
    }
);

//Controller to handle validation of code
app.post('/'+ 'validate-code',
	function (req, res){
        console.log('validate-code');
		var code = req.param("code");
		if(code === '1111'){// If code is valid, redirect to homepage and send welcome message
			valid_user = User;
			credential=0;
			res.redirect('/');

		}else{ // If code is invalid, redirect to same page and send flag alert
			alert = 1;
			res.render('../public/validation.ejs',{alert:alert});
		}

	}
);

//Controller to render selling-post page
app.get('/'+'sell',
	function(req, res)
	{
		res.redirect('/posts/selling-post.html');
	}
);
/**
 * Handles selling-post.html file
 */

app.post('/'+'post-it',
	(req, res) =>{
		counter=0;
        
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
			
			var html="<!DOCTYPE html><html><head>" +
					"<style>body{margin:10px;background-color: ##e0e0dd;}.imgclass {display: inline-block;margin-left: auto;margin-right: auto;height: 40%;width:30%;box-shadow: 2px 2px 34px #888888;border-radius: 8px;}#divclass{text-align:center;}</style></head><body>" +
					"<h1 style=\"color:white;border: 2px solid black;border-radius: 8px;background-color: #52809f;height:10%;text-align:left\"><a href="/">Post It</a></h1>" +
					"<h2 style=\"color:white;border: 2px solid black;border-radius: 8px;background-color: #52809f;height:10%;text-align:center\">Post uploaded sucessfully with below details!</h1>"
				+"<h3 style=\"color:white;border: 2px solid black;border-radius: 8px;background-color: #52809f;height:10%\"> Product name: </h3><p style=\"border: 2px solid black;border-radius: 8px;background-color: white;font-style:italic\">"+title+ "</p><br/>"
				+"<h3 style=\"color:white;border: 2px solid black;border-radius: 8px;background-color: #52809f;\"> Product description:</h3><pre style=\"border: 2px solid black;border-radius: 8px;background-color: white;font-style:italic\"> "+about+ "</pre><br/>"
				+"<h3 style=\"color:white;border: 2px solid black;border-radius: 8px;background-color: #52809f;\"> Product picture(s):</h3>";
			
			html+="<div class=\"divclass\"><img class=\"imgclass\"  src='/images/"+file_name[0]+"'>"
				+"<img class=\"imgclass\" onerror=\"this.style.display = 'none'\" src='/images/"+file_name[1]+"'>"
				+"<img class=\"imgclass\"  onerror=\"this.style.display = 'none'\" src='/images/"+file_name[2]+"'></div></body></html>";
						
	        return res.end(html);
	        }

	    });

    }
);
