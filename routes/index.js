var express = require('express');
var router = express.Router();

//Controller to render application home page
router.get('/' ,
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

module.exports = router;
