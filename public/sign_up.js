	// To check the input data against the expected length and pattern before sending to server.
	function validateForm() {
		fname = document.getElementById("first_name").value;
		if (fname.length > 20) {
			alert("First name must be max 20 characters long.");
			return false;
		}
		
		lname = document.getElementById("last_name").value;
		if (lname.length > 20 ) {
			alert("Last name must be max 20 characters long.");
			return false;
		}
		
		sjsuid = document.getElementById("student_id").value;
		if (sjsuid.length !== 9) {
			alert("SJSUID must be 9 characters long.");
			return false;
		}
		
		var email= document.getElementById("mail").value;
		var emailRE=/^.+\.+.+@.+\..{2,4}$/;
		if (!email.match(emailRE)) {
			alert("Email should match the pattern: something.something@something.something");
			return false;
		}

		
	}
