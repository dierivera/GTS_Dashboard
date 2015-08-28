var parseKey = "fxMmEKDgj8YsU6ViFsnynNpcTiXYqNlRKQHai5Oy";
var appId = "m02AeiYtBKS6uwWorv5yfobZ2pC4r8I83ZUAnfie";
var importantLimit = 10;

//Carga los articulos con prioridad y los articulos mas vistos
function loadPublications() {  //main screen loading
	//Parse.initialize("$PARSE_APPLICATION_ID", "$PARSE_JAVASCRIPT_KEY");
	Parse.initialize(appId, parseKey);
	var Evento = Parse.Object.extend("Evento");
	var query = new Parse.Query(Evento);
	//query.equalTo("priority", "true");
	query.equalTo("priority", true);
	//query.descending("visits");
	query.find({
	  success: function(results) {
		//alert("Successfully retrieved " + results.length + " noticias.");
		// Do something with the returned Parse.Object values
		var stopper = 0;
		if (results.length > importantLimit){
			stopper=importantLimit;}
		else{
			stopper = results.length;}
		for (var i = 0; i < stopper; i++) {
		  var object = results[i];
		  var date = '</div><div class="item item-divider"><div class="item item-divider">'+   moment(object.updatedAt).format('MMMM Do YYYY, h:mm:ss a')+ '</div>';
		  document.getElementById("importantes").innerHTML = document.getElementById("importantes").innerHTML + '<div class="card"> <div class="item item-divider">'+ geticon(true) + " " +object.get('title') + '</div><div class="item item-text-wrap">'+object.get('brief_description')+  date +' </div></div>';
		  }
	  },
	  error: function(error) {
		//alert("Error: " + error.code + " " + error.message);
		if (error.code = -1)
			alert("Error de conexión, verifica la conexion de internet");
	  }
	});
	
	var query2 = new Parse.Query(Evento);
	query2.equalTo("priority", false);
	query2.descending("visits");
	query2.find({
	  success: function(results) {
		//alert("Successfully retrieved " + results.length + " noticias.");
		// Do something with the returned Parse.Object values
		var stopper = 0;
		if (results.length > importantLimit){
			stopper=importantLimit;}
		else{
			stopper = results.length;}
		for (var i = 0; i < stopper; i++) { 
		  var object = results[i];
		  var date = '</div><div class="item item-divider"><div class="item item-divider">'+   moment(object.updatedAt).format('MMMM Do YYYY, h:mm:ss a')+ '</div>';
		  document.getElementById("masVistas").innerHTML = document.getElementById("masVistas").innerHTML + '<div class="card"> <div class="item item-divider">'+ geticon(false) + " " +object.get('title') + '</div><div class="item item-text-wrap">'+object.get('brief_description')+ date + '</div></div>';
		  }
	  },
	  error: function(error) {
		//alert("Error: " + error.code + " " + error.message);
		if (error.code = -1)
			alert("Error de conexión, verifica la conexion de internet");
	  }
	});
} 

			
//Carga las noticias, eventos o proyectos segun la pantalla	
function loadArticle(type, contentDiv) {
	//Parse.initialize("$PARSE_APPLICATION_ID", "$PARSE_JAVASCRIPT_KEY");
	Parse.initialize(appId, parseKey);
	var Evento = Parse.Object.extend("Evento");		
	var query = new Parse.Query(Evento);
	query.equalTo("Type", type);
	query.descending("updatedAt");
	query.limit(importantLimit);
		query.find({
		  success: function(results) {
			//alert("Successfully retrieved " + results.length + " noticias.");
			// Do something with the returned Parse.Object values
			for (var i = 0; i < results.length; i++) { 
			  var object = results[i];
			  var date = '</div><div class="item item-divider"><div class="item item-divider">'+   moment(object.updatedAt).format('MMMM Do YYYY, h:mm:ss a')+ '</div>';
			  document.getElementById(contentDiv).innerHTML = document.getElementById(contentDiv).innerHTML + '<div class="card"> <div class="item item-divider">'+ geticon(object.get('priority')) + " " +object.get('title') + '</div><div class="item item-text-wrap">'+object.get('brief_description')+ date + '</div></div>';
			  }
		  },
		  error: function(error) {
			//alert("Error: " + error.code + " " + error.message);
			if (error.code = -1)
				alert("Error de conexión, verifica la conexion de internet");
		  }
		});
} 


//Carga las noticias, eventos o proyectos segun la pantalla	
function loadAdminArticles(type, contentDiv) {
	//Parse.initialize("$PARSE_APPLICATION_ID", "$PARSE_JAVASCRIPT_KEY");
	Parse.initialize(appId, parseKey);
	var Evento = Parse.Object.extend("Evento");		
	var query = new Parse.Query(Evento);
	query.equalTo("Type", type);
	query.descending("updatedAt");
	query.limit(importantLimit);
		query.find({
		  success: function(results) {
			//alert("Successfully retrieved " + results.length + " noticias.");
			// Do something with the returned Parse.Object values
			for (var i = 0; i < results.length; i++) { 
			  var object = results[i];
			  document.getElementById(contentDiv).innerHTML = document.getElementById(contentDiv).innerHTML + '<div class="card"><div class="item item-divider">'+ object.get('title') + '</div></div>';
			  }
		  },
		  error: function(error) {
			//alert("Error: " + error.code + " " + error.message);
			if (error.code = -1)
				alert("Error de conexión, verifica la conexion de internet");
		  }
		});
} 

			
//envia a pagina de ingresada como site
function toPage(site) {
		//location.href='login.html'; //ejemplo
		location.href=site;
}
	
	
//les pone una estrella al inicio para los articulos de prioridad			
function geticon (priority) {
		if (priority == true) //es importante
			return '<i class="icon ion-star"></i>';
		else //es de prioridad normal
			return ' ';
}


//Funcion llamada para enviar a la pantalla de crearX.
function createArticle(type){ //type can be: 'noticia', 'evento' or 'proyecto'
	alert ("Going to: create" + type + ".html");
}


function login() {
	username = document.getElementById("username").value;
	password = document.getElementById("password").value;
	Parse.initialize(appId, parseKey);
	//Parse.User.logIn("admin", "admin");
	Parse.User.logIn(username, password, {
		success: function(user) {
			alert ("Datos ingresados con exito");	
			location.href='admin_index.html';
		},
		error: function(user, error) {
			alert ("Revisa el usuario o contraseña.");
		}
	});
	document.getElementById("username").value = "";
	document.getElementById("password").value = "";	
}


function logout() {
	Parse.initialize(appId, parseKey);
	Parse.User.logOut();
	if (!Parse.User.current()){
		alert ("Exitoso Logout");
		toPage('index.html');
	}
	else{
		alert ("Error al intentar el Logout");	
	}
}