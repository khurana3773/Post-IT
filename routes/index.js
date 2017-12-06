var express = require('express');
var router = express.Router();
var html_file_name ='./public/home.html';
var valid_user="xxxx";
var path = require("path");
//Controller to render application home page
router.get('/' ,
   function(req, res)
   {
       res.sendFile(path.join(__dirname +'/../public/home.html'));
   }
);

module.exports = router;
