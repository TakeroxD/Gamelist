
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
