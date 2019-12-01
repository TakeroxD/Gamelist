
$('#signupButton').on('click',function(){
	//proceso signup
	let name = $('#name').val();
	let password = $('#password').val();
  	let email = $('#email').val();
  	let age = $('#age').val();

  	if (age < 14 || age > 120){
  		$('#warning').prop('visibility','visible');
  		$('#signupButton').prop('disabled','true');
  	}
  	else{
  		json_to_send = {
  			"name": name    		
    		"email": email,
    		"password" : password
  		};

  		json_to_send = JSON.stringify(json_to_send);

  		$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/signup',
	    headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'POST',
	    dataType: 'json',
	    data: json_to_send,
	    success: function(data){
	      alert("Usuario creado con exito");
	      window.location = './index.html'
	    },
	    error: function(error_msg) {
	      alert((error_msg['responseText']));
	    }
	  });
  	}
})