$(document).ready(function() {
	$(window).load(function() {

		$('#Target').minimalForm({
			//FORM OPTIONS GO HERE
			success: 				"verifing..."
		},[{
			name: 					"firstname",
			type: 					"text",
			error: 					"enter first name",
			placeholder: 			"firstname"
		},{
			name: 					"name",
			type: 					"text",
			error: 					"enter last name",
			placeholder: 			"lastname"
		},{
			name: 					"company",
			type: 					"text",
			regex: 					".*",
			placeholder: 			"company"
		},{
			name: 					"email",
			type: 					"text",
			regex: 					"email",
			error: 					"invalid email address",
			placeholder: 			"joe@domain.com"
		},{
			name: 					"password",
			type: 					"confirmPassword",
			regex: 					"password",
			error: 					"4-16 characters & contain at least 1 number",
			placeholder: 			"password"
		},{
			name: 					"newsletter",
			type: 					"select",
			error: 					"select one",
			placeholder: 			"subscribe to newsletter?",
			options: 				{'yes, subscribe':'yes','no, dont subscribe':'no'}
		}], function(data) {
			//RUN WHEN FORM HAS BEEN FILLED OUT
			$('#Target').delay(750).animate({opacity: 	'0.0'}, 500, function() {
				$(this).remove();
				console.log(data);
				alert("Form data has been logged to console (F12)");
			});
		});

	});
});