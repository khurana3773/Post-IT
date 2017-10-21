// Handles database operations
const querystring = require('querystring');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;

const USER = "masterroot";
const PASSWORD = "masterroot";

const remoteURL = "mongodb://"+USER+":"+PASSWORD+"@ds125335.mlab.com:25335/post_it";
// Url to database
const url = remoteURL;


function insertToDB(obj, collectionName) {
    MongoClient.connect(url, function (err, db) {
       if(err) throw err;
       db.collection(collectionName).insertOne(obj, function (err, res){
          if(err) throw err;

          db.close();
       });
    }); 
}

function deletePost(theTitle, theUserName){ 
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var myquery = { title: theTitle, theUserName: theUserName};
    db.collection("customers").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      db.close();
    });
  }); 
}

function findUser(obj, callback) {
    MongoClient.connect(url, function(err, db) {
        db.collection("users").findOne(obj, function(err, result) {
            if (err){

            }else{
                let userId = result['_id'];
                callback(userId);
            }
        });

    });
}

function tryInsertUser(userJSON, res, errorRedirectUrl, successRedirectUrl, callback){

    MongoClient.connect(url, function(err, db) {

        let searchUser = {
            "userName": userJSON.userName,
            "emailAddress": userJSON.emailAddress,
            "studentId": userJSON.studentId
        };
        db.collection("users").findOne(searchUser, function(err, result) {
            if (err){
              //
                db.close();
            }else{

                if(result){
                    db.close();
                    res.redirect(errorRedirectUrl);
                }else{
                    db.close();
                    insertToDB(userJSON, "users");
                    callback();

                    res.redirect(successRedirectUrl);
                }

            }

        });

    });

}
module.exports.insertToDB = insertToDB;
module.exports.tryInsertUser = tryInsertUser;
module.exports.findUser = findUser;