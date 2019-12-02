
$('#loginButton').on('click',function(){
	//proceso login
	let email = $('#email').val()
  	let password = $('#password').val()

	json_to_send = {
		"email": email,
		"password" : password
	};

  	json_to_send = JSON.stringify(json_to_send)
  	console.log(json_to_send)
  	$.ajax({
    	url: 'https://gamelistwebapp.herokuapp.com/login',
    	headers: {
        	'Content-Type':'application/json'
    	},
    	method: 'POST',
    	dataType: 'json',
    	data: json_to_send,
    	success: function(data){
      		localStorage.setItem('token', data.token)
      		window.location = './index.html'
    	},
    	error: function(error_msg) {
      		alert((error_msg["responseText"]))
    	}
  	})
})