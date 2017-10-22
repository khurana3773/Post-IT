function validateForm() {
    var fname = document.getElementById("first_name").value;
    if (fname.match(/^([^0-9])$/)) {
        alert("Please enter a name");
        return false;
    }

    var lname = document.getElementById("last_name").value;
    if (lname.match(/^([^0-9])$/)) {
        alert("Please enter a name.");
        return false;
    }

    var studentid = document.getElementById("student_id").value;

    if(!studentid.match(/^\d+$/)){
    	alert("Student id cannot contain letters");
    	return false;
	}

    if (sjsuid.length !== 9) {
        alert("SJSUID must be 9 characters long.");
        return false;
    }

    var email= document.getElementById("mail").value;

    if (!email.match(/^.+@.+\..{2,4}$/)) {
        alert("Email should match the pattern: name@domain.com");
        return false;
    }

    return true;

}