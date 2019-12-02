
$('#signupButton').on('click',function(){
	//proceso signup
	let name = $('#name').val();
	let password = $('#password').val();
  	let email = $('#email').val();
  	let age = $('#age').val();

  	if (age < 14 || age > 120){
  		$('#warning').removeClass('invisible');
  	}
  	else{
  		$('#warning').addClass('invisible');
  		json_to_send = {
  			"username": 	name,    		
    		"email": 		email,
    		"password": 	password,
    		"about": 		null,
			"sex": 			null,
			"location": 	null,
			"favconsole": 	null,
			"steamid": 		null,
			"xboxid": 		null,
			"playstationid":null,
			"nintendoid": 	null,
			"epicid": 		null,
			"discordid": 	null,
			"twitchid": 	null,
			"mixerid": 		null,
			"youtubeid": 	null,
			"twitterid": 	null,
			"instagramid": 	null,
			"facebookid": 	null
  		};

  		json_to_send = JSON.stringify(json_to_send);
		$('body').addClass('waiting')

  		$.ajax({
	    	url: 'https://gamelistwebapp.herokuapp.com/signup',
	    	headers: {
	        	'Content-Type':'application/json'
	    	},
	    	method: 'POST',
	    	dataType: 'json',
	    	data: json_to_send,
	    	success: function(data){
	    		$('body').removeClass('waiting')
	     		alert("Usuario creado con exito");
	      		window.location = './login.html'
	    	},
	    	error: function(error_msg) {
	    		$('body').removeClass('waiting')
	      		alert((error_msg['responseText']));
	    	}
	  	});
  	}
})

$('.input_wrap').on('click', function(event){
  $(this).addClass('input_wrap_sel');
});

$('.input_wrap').focusout(function(event){
  $(this).removeClass('input_wrap_sel');
});