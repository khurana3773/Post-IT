var express = require('express');
var router = express.Router();
var handle = require('./handle');
var userCode;
//var session;

//Controller to handle validation of sign-up page
router.post('/',
	function (req, res) {
		console.log("validate-signup");
		var firstName = req.param("first_name");
		var lastName = req.param("last_name");
		//process.env.studentId = req.param("student_id");
		//studentId = process.env.studentId;

		var studentId = req.param("student_id");
		var emailAddress = req.param('email');
		var userName = req.param("username");
		var password = req.param("password");

    session = req.session;
		session.firstName = firstName;
		session.lastName = lastName;
		session.studentId = studentId;
		session.emailAddress = emailAddress;
		session.userName = userName;

		console.log('sess.studentId on signup page is ' + session.studentId);

		var code = handle.generateCode();
		userCode = code;
		let userJSON = {
			"firstName": firstName,
			"lastName": lastName,
			"studentId": studentId,
			"emailAddress": emailAddress,
			"username": userName,
			"password": password,
			"validation_code": code,
            "validated": false
		};

		var db = req.db;
		let collection = db.get("users");

		console.log('db is '+ db);
		console.log('collection is ' +collection);


		let searchUser = {
            "userName": userName,
            "emailAddress": emailAddress,
            "studentId": studentId
		};


		collection.find(searchUser, function (e, docs) {

			if(docs.length === 0){

				console.log('inside 1');
                collection.insert(userJSON, function(e, docs){
                    if(e){
                        console.log('inside 2');
                        console.log(e);
                    }else{
                        console.log('inside 3');
                        handle.sendCodeToEmail(emailAddress, code);
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

module.exports = router;
