var map;
var lat;
var lng;
getUserLocation()

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { 
      lat: lat, 
      lng: lng 
    },
    zoom: 15,
    types: 'bakery'
  });
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  var request = {
    location: { 
      lat: lat, 
      lng: lng 
    },
    radius: '500',
    type: ['bakery']
  };
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      var place = results[i];
      createMarker(results[i]);
    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function getUserLocation () {
  if (localStorage.getItem('lat')) {
    lat = parseFloat(localStorage.getItem('lat'));
    lng = parseFloat(localStorage.getItem('lng'));
  } else {
    lat = 37.719;
    lng = -122.479;
  }
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storePosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}
function storePosition(position) {
  localStorage.setItem('lat', position.coords.latitude);
  localStorage.setItem('lng', position.coords.longitude);
  console.log(position);
}

getLocation();
