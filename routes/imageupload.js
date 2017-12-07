var exports = module.exports = {};
const AWS = require('aws-sdk');
const async = require('async');
const fs = require('fs');
const path = require('path');
const bucketName = "sjsucmpe280postit";
const multer = require('multer');
const monk = require('monk');
var multerS3 = require('multer-s3');

const USER = "PostIt";
const PASSWORD = "postit1";

var db = monk("mongodb://"+"PostIt"+":"+"postit1"+"@ds235065.mlab.com:35065/post_it");
var file_name = [];
var counter = 0;

let pathParams, image, imageName;

/** Load Config File */
AWS.config.loadFromPath('config.json');

/** After config file load, create object for s3*/
const s3 = new AWS.S3({region: 'us-west-1'});

/*const createItemObject = (callback) => {
		try {
			var upload = multer({

				  storage: multerS3({
				    s3: s3,
				    bucket: bucketName,
				    ACL: 'public-read',
			        Body:image,
				    metadata: function (req, file, cb) {
				      cb(null, {fieldName: req.files.file.fieldname});
				    },
				    key: function (req, file, cb) {
				    	console.log( file.originalname+"_"+Date.now().toString());
				    	file_name[counter] = req.files.file.originalname+"_"+Date.now().toString();

				      cb(null, file_name[counter]);
				      counter++;
				    }
				  })
				}).array("file", 3);
		}catch(err){
			callback(err, null);
		}
}
*/

function createItemObject(){
	  const params = {
	        Bucket: bucketName,
	        Key: `${imageName}`,
	        ACL: 'public-read',
	        Body:image
	    };
		s3.putObject(params, function (err, data) {
			if (err) {
		    	console.log("Error uploading image: ", err);
		    	return(err);
		    } else {
		    	console.log("Successfully uploaded image on S3", data);
		    	return(data);
		    }
		})
	}
exports.upload = (req, res) => {

	var counter = 0;
	var img = [];

	// test for now
	var userId = req.cookies.userId; //"123";
	// end
	var title = req.body.title;
	var about = req.body.about;
	var price = req.body.price;
	var type = req.body.type;
	var timestamp = req.body.timestamp;

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
		"image1": null,
		"image2": null,
		"image3": null
	};
	var collection = db.get("posts");

	collection.insert(postJSON, function (err, doc)
	{

		if(err){

			return res.end("<h1 style=\"text-align:center\">Something went wrong in form data!<h1>"

			+"<p style=\"text-align:center\"> Please <a href=\"/posts/selling-post.html\">click here</a> to go back and try again!</p>");
		}else{

			req.files.file.forEach(function(file){
				var tmp_path = file.path;
				image = fs.createReadStream(tmp_path);
				imageName = Date.now().toString()+"_"+file.originalFilename;
				img[counter]=imageName;
				createItemObject(function (err, result){
								if(err){
								//	console.log(err);
									collection.remove( postJSON);
									return res.end("<h1 style=\"text-align:center\">Something went wrong in saving images!<h1>"

										+"<p style=\"text-align:center\"> Please <a href=\"/posts/selling-post.html\">click here</a> to go back and try again!</p>");
								}

							});
				counter++;

			});
			var param={};
			if(counter === 1)
				param["image1"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[0];
			if(counter === 2)
			{
				param["image1"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[0];
				param["image2"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[1];
			}
			if(counter === 3)
			{

				param["image1"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[0];
				param["image2"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[1];
				param["image3"]="https://s3-us-west-1.amazonaws.com/sjsucmpe280postit/"+img[2];
			}

			collection.update( postJSON,{$set: param});

			res.redirect("home.html");
		}

	});

};
