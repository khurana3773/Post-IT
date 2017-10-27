var express = require('express');
var router = express.Router();
const querystring = require('querystring');
var alert= 0;
var userCode;
//var sess;


//Controller to handle validation of code
router.post('/',
	function (req, res){
		console.log("validate-code");
		let code = req.param("code");
		let userId = req.param("_id");
		sess = req.session;
    var db = req.db;

		//var studentId = process.env.studentId;
		var studentId = sess.studentId;

		console.log('student id on validate code page is ' + studentId);

		let collection = db.get("users");

		collection.findOne({"studentId": studentId}, function (e, docs){

			console.log(docs["validation-code"]);

			userCode=docs["validation-code"];
			var userId =  docs["_id"].toString();

			console.log('userCode inside validate-code: ' + userCode);
			console.log("code inside validate-code is: "+ code);
			console.log(userId);


		if(code === userCode){

			console.log("true");

			//collection.findOne({"validation-code": code}, function (e, docs) {

				//console.log('docs length is ' + docs.length);

				//if(docs.length === 1){


										console.log('inside 1');


                    let query = querystring.stringify({
                       "userId": JSON.stringify(userId).toString()
                    });
										console.log(query);
                    res.redirect("../public/index.html?"+query);
				}

		 else{

			      console.log("inside 2false");
            const query = querystring.stringify({
                "alert": -1

            });

            res.redirect('/validation.html?'+query);
		}


 } );


 } );

module.exports = router;
