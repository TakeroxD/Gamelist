
$('#loginButton').on('click',function(){
	//proceso login
	let email = $('#email').val()
  	let password = $('#password').val()

	json_to_send = {
		"email": email,
		"password" : password
	};

  	json_to_send = JSON.stringify(json_to_send)
  	$('body').addClass('waiting')
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
      		$('body').removeClass('waiting')
      		window.location = './index.html'
    	},
    	error: function(error_msg) {
    		$('body').removeClass('waiting')
      		alert((error_msg["responseText"]))
    	}
  	})
})

$('.input_wrap').on('click', function(event){
  $(this).addClass('input_wrap_sel');
});

$('.input_wrap').focusout(function(event){
  $(this).removeClass('input_wrap_sel');
});