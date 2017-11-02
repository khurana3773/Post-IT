
/*
 * Handles when users has created the post.
 * Will turn inputs to json string which
 * will then be sent to database to be stored.
 */
function sendFromPost() {

    var title = document.getElementById("title").value;
    var about = document.getElementById("about").value;

    var today = new Date();

    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;

    var data = {"title":title, "about": about, "date": date, "time": time};
    post("/post-it", data);
}

function post(url, data) {
    $.post(url,
        data,
        function(data, status){
            //alert("Data: " + data + "\nStatus: " + status);
        }
    );
}