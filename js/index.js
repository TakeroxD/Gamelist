
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
		$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/user/'+localStorage.getItem('userId'),
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	      	let newHtml=`
				<h2>`+data.username+`</h2>
				<div id="email" class="info">
					<label>email</label>"\n"<label>${data.email}</label>
				</div>
				<div id="optInfo" class="info">
					<span id="aboutSpan" class="edit">edit</span>
					<label id="about">${data.about}"\n"</label>
					<label id="sex">${data.sex}"\n"</label>
					<label id"location">${data.location}</label>
				</div>
				<div id="social" class="info">
					<span id="socialSpan" class="edit">edit</span>
					<label id="steam">Steam:${data.steamid}</label>
					<label id="xbox">Xbox:${data.xboxid}</label>
					<label id="playstation">Playstation:${data.playstationid}</label>
					<label id="nintendo">Nintendo:${data.nintendoid}</label>
					<label id="epic">Epic:${data.epicid}</label>
					<label id="discord">Discord:${data.discordid}</label>
					<label id="twitch">Twitch:${data.twitchid}</label>
					<label id="mixer">Mixer:${data.mixerid}</label>
					<label id="youtube">Youtube:${data.youtubeid}</label>
					<label id="twitter">Twitter:${data.twitterid}</label>
					<label id="instagram">Instagram:${data.instagramid}</label>
					<label id="facebook">Facebook:${data.facebookid}</label>
				</div>
					`
			
			$('#infodiv').append(newHtml)
	    },
	    error: function(error_msg) {
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
		}
	});
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
	    				<span id="revs">Reviews:</span>
	    			</div>
	    		</div>
	    	`
	    	$('#infodiv').append(newHtml)

	    	$('#addToPlay').on('click',function(){
				$('body').addClass('waiting') 
				if(token){
					var user = localStorage.getItem('userId');
			    	jsonToSend = {
			    		"game":gameId
			    	}
			    	jsonToSend = JSON.stringify(jsonToSend);
			    	console.log(jsonToSend)
					$.ajax({
   						url: 'https://gamelistwebapp.herokuapp.com/user/toplay/'+user,
    					headers: {
        					'Content-Type':'application/json',
        					'Authorization': 'Bearer ' + token
    					},
    					method: 'POST',
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
			    		"game":gameId
			    	}
			    	jsonToSend = JSON.stringify(jsonToSend);
			    	console.log(jsonToSend)
					$.ajax({
   						url: 'https://gamelistwebapp.herokuapp.com/user/played/'+user,
    					headers: {
        					'Content-Type':'application/json',
        					'Authorization': 'Bearer ' + token
    					},
    					method: 'POST',
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
		    			<p class="review">${data.reviews[i].review}</p>
		    		`
		    	}
		    	$('#revs').append(newHtml)
	    	}
	    },
	    error: function(error_msg){
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
	    }
	});
}

function getGameN(gameId){
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
	    			</div>
	    			<div class="gameDescription">
	    				<h1>${data.name}</h1>
	    				<h5>Release date: ${data.releasedate}</h5>
	    				<h3>Rating: ${data.rating}</h3>
	    				<p>Plot: ${data.plot}</p>
	    				<span id="revs">Reviews:</span>
	    			</div>
	    		</div>
	    	`
	    	$('#infodiv').append(newHtml)

	    	if(data.reviews.length>0){
		    	newHtml = ''
		    	for(let i=0; i<data.reviews.length;i++){
		    		newHtml += `
		    			<p class="review">${data.reviews[i]}</p>
		    		`
		    	}
		    	$('#revs').append(newHtml)
	    	}
	    },
	    error: function(error_msg){
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
	    }
	});
}

function getGameS(gameId){
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
	    			</div>
	    			<div class="gameDescription">
	    				<h1>${data.name}</h1>
	    				<h5>Release date: ${data.releasedate}</h5>
	    				<h3>Rating: ${data.rating}</h3>
	    				<p>Plot: ${data.plot}</p>
	    				<span id="revs">Reviews:</span>
	    				<div id="jaja">
	    					<input id="newReview">
	    					<button id="revButton">Agregar</button>
	    				</div>
	    			</div>
	    		</div>
	    	`
	    	$('#infodiv').append(newHtml)

	    	if(data.reviews.length>0){
		    	newHtml = ''
		    	for(let i=0; i<data.reviews.length;i++){
		    		newHtml += `
		    			<p class="review">${data.reviews[i].review}</p>
		    		`
		    	}
		    	$('#revs').append(newHtml)
	    	}

	    	$('#revButton').on('click',function(){
	    		jsonToSend={"review":$('#newReview').val()}
	    		jsonToSend = JSON.stringify(jsonToSend);
	    		$('#newReview').val('')
	    		console.log(jsonToSend)
	    		$.ajax({
					url: 'https://gamelistwebapp.herokuapp.com/game/'+gameId,
					headers: {
				        'Content-Type':'application/json'
				    },
				    method: 'POST',
				    dataType: 'json',
				    data: jsonToSend,
				    success:function(data){
				    	alert("Review agregada")
				    },
				    error:function(error){
				    	alert("Error al agregar review" + error)
				    }
				});
	    	})
	    },
	    error: function(error_msg){
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
	    }
	});
}

$('#mygamesplayed').on('click',function(){
	$('body').addClass('waiting')
	$('#infodiv').replaceWith(`
			<div id="infodiv">
			</div>`)
	var user = localStorage.getItem('userId');
	$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/user/'+user,
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	      	let newHtml=''
			for(let i=0 ; i<data.played.length ; i++){
				var current = data.played[i].game
				console.log(current)
				$.ajax({
					url: 'https://gamelistwebapp.herokuapp.com/game/'+current,
					headers: {
				        'Content-Type':'application/json',
				        'Authorization': 'Bearer ' + token
				    },
				    method: 'GET',
				    dataType: 'json',
				    success: function(data){
				    	newHtml=`
							<div class="gameElement">
								<img src="${data.image}" class="gameImg" onclick="getGameS('${data._id}')">
								<label class="gameNameLbl" onclick="getGameS('${data._id}')">${data.name}</label>
							</div>`
						$('#infodiv').append(newHtml)
				    },
				    error: function(error){
				    	alert(":(");
				    }

				});
			}
			
	    },
	    error: function(error_msg) {
	    	$('body').removeClass('waiting')
	      	alert((error_msg['responseText']));
		}
	});
})

$('#mygamestoplay').on('click',function(){
	$('body').addClass('waiting')
	$('#infodiv').replaceWith(`
			<div id="infodiv">
			</div>`)
	var user = localStorage.getItem('userId');
	$.ajax({
	    url: 'https://gamelistwebapp.herokuapp.com/user/'+user,
	    headers: {
	        'Content-Type':'application/json',
	        'Authorization': 'Bearer ' + token
	    },
	    method: 'GET',
	    dataType: 'json',
	    success: function(data){
	    	$('body').removeClass('waiting')
	      	let newHtml=''
			for(let i=0 ; i<data.toplay.length ; i++){
				var current = data.toplay[i].game
				$.ajax({
					url: 'https://gamelistwebapp.herokuapp.com/game/'+current,
					headers: {
				        'Content-Type':'application/json',
				        'Authorization': 'Bearer ' + token
				    },
				    method: 'GET',
				    dataType: 'json',
				    success: function(data){
				    	newHtml=`
							<div class="gameElement">
								<img src="${data.image}" class="gameImg" onclick="getGameN('${data._id}')">
								<label class="gameNameLbl" onclick="getGameN('${data._id}')">${data.name}</label>
							</div>`
							$('#infodiv').append(newHtml)
				    },
				    error: function(error){
				    	alert(":(");
				    }

				});
			}
			
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

