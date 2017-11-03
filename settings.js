/** This is to connect to remote db **/

const USER = "PostIt";
const PASSWORD = "postit1";

const remoteURL = "mongodb://"+"PostIt"+":"+"postit1"+"@ds235065.mlab.com:35065/post_it";

const huy_remoteURL = "mongodb://"+"masterroot"+":"+"masterroot"+"@ds125335.mlab.com:25335/post_it";

module.exports.remoteURL = remoteURL;
module.exports.huy_remoteURL = huy_remoteURL;
