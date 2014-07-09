jQuery.Minimal-Form
===================
This is a jQuery plugin that provides a clean and space saving solution for filling out and submitting forms.  It includes REGEX element checking and custom error messages.

Basic structure
==================================
```javascript
$(selector).minimalForm(
  formOptions{object},
  formElements[array],
  function(data){}
);
```

formOptions{object}
-------------------
```javascript
success:				"string"
```
When form is completed, this is the string that it will display for a short period of time.

formElements[array]
-------------------
This selection consists of an array of objects.  These are the form elements such as a text box or a selection menu.  There are two types of elements, a selection menu and a text input box. Every element contains at least an error and placeholder key.

These are all the options for the text input field:
```javascript
{
	name: 					"string",
	type: 					"text"/"email"/"password"/"confirmPassword",
	error: 					"string",
	regex:					"email"/"password"/"CUSTOM",
	placeholder: 			"string"
}
```
For the regex option, there are default expressions such as email and password.  The expression for email is ``/[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}/``.  The expression for password is ``/^(?=.*\d).{4,16}$/``.  A custom expression can be passed as a string without the two hugging forward slashes.  If regex is not declared, no regex expression will be tested.

This is how the options for the selection menu look:
```javascript
{
	name: 					"string",
	type: 					"select",
	error: 					"string",
	placeholder: 			"string",
	options: 				{'option_1','value_1','option_2','value_2'}
}
```

function(data){}
-------------------
This is the function that will run after the form is completed.  This is where you would put your ajax call to submit the data you have collected.  The data can be called like so:
```javascript
function(data) {
	alert(data.elementName.value);
}
```
The data element also stores all the element options, so the type, name, placeholder, and error information can also be called.  In addition for textboxes the regex can be called as well.

# How do I use it?
Lets start with a demo that shows off everything this plugin can do.  We will be making a registration form:

HTML:
```html
<!doctype html>
<HTML>
	<HEAD>
		<SCRIPT src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js" type="text/javascript" ></SCRIPT>
		<SCRIPT src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js" type="text/javascript" ></SCRIPT>
		<SCRIPT src="jQuery.minimalForm.js" ></SCRIPT>
		<SCRIPT src="functions.js" ></SCRIPT>
		<LINK href="style.css" rel="stylesheet" type="text/css" >
		<LINK href='http://fonts.googleapis.com/css?family=Muli:300' rel='stylesheet' type='text/css' >
	</HEAD>
	<BODY>
		<DIV id="Target" ></DIV>
	</BODY>
</HTML>
```
JAVASCRIPT:
```javascript
$('#Target').minimalForm({
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
```

