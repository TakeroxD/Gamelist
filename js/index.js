
$('#signupButton').on('click',function(){
	location.href='./signup.html';
})

$('#loginButton').on('click',function(){
	location.href='./login.html';
})

$('#logoutButton').on('click',function(){
	location.href='./logout.html';
})

$('.input_wrap').on('click', function(event){
  $(this).addClass('input_wrap_sel');
});

$('.input_wrap').focusout(function(event){
  $(this).removeClass('input_wrap_sel');
});