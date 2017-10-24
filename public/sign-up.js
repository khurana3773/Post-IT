function validateForm() {
    var fname = document.getElementById("first_name").value;
    if (!fname.match(/^[0-9]*$/)){
        alert("First name cannot contain numbers.");
        return false;
    }

    var lname = document.getElementById("last_name").value;
    if (!lname.match(/^[0-9]*$/)) {
        alert("Last name cannot contain numbers.");
        return false;
    }

    var studentid = document.getElementById("student_id").value;

    if(!studentid.match(/^\d+$/)){
    	alert("Student id cannot contain letters");
    	return false;
	}

    var email= document.getElementById("mail").value;

    if (!email.match(/^.+@.+\..{2,4}$/)) {
        alert("Email should match the pattern: name@domain.com");
        return false;
    }

    return true;

}