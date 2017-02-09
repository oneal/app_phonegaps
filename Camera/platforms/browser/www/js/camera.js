var app = {
	inicio: function(){
		this.inicioFastClick();
		this.iniciarBoton();
	},

	inicioFastClick: function(){
		FastClick.attach(document.body);
	},

	iniciarBoton: function(){
		var buttonAction = document.querySelector('#button-action');
		var buttonBN = document.querySelector('.button-filter-bn');
		var buttonNeg = document.querySelector('.button-filter-neg');
		var buttonSep = document.querySelector('.button-filter-sep');
		buttonAction.addEventListener('click', this.tomarFoto);
		buttonBN.addEventListener('click', this.canvasBN);
		buttonNeg.addEventListener('click', this.canvasNeg);
		buttonSep.addEventListener('click', this.canvasSep);
	},

	tomarFoto: function(){
		var opciones ={
			quality:100,
			destinationType: Camera.DestinationType.FILEURI,
			targetWidth: 300,
			correctOrientation: true,
		}

		navigator.camera.getPicture(app.fotoTomada, app.errorAlTomarFoto, opciones);
	},

	fotoTomada: function(imageURI){
		var img = document.createElement('img');
		img.onload = function(){
			app.pintarFoto(img);
		};

		img.src = imageURI;
	},

	pintarFoto: function(img){
		var canvas =  document.querySelector('#foto');
		var context = canvas.getContext('2d');
		canvas.width = img.width;
		canvas.height = img.height;
		context.drawImage(img, 0, 0, img.width, img.height);
	},

	errorAlTomarFoto: function(message){
		console.log("Fallo al tomar la foto o toma cancelada: "+message);
	},

	canvasBN: function(){
		var canvas =  document.querySelector('#foto');
		canvas.className = "bn";
	}, 

	canvasNeg: function(){
		var canvas =  document.querySelector('#foto');
		canvas.className = "negative";
	},

	canvasSep: function(){
		var canvas =  document.querySelector('#foto');
		canvas.className = "sepia";
	}
};

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false)
}