'use strict';
var bodyParser = require('body-parser');
var express = require('express');
var path = require('path');
var ejs = require('ejs');
var fs = require('fs');
var lineReader = require('line-reader');


// Create the app.
var app = express();
app.listen(8080);

var html_file_name ='./public/home.html';
//Variables for EJS
var User= " ";
var alert= 0;
var credential= 0;
var valid_password="xxxx";
var valid_user="xxxx";


// Use the bodyParser() middleware for all routes.
app.use(bodyParser());
app.use(express.static("public"));

//Controller to render application home page
app.get('/' ,
   function(req, res)
   {	
        var html = '';
		var i=0; //counter to allow dynamically add message on valid user login.

		
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
app.post('/'+'login-valid',
	function(req, res)
	{
		var username = req.param('username');
		var password = req.param('password');
		
		if( username === valid_user && password === valid_password){// If credentials are valid, redirect to homepage and send welcome message
			User = username;
			res.redirect('/');
        }else{ // If credentials are invalid, redirect to same login page and send flag credential
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
		res.redirect('/sign_up.html');
	}
);

//Controller to render sign-out page
app.post('/'+'sign-out',
	function(req, res)
	{
		User= " ";//resetting variables, other than valid credentials for user to relogin
		alert= 0;
		credential= 0;
		res.redirect('/');
	}
);

//Controller to handle validation of sign-up page
app.post('/'+'code-post',
	function (req, res) {
		var firstName = req.param("first_name");
		var lastName = req.param("last_name");
		var studentID = req.param("student_id");
		var emailAddress = req.param('email');
		var userName = req.param("username");
		var password = req.param("password");
		
		//populate the variables for server to remember user credentials
		User = userName ;
		valid_password = password;
		res.render('../public/validation.ejs',{alert:alert});
    }
);

//Controller to handle validation of code
app.post('/'+ 'valid-it',
	function (req, res){
		var code = req.param("code");
		if(code === '1111'){// If code is valid, redirect to homepage and send welcome message
			valid_user = User;
			credential=0;
			res.redirect('/');

		}else{ // If code is invalid, redirect to same page and send flag alert
			alert = 1;
			console.log("inside alert"+alert);
			res.render('../public/validation.ejs',{alert:alert});
		}

	}
);

