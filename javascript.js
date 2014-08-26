var map;
var service;
var infowindow;

// Random icons for our pins.  
var pin_1 = 'pins/pin1.png';
var pin_2 = 'pins/pin2.png';
var display_main_icon = true;  // Helper flag so we can display the State and Chestnut location.

function initialize() {

  var pin_radius = new google.maps.LatLng(41.898288, -87.628546);

  map = new google.maps.Map(document.getElementById('map-canvas'), {
    center: pin_radius,
    zoom: 16
  });


var request = {
    location: pin_radius,
    radius: 1000,
    keyword: 'restaurants'
  };
var request2 = {
    location: pin_radius,
    radius: 1000,
    keyword: 'stores'
  };
  
var request3 = {
    location: pin_radius,
    radius: 1000,
    keyword: 'nightclub'
  };

  
  infowindow = new google.maps.InfoWindow();
  var service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
    
  var service2 = new google.maps.places.PlacesService(map);
  service2.nearbySearch(request2, callback);

  
  var service3 = new google.maps.places.PlacesService(map);
  service3.nearbySearch(request2, callback);
  
 
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      createMarker(results[i]);
    }
  }
}


// Here we create markers that will land on the map. 
// We get a "place" parameter that has all the information about 
// the location.
function createMarker(place) {
  var placeLoc = place.geometry.location;
  
  
  
  // This 'if' statement will get the type of each place
  // and assign appropriate market.
  if(place.types["0"] == "restaurant"){
  
    	//------------------------------------------------------------
  		// SAMPLE PIN FOR ALL RESTAURANTS
  		
	   var marker = new google.maps.Marker({
		   map: map,
		   icon: pin_2, // Change this to whatever the icon should be.
		   animation: google.maps.Animation.DROP, // Animate the placement of the pin.
		   position: place.geometry.location
		}); 
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});

		
	  
  }else if(place.types["0"] == "store"){
  
  		//------------------------------------------------------------
  		// SAMPLE PIN FOR ALL STORES
  
  		var marker = new google.maps.Marker({
    		map: map,
			icon: icon_2,
			animation: google.maps.Animation.DROP,
			position: place.geometry.location
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});

		
  }else if(place.types["0"] == "bar"){
  	
  		//------------------------------------------------------------
  		// SAMPLE PIN FOR ALL BARS
  		
  		var marker = new google.maps.Marker({
    		map: map,
			animation: google.maps.Animation.DROP,
			position: place.geometry.location
		});
		
		google.maps.event.addListener(marker, 'click', function() {
			infowindow.setContent(place.name);
			infowindow.open(map, this);
		});

		
  }else{
  		
  		// We will replace on of the less important icons 
  		// with the state and chestnut location.
  		// Once this 'if' statemene is executed, 'display_main_icon' will be 'false'
  		// The position is hardcoded, but we can pass a var instead. 
  		if(display_main_icon == true){
  		
  		
  			//------------------------------------------------------------
  			// HERE IS THE STATE AND CHESTNUT PIN
  			// - Displayed once 
  			// - Hardcoded location.
  			// - Hardcoded info window message.
  			
  			var marker = new google.maps.Marker({
    			map: map,
				icon: pin_1,
				animation: google.maps.Animation.DROP,
				position: new google.maps.LatLng(41.898288, -87.628546)
			});
		
			display_main_icon = false;
			
			 google.maps.event.addListener(marker, 'click', function() {
				 infowindow.setContent("State and Chestnut");
				 infowindow.open(map, this);
			});
			
			// -----------------------------------------------------------
			
			
				
		}else{
			
			//------------------------------------------------------------
			// DEFAULT PIN IF IT DOESNT MATCH ANY CRITERIA
			var marker = new google.maps.Marker({
    			map: map,
				animation: google.maps.Animation.DROP,
				position: place.geometry.location
			});
			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});

		}
	}
}


// Here we have two different pins we can chose from.
var icon_1 = {
     path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
     fillColor:"red",
     scale: 3
  };

var icon_2 = {
     path: google.maps.SymbolPath.CIRCLE,
     fillColor:"blue",
     scale: 3
  };  




google.maps.event.addDomListener(window, 'load', initialize);
