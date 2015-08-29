var parseKey = "fxMmEKDgj8YsU6ViFsnynNpcTiXYqNlRKQHai5Oy";
var appId = "m02AeiYtBKS6uwWorv5yfobZ2pC4r8I83ZUAnfie";
var importantLimit = 10; //cantidad maxima de noticias cargadas en la pantalla principal
var objectIds = [];
var noticiaIds = [];
var eventoIds = [];
var proyectoIds = [];

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
				if (type == 1)
					noticiaIds[i] = object.id;
				if (type == 2)
					eventoIds[i] = object.id;
				if (type == 3)
					proyectoIds[i] = object.id;
				//document.getElementById(contentDiv).innerHTML = document.getElementById(contentDiv).innerHTML + '<div class="card"><div class="item item-divider">'+ object.get('title') + '</div></div>';
				var favorito;
				if (object.get('priority')){
					favorito = '<a class="tab-item" href="#"><i class="icon ion-android-star"></i>Favorito</a>';
				}
				else{
					favorito = '<a class="tab-item" href="#"><i class="icon ion-android-star-outline"></i>Favorito</a>';
				}
				var difundir = '<a class="tab-item" href="#"><i class="icon ion-android-notifications"></i> Difundir </a>';
				var site = 'toEditPage('+ i +","+ type +');';
				//console.log(site);
				var editar = '<a class="tab-item" onclick="return '+ site +'"><i class="icon ion-edit"></i> Editar</a>';
				var eliminar = '<a class="tab-item" onclick="return deleteObject('+type + "," + i +');"><i class="icon ion-android-delete" ></i> Eliminar</a>';
				//console.log('return deleteObject('+ i +')');
				document.getElementById(contentDiv).innerHTML = document.getElementById(contentDiv).innerHTML + '<div class="card"> <div class="item item-text-wrap">' + object.get('title') + '<div class="item tabs tabs-secondary tabs-icon-left">' + favorito + difundir + editar + eliminar + '</div></div></div>';                                                                                                                                                                                                                                             
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
		//location.href="createEvento.html?objectId=0";
		//console.log("TEST");
}

function toEditPage(i,type){
	var objectId;
	if (type == 1){
		objectId = noticiaIds[i];
		location.href='editNoticia.html?objectId=' + objectId;}
	if (type == 2){
		objectId = eventoIds[i];
		location.href='editEvento.html?objectId=' + objectId;}
	if (type == 3){
		objectId = proyectoIds[i];
		location.href='editProyecto.html?objectId=' + objectId;}
}
	
	
//les pone una estrella al inicio para los articulos de prioridad			
function geticon (priority) {
	Parse.initialize(appId, parseKey);
	if (priority == true) //es importante
		return '<i class="icon ion-star"></i>';
	else //es de prioridad normal
		return ' ';
}


//Funcion llamada para enviar a la pantalla de crearX.
function createArticle(type){ //type can be: 'noticia', 'evento' or 'proyecto'
	//alert ("Going to: create" + type + ".html");
	location.href="create" + type + ".html";
}

function deleteObject(type, i){
	//console.log(objectIds[i]);
	var objectId;
	if (type == 1)
		objectId = noticiaIds[i];
	if (type == 2)
		objectId = eventoIds[i];
	if (type == 3)
		objectId = proyectoIds[i];
	Parse.initialize(appId, parseKey);
	var Evento = Parse.Object.extend("Evento");		
	var query = new Parse.Query(Evento);
	query.equalTo("objectId", objectId);
	query.find({
		  success: function(results) {
			var object = results[0];
			var confirmation = confirm("Seguro que quiere eliminar el articulo?"); //popup con dos opciones
			if (confirmation){ //si se le da que si, entra a ejecutar el eliminar
				object.destroy({
				  success: function(object) {
					alert("El elemento fue eliminado");
					toPage("admin_index.html");
				  },
				  error: function(object, error) {
					alert("Error al eliminar");
				  }
				});
			}else {
				//Do Nothing
			}
		},
	  error: function(error) {
		//alert("Error: " + error.code + " " + error.message);
		if (error.code = -1)
			alert("Error de conexi�n, verifica la conexion de internet");
	  }
	});	
}


//Funcion llamada para enviar a la pantalla de crearX.
function PageCreateArticle(type){ //type can be: 'noticia', 'evento' or 'proyecto'
	//alert ("Going to: create" + type + ".html");
	location.href="create" + type + ".html";
}

function editObject(type){
	var i = getUrlParameter('objectId');
	Parse.initialize(appId, parseKey);
	var Evento = Parse.Object.extend("Evento");		
	var query = new Parse.Query(Evento);
	query.equalTo("objectId", i);
	query.find({
		  success: function(results) {
			var object = results[0];
			$('#title').val(object.get('title'));
			$('#brief_description').val(object.get('brief_description'));
			$('#description').val(object.get('description'));
			$('#author').val(object.get('professor'));
			$('#phone').val(object.get('telephone'));
			$('#email').val(object.get('email'));
			$('#link').val(object.get('link'));
			if (type==2){ //En caso de que sea evento (FALTA LO DEL MAPA)				
				var date_str = object.get('date');
				var fromDate = new Date(date_str);
				var day = fromDate.getDate();
				if(day < 10)
					day = "0"+day;
				var month = fromDate.getMonth() + 1; //Months are zero based
				if(month < 10)
					month = "0"+month;
				var year = fromDate.getFullYear();
				$('#date').val(year+"-"+month+"-"+day);
			}
		},
	  error: function(error) {
		//alert("Error: " + error.code + " " + error.message);
		//if (error.code = -1)
			//alert("Error de conexi�n, verifica la conexion de internet");
	  }
	});	
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
			document.getElementById("password").value = "";	
		}
	});
	
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

function getType(i){
	if (i==1)
		return 'Noticia';
	if (i==2)
		return 'Evento';
	if (i==3)
		return 'Proyecto';
}

function getDate(){
	var date = moment.unix(moment().utc().valueOf()/1000).format("MM/DD/YYYY");
	console.log(date);
}


//reads data from the url
function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split('&'),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split('=');
		if (sParameterName[0] === sParam) 
		{
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
}

function createArticle(type){	
	Parse.initialize(appId, parseKey);
	var title = document.getElementById("title").value;
	var brief_description = document.getElementById("brief_description").value;
	var description = document.getElementById("description").value;
	var link = document.getElementById("link").value;
	
	var professor = document.getElementById("author").value;
	var email = document.getElementById("email").value;
	var telephone = document.getElementById("phone").value;
	
	var date_str;
	//FALTAN LOS DEL EVENTO (el mapa)
	if (type==2){
		date_str = document.getElementById("date").value;
	}
	
	//Check everything is filled
	if((title == "")||(brief_description == "")||(description == "")||(professor == "")||(email == "")||(telephone == "")){
		alert("Ingrese todos los datos");
	}
	else{
		var articuloParse = Parse.Object.extend("Evento");
		var articulo = new articuloParse();
		 
		articulo.set("Type",type); 
		articulo.set("title",title);
		articulo.set("brief_description",brief_description)
		articulo.set("description",description);
		articulo.set("professor",professor);
		articulo.set("telephone",telephone);
		articulo.set("email",email);
		articulo.set("link",link);
		articulo.set("priority",false);
		articulo.set("visits",0);
		if (type==2){ //En caso de que sea evento (FALTA LO DEL MAPA)
			var date = new Date(date_str);
			articulo.set("date",date);
		}
		
		var confirmation = confirm("Seguro que desea agregar?"); //popup con dos opciones
			if (confirmation){ //si se le da que si, entra a ejecutar el eliminar
				  //Guardamos el objeto en la nube 
				articulo.save(null, {
				success: function(articulo) {
				// Execute any logic that should take place after the object is saved.
				alert('Agregado con Exito');
				location.href='admin_index.html';
				},
				error: function(articulo, error) {
				// Execute any logic that should take place if the save fails.
				// error is a Parse.Error with an error code and message.
				alert('Error al Agregar' + error.message);
				}
				});
			}
			else{
				//Do Nothing
			}
	}
}

function updateArticle(type){
	var i = getUrlParameter('objectId');
	Parse.initialize(appId, parseKey);
	var title = document.getElementById("title").value;
	var brief_description = document.getElementById("brief_description").value;
	var description = document.getElementById("description").value;
	var link = document.getElementById("link").value;
	
	var professor = document.getElementById("author").value;
	var email = document.getElementById("email").value;
	var telephone = document.getElementById("phone").value;
	
	//Check everything is filled
	if((title == "")||(brief_description == "")||(description == "")||(professor == "")||(email == "")||(telephone == "")){
		alert("Ingrese todos los datos");
	}
	else{
		var Evento = Parse.Object.extend("Evento");
		var query = new Parse.Query(Evento);		
		
		var confirmation = confirm("Seguro que desea guardar los cambios?"); //popup con dos opciones
			if (confirmation){ //si se le da que si, entra a ejecutar el eliminar
				  //Guardamos el objeto en la nube 
				query.equalTo("objectId", i);
				query.first({
				  success: function(Evento) {
					
					if (type==2){ //En caso de que sea evento (FALTA LO DEL MAPA)
						var date_str = object.get('date');
						var fromDate = new Date(date_str);
						Evento.set("date",fromDate);
					}
					  
					Evento.set("title", title);
					Evento.set("brief_description", brief_description);
					Evento.set("description", description);
					Evento.set("professor", professor);
					Evento.set("email", email);
					Evento.set("telephone", telephone);
					Evento.save();
					
					alert('Actualizado con Exito ' + title);
					location.href='admin_index.html';
				  },
				  error: function(error) {
					alert('Error al Actualizar' + error.message);
				  }
				});
			}
			else{
				//Do Nothing
			}
	}
}

function geoFindMe() {
        //Iteracion 2
		console.log(navigator.geolocation.getCurrentPosition());
		alert(navigator.geolocation.getCurrentPosition());
}