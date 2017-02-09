var app = {

	inicio: function(){
		
		DIAMETRO_BOLA = 50;

		dificultad = 0;
		velocidadX = 0;
		velocidadY = 0;
		puntuacion = 0;

		alto = document.documentElement.clientHeight;
		ancho = document.documentElement.clientWidth;

		app.vigilanciaSensores();
		app.iniciaJuego();

	},

	iniciaJuego: function(){

		function preload(){
			game.physics.startSystem(Phaser.Physics.ARCADE);

			game.stage.backgroundColor = '#f27d0c';
			game.load.image('bola', 'assets/bola.png');
			game.load.image('bola', 'assets/objetivo.png');
		}

		function create(){
			scoreText = game.add.text(10, 10, puntuacion, { fontSize: '100px', fill: '#757676' });

			objetivo = game.add.sprite(app.inicioX(), app.inicioY(), 'objetivo');
			bola = game.add.sprite(app.inicioX(), app.inicioY(), 'bola');

			game.physics.arcade.enable(bola);
			game.physics.arcade.enable(objetivo);

			bola.body.collideWorldBounds = true;
			bola.body.onWorldBounds = new Phaser.Signal();
			bola.body.onWorldBounds.add(app.decrementaPuntuacion, this);
		}

		function update(){
			var factorDificultad = (300 +(dificultad*100));
			bola.body.velocity.y = (velociaddY*factorDificultad);
			bola.body.velocity.x = (velocidadX*(-1*factorDificultad));

			game.physics.arcade.overlap(bola, objetivo, app.incrementaPuntuacion, null, this);
		}

		var estados = { preload: preload, create: create, update: update};
		var game =  new Phaser.Game(ancho, alto, Phaser.CANVAS, 'phaser', estados);
	},

	incrementaPuntuacion: function(){
		puntuacion =  puntuacion + 1;
		scoreText.text = puntuacion;

		objetivo.body.x = app.inicioX();
		objetivo.body.y = app.inicioY();

		if(puntuacion>0){
			dificultad = dificultad+1;
		}
	},

	decrementaPuntuacion: function(){
		puntuacion =  puntuacion - 1;
		scoreText.text = puntuacion;
	},

	inicioX: function(){
		return app.numeroAleatorioHasta(ancho - DIAMETRO_BOLA);
	},

	inicioY: function(){
		return app.numeroAleatorioHasta(alto - DIAMETRO_BOLA);
	},

	numeroAleatorioHasta: function(limite){
		return Math.floor(Math.random() * limite);
	},

	vigilanciaSensores: function(){

		function onError(){
			console.log('onError');
		}

		function onSuccess(datosAceleracion){
			app.detectarAgitacion(datosAceleracion);
			app.registrarDireccion(datosAceleracion);
		}

		navigator.accelerometer.watchAcceleration(onSuccess, onError, {frequency: 10 });
	},

	detectarAgitacion: function(datosAceleracion){
		var agitacionX = datosAceleracion.x > 10;
		var agitacionY = datosAceleracion.y > 10;

		if(agitacionX || agitacionY){
			setTimeout(app.recomienza, 1000);
		}
	},

	recomienza: function(){
		document.location.reload(true);
	},

	registrarDireccion: function(datosAceleracion){
		velocidadX = datosAceleracion.x;
		velociaddY = datosAceleracion.y;
	}
	
};


if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false);

}	