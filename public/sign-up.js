function validateForm() {
    var fname = $("#first_name").val();
    if (fname.match(/^[0-9]*$/)){
        alert("First name cannot contain numbers.");
        return false;
    }

    var lname = $("#last_name").val();
    if (lname.match(/^[0-9]*$/)) {
        alert("Last name cannot contain numbers.");
        return false;
    }

    var studentid = $("#student_id").val();

    if(!studentid.match(/^\d+$/)){
    	alert("Student id cannot contain letters");
    	return false;
	}

    var email = $("#mail").val();

    if (!email.match(/^.+@.+\..{2,4}$/)) {
        alert("Email should match the pattern: name@domain.com");
        return false;
    }

    return true;

}
