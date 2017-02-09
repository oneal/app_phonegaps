var app = {
	inicio: function(){
		this.inicioBotones();
		this.inicioFastClick();
		this.iniciaHammer();
	},

	inicioFastClick: function(){
		FastClick.attach(document.body);

	},

	inicioBotones: function () {
		var botonClaro = document.querySelector('#claro');
		var botonOscuro = document.querySelector('#oscuro');

		botonOscuro.addEventListener('click', this.ponloOscuro, false);
		botonClaro.addEventListener('click', this.ponloClaro, false);

	},

	iniciaHammer: function(){
		var zona = document.getElementById('zona-gestos');
		var hammerTime = new Hammer(zona);

		hammerTime.get('pinch').set({enable: true});
		hammerTime.get('rotate').set({enable: true});

		zona.addEventListener('webkitAnimationEnd', function(e){
			zona.className = "";
		});

		hammerTime.on('tap', function(ev){
			zona.className = 'tap';
		});

		hammerTime.on('doubletap', function(ev){
			zona.className = 'doubletap';
		});

		hammerTime.on('press', function(ev){
			zona.className = 'press';
		});

		hammerTime.on('swipe', function(ev){
			var clase = undefined;

			direccion = ev.direction;

			if(direccion == 4) clase = 'swipe-derecha';
			if(direccion == 2) clase = 'swipe-izquierda';

			zona.className = clase;
		});

		hammerTime.on('rotate', function(ev){
			var umbral = 25;

			if(ev.distance > umbral) zona.className = 'rotate';
		});
	},


	ponloOscuro: function(){
		document.body.className = "oscuro";
	},

	ponloClaro: function(){
		document.body.className = "claro";
	},
}

if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false)
}