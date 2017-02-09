var app = {

	model: {
		"notas" : [{'titulo': 'Comprar pan', 'comentario': 'Oferta en la panaderia de la esquina'}]
	},

	config: {
	    apiKey: "AIzaSyCRte9_1k9gUjwZ3rHrFuj1WMLN1NmxhX4",
	    authDomain: "notas-fa306.firebaseapp.com",
	    databaseURL: "https://notas-fa306.firebaseio.com",
	    storageBucket: "notas-fa306.appspot.com",
	    messagingSenderId: "645892038110"
	},

	inicio: function(){
		this.iniciarFastClick();
		this.iniciarFirebase();
		this.iniciarBotones();
		this.refrescarLista();
	},

	iniciarFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciarFirebase: function(){

		firebase.initializeApp(app.config);
	},

	iniciarBotones: function(){
		var salvar =  document.querySelector('#salvar');
		var anadir = document.querySelector('#anadir');

		anadir.addEventListener('click', this.mostrarEditor, false);
		salvar.addEventListener('click', this.salvarNota, false);

	},
	mostrarEditor: function(){
		document.getElementById('titulo').value= "";
		document.getElementById('comentario').value = "";
		document.getElementById('note-editor').style.display = "block";
		document.getElementById('titulo').focus();

	},

	salvarNota: function(){
		app.construirNota();
		app.ocultarEditor();
		app.refrescarLista();
		app.grabarDatos();
	},

	construirNota: function(){
		var notas = app.model.notas;
		notas.push({'titulo':app.extraerTitulo(), 'comentario': app.extraerComentario()});
	},

	anadirNota: function(id, titulo){
		return "<div class='note-item' id='notas["+id+"]'>"+titulo+"</div>";
	},

	extraerTitulo: function(){
		return document.getElementById('titulo').value;
	},

	extraerComentario: function(){
		return document.getElementById('comentario').value;
	},

	ocultarEditor: function(){
		document.getElementById('note-editor').style.display = "none";
	},

	refrescarLista:function(){
		var div = document.getElementById("notes-list");
		div.innerHTML = this.anadirNotasLista();
	},

	anadirNotasLista:function(){
		var notas = this.model.notas;
		var notasDiv = '';

		for(var i in notas){
			var titulo = notas[i].titulo;
			notasDiv = notasDiv + this.anadirNota(i, titulo);
		}

		return notasDiv;
	},

	grabarDatos: function(){
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.gotFS, this.fail);
	},

	gotFS: function(fileSystem){
		fileSystem.getFile("files/"+"model.json", {create: true, exclusive: false}, app.gotFileEntry, app.fail);
	},

	gotFileEntry: function(fileEntry){
		fileEntry.createWriter(app.gotFileWriter, app.fail);
	},

	gotFileWriter: function(writer){
		writer.onwriteend = function(evt){
			console.log("Datos guardados en externalApplicationStorageDirectory");
			if(app.hayWifi()){
				
				app.salvarFirebase();
			}
		};

		writer.write(JSON.stringify(app.model));
	},

	salvarFirebase: function(){
		var ref = firebase.storage().ref('model.json');
		ref.putString(JSON.stringify(app.model));	
			//document.querySelector(".footer").innerHTML= "dsaafsdfds";

	},

	leerDatos: function(){
		window.resolveLocalFileSystemURL(cordova.file.externalApplicationStorageDirectory, this.obtenerFS, this.fail);
	},

	hayWifi: function(){
		return navigator.connection.type ==='wifi';
	},

	obtenerFS: function(fileSystem){

		fileSystem.getFile("files/"+"model.json", {create: true, exclusive: false}, app.obtenerFileEntry, app.fail);
	},

	obtenerFileEntry: function(fileEntry){
		//document.querySelector('.footer').innerHTML="hola";
		fileEntry.file(app.leerFile, app.fail);
	},

	leerFile: function(file){
		var reader = new FileReader();

		reader.onloadend = function(evt){
			var data = evt.target.result;	
			if(data!=""){		
				app.model = JSON.parse(data);
			}
			app.inicio();
		};
		reader.readAsText(file);
	},

	fail: function(error){
		console.log(error.code);
	},
}

if('addEventListener' in document){
	document.addEventListener('deviceready', function(){
		app.leerDatos();
	}, false)
}