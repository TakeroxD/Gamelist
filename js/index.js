
var token = localStorage.getItem('token');
if (token) {
  token = token.replace(/^"(.*)"$/, '$1'); // Remove quotes from token start/end.
}

if(token){
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
	$('body').addClass('waiting')
	$('#infodiv').replaceWith(`
			<div id="infodiv">
			</div>`)
	$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/games',
	    headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	      	let newHtml=''
			for(let i=0 ; i<data.length ; i++){
				newHtml+=`
				<div class="gameElement">
					<img src="${data[i].image}" class="gameImg" onclick="getGame('${data[i]._id}')">
					<label class="gameNameLbl" onclick="getGame('${data[i]._id}')">${data[i].name}</label>
				</div>`
			}
			$('#infodiv').append(newHtml)
	    },
	    error: function(error_msg) {
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
		}
	});
})

function getGame(gameId){
	$('body').addClass('waiting')
	$('#infodiv').replaceWith(`
			<div id="infodiv">
			</div>`)
	$.ajax({
		url: 'https://gamelistwebapp.herokuapp.com/game/'+gameId,
		headers: {
	        'Content-Type':'application/json'
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	    	let newHtml=''
	    	newHtml+=`
	    		<div class="gamePresentation">
	    			<div id="buttonsAdd">
	    				<img src="${data.image}" class="bigGameImg">
	    				<button id="addPlayed">Añadir a juegos jugados</button>
	    				<button id="addToPlay">Añadir a juegos por jugar</button>
	    			</div>
	    			<div class="gameDescription">
	    				<h1>${data.name}</h1>
	    				<h5>Release date: ${data.releasedate}</h5>
	    				<h3>Rating: ${data.rating}</h3>
	    				<p>Plot: ${data.plot}</p>
	    				<span id="Rev${data.name}">Reviews:</span>
	    			</div>
	    		</div>
	    	`
	    	$('#infodiv').append(newHtml)

	    	$('#addToPlay').on('click',function(){
				$('body').addClass('waiting') 
				if(token){
					var user = localStorage.getItem('userId');
			    	jsonToSend = {
			    		"toplay" : {"game":gameId}
			    	}
			    	jsonToSend = JSON.stringify(jsonToSend);
			    	console.log(jsonToSend)
					$.ajax({
   						url: 'https://gamelistwebapp.herokuapp.com/user/'+user,
    					headers: {
        					'Content-Type':'application/json',
        					'Authorization': 'Bearer ' + token
    					},
    					method: 'PATCH',
    					dataType: 'json',
    					data: jsonToSend,
    					success: function(data){
				    		$('body').removeClass('waiting')
				     		alert("Juego agregado con exito");
				      		window.location = './index.html'				    	
				      	},
				    	error: function(error_msg) {
				    		$('body').removeClass('waiting')
				      		alert((error_msg['responseText']));
				    	}
    				});
				}else{
					location.href='./login.html';
				}
			})

	    	$('#addPlayed').on('click',function(){
				$('body').addClass('waiting') 
				if(token){
					var user = localStorage.getItem('userId');
			    	jsonToSend = {
			    		"played" : {"game":gameId}
			    	}
			    	jsonToSend = JSON.stringify(jsonToSend);
			    	console.log(jsonToSend)
					$.ajax({
   						url: 'https://gamelistwebapp.herokuapp.com/user/'+user,
    					headers: {
        					'Content-Type':'application/json',
        					'Authorization': 'Bearer ' + token
    					},
    					method: 'PATCH',
    					dataType: 'json',
    					data: jsonToSend,
    					success: function(data){
				    		$('body').removeClass('waiting')
				     		alert("Juego agregado con exito");
				      		window.location = './index.html'				    	
				      	},
				    	error: function(error_msg) {
				    		$('body').removeClass('waiting')
				      		alert((error_msg['responseText']));
				    	}
    				});
				}else{
					location.href='./login.html';
				}
			})

	    	if(data.reviews.length>0){
		    	newHtml = ''
		    	for(let i=0; i<data.reviews.length;i++){
		    		newHtml += `
		    			<p class="review">${data.reviews[i]}</p>
		    		`
		    	}
		    	plop = '#Rev' + data.name
		    	$(plop).append(newHtml)
	    	}
	    },
	    error: function(error_msg){
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
	    }
	});
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

