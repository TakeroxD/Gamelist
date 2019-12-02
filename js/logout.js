
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

$('#yesLogoutButton').on('click',function(){
	$('body').addClass('waiting')
	console.log(token)
	$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/logout',
	    headers: {
	        'Content-Type':'application/json',
        	'Authorization': 'Bearer ' + token
	    },
	    method: 'POST',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	    	localStorage.removeItem('token');
	      	alert("Logout exitoso");
	      	location.href='./index.html';

	    },
	    error: function(error_msg) {
	    	$('body').removeClass('waiting')
	    	localStorage.removeItem('token');
	      	alert("Logout exitoso");
	      	location.href='./index.html';
		}
	});
})

$('#noLogoutButton').on('click',function(){
	location.href='./index.html';
})