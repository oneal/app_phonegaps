var app = {
	inicio: function(){
		this.iniciarMapa();
	},

	iniciarMapa: function(){
		navigator.geolocation.getCurrentPosition(app.onSuccess, app.onError);
	},

	onSuccess: function(position){
		console.log(position.coords.latitude);
		var mapDiv = document.getElementById("map_canvas");
		const GOOGLE = new plugin.google.maps.LatLng(position.coords.latitude ,position.coords.longitude);
		var map = plugin.google.maps.Map.getMap(mapDiv, {
		    'camera': {
		      'latLng': GOOGLE,
		      'zoom': 17
		    }
		});
		map.addEventListener(plugin.google.maps.event.MAP_READY, function() {

		    map.addMarker({
		      'position': GOOGLE,
		      'title': "Hello GoogleMap for Cordova!"
		    }, function(marker) {

		      marker.showInfoWindow();

		    });

		});

	},

	onError:function(error){
		alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
	}
}



if('addEventListener' in document){
	document.addEventListener('DOMContentLoaded', function(){
		app.inicio();
	}, false)
}
