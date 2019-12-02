
if(localStorage.getItem('token')){
	$('#signUp').addClass('invisible')
	$('#logIn').addClass('invisible')
	$('#logOut').removeClass('invisible')
	$('#profile').on('click',function(){
		$('#infodiv').replaceWith(`
			<div id="infodiv">

			</div>`
		)
	})
}
else{
	$('#signUp').removeClass('invisible')
	$('#logIn').removeClass('invisible')
	$('#logOut').addClass('invisible')

	$('#profile').on('click',function(){
		location.href='./login.html';
	})

	$('#mygamesplayed').on('click',function(){
		location.href='./login.html';
	})

	$('#mygamestoplay').on('click',function(){
		location.href='./login.html';
	})
}

$('#allgames').on('click',function(){
	$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/games',
	    headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	      	console.log(data)
	    },
	    error: function(error_msg) {
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
		}
	});
})

$('#signupButton').on('click',function(){
	location.href='./signup.html';
})

$('#loginButton').on('click',function(){
	location.href='./login.html';
})

$('#logoutButton').on('click',function(){
	location.href='./logout.html';
})

$('#logoutButton').on('click',function(){
	location.href='./logout.html';
})
