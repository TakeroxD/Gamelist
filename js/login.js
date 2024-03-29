
$('#loginButton').on('click',function(){
	//proceso login
	let username = $('#user').val()
  let password = $('#password').val()

	json_to_send = {
		"username": username,
		"password" : password
	};

  json_to_send = JSON.stringify(json_to_send)
  console.log(json_to_send)
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
        console.log(data)
     		localStorage.setItem('token', data.token)
        localStorage.setItem('user',data.user.username)
        localStorage.setItem('userId',data.user._id)
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