// Handles database operations
const mongoose = require('mongoose');
const mongoClient = require('mongodb').MongoClient;
// The database name
const database = "PostIt";
// Url to database
const url = "mongodb://localhost:27017/"+database;

function initCollections() {
    mongoClient.connect(url, function (err, db){
        if(err) throw err;

        db.createCollection("Post", function (err, res){
            if(err) throw err;

        });

        db.createCollection("User", function (err, res) {
            if(err) throw err;

        });

        db.close();
    });
}

/**
 * @param obj: The object to be put into database
 * @param collectionName: The name of table
 */

function insertToDB(obj, collectionName) {
    mongoClient.connect(url, function (err, db) {
       if(err) throw err;
       db.collection(collectionName).insertOne(obj, function (err, res){
          if(err) throw err;

          db.close();
       });
    });

}

module.exports.insertToDB = insertToDB;