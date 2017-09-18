// Handles database operations
var mongoClient = require('mongodb').MongoClient;
// Url to database
var url = "mongodb://localhost.8080/PostItDB";

mongoClient.connect(url, function (err, db){

});