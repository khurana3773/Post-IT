'use strict';
const bodyParser = require('body-parser');
const express = require('express');
var session = require('express-session');
var cookieSession = require('cookie-session');
var cookieParser = require('cookie-parser');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const lineReader = require('line-reader');
const multer = require('multer');
const querystring = require('querystring');
const monk = require('monk');
//var db = monk("mongodb://"+"masterroot"+":"+"masterroot"+"@ds125335.mlab.com:25335/post_it");
var db = monk("mongodb://"+"PostIt"+":"+"postit1"+"@ds235065.mlab.com:35065/post_it");

var randomstring = require("randomstring");

var index = require('./routes/index');
var add_post_job = require('./routes/add-post-job');
var add_post_renting = require('./routes/add-post-renting');
var add_post_selling = require('./routes/add-post-selling');
var add_post_wishlist = require('./routes/add-post-wishlist');
var auto_complete = require('./routes/auto-complete');
var create_post = require('./routes/create-post');
var delete_post = require('./routes/delete-post');
var delete_post_wishlist = require('./routes/delete-post-wishlist');
var edit_post = require('./routes/edit-post');
var get_post = require('./routes/get-post');
var get_posts = require('./routes/get-posts');
var get_wishlist_posts = require('./routes/get-wishlist-posts');
var get_posts_stream = require('./routes/get-posts-stream');
var login_validation = require('./routes/login-validation');
var pop_up = require('./routes/pop-up');
var post_it = require('./routes/post-it');
var search = require('./routes/search');
var sell = require('./routes/sell');
var job = require('./routes/job');
var rent = require('./routes/rent');
var sign_in = require('./routes/sign-in');
var sign_out = require('./routes/sign-out');
var sign_up = require('./routes/sign-up');
var validate_signup = require('./routes/validate-signup');
var slider = require('./routes/slider');
var validate_code = require('./routes/validate-code');
var login = require('./routes/login');
var validate_signin = require('./routes/validate-signin');
var category = require('./routes/category');
var email = require('./routes/email');
var scrollData = require('./routes/scrollData');

const Uploadaws = require('./routes/imageupload');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();

// Create the app.
var app = express();

app.use(cookieSession({
    secret: 'post-it',
    name: 'session',
    keys: [randomstring.generate()],
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));



//var sess;
//app.get('/',function(req,res){
  //  sess=req.session;
    //sess.firstName;
    //sess.lastName;
    //sess.studentId;
    //sess.emailAddress;
    //sess.userName;
  //});

var port = 8081;
app.listen(port);

//Variables for EJS
var User= " ";
var alert= 0;
var credential= 0;
var userCode;


app.use(function(req, res, next)
    {
        req.db = db;
        next();
    }
);



var html_file_name ='./public/index.html';

//To store valid user credentials
var valid_password="xxxx";
var valid_user="xxxx";



// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// Use the bodyParser() middleware for all routes.
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(bodyParser.urlencoded({limit: '150mb'}));
app.use(bodyParser.json({limit: '150mb'}));


app.use('/', index);
app.use('/add-post-job', add_post_job);
app.use('/add-post-renting', add_post_renting);
app.use('/add-post-selling', add_post_selling);
app.use('/add-post-wishlist',add_post_wishlist);
app.use('/auto-complete', auto_complete);
app.use('/create-post', create_post);
app.use('/delete-post', delete_post);
app.use('/delete-post-wishlist',delete_post_wishlist);
app.use('/edit-post', edit_post);
app.use('/get-post', get_post);
app.use('/get-posts', get_posts);
app.use('/get-wishlist-posts', get_wishlist_posts)
app.use('/get-posts-stream', get_posts_stream);
app.use('/login-validation', login_validation);
app.use('/pop-up', pop_up);
app.use('/post-it', post_it);
app.use('/search', search);
app.use('/sell', sell);
app.use('/job', job);
app.use('/rent', rent);
app.use('/sign-in', sign_in);
app.use('/sign-out', sign_out);
app.use('/sign-up', sign_up);
app.use('/validate-signup', validate_signup);
app.use('/slider', slider);
app.use('/validate-code', validate_code);
app.use('/login', login);
app.use('/validate-signin', validate_signin);
app.use('/category', category);
app.use('/email', email);
app.use('/scrollData', scrollData);

var file_name=[];
var counter=0;

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "./public/images");
    },
    filename: function (req, file, callback) {
    	file_name[counter]=file.fieldname + "_" + Date.now() + "_" + file.originalname;
    	callback(null, file_name[counter]);
        counter++;
    }
});


const upload = multer({ storage: Storage, limits: { fileSize: "100mb"}}).array("imgUploader", 3);
