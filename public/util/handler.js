/**
 * Display Google Maps
 */
function googleMaps(lati, lngi) {
    /*let mapOptions = {
    
    	center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };*/
    var uluru = {lat:lati,lng:lngi};
    map = new google.maps.Map(document.getElementById("#map"), {
      zoom: 20,
      center: uluru,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    marker = new google.maps.Marker({
      position: uluru,
      animation: google.maps.Animation.DROP
    });
    marker.setMap(map);
    map.setCenter(marker.getPosition());
}
/**
 * Displays the location
 * All must be strings
 */
function displayLocation(addressJSON) {
     onLatitudeLongitude(googleMaps, addressJSON);
}

/**
 * Converts address to lat long for Google Maps
 * Address is a JSON
 * Example: { "street": "1 Washingon Sq", "city": "San Jose", "state": "CA", "zipcode":"95192"}
 */
function onLatitudeLongitude(callback, addressJSON) {
    let address = addressJSON.street + "," + "," + addressJSON.city + "," + addressJSON.state + "," + addressJSON.zipcode;

    let geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let result = results[0];
                let lat = result.geometry.location.lat();
                let lng = result.geometry.location.lng();

                callback(lat, lng);
            }
        });
    }
}
/**
 * Finds coordinates and 
 * sets the href for given location id of the product.
 */
function getLatitudeLongitude(addressJSON, id) {
    let address = addressJSON.street + "," + "," + addressJSON.city + "," + addressJSON.state + "," + addressJSON.zipcode;
    let geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                let result = results[0];
                let lat = result.geometry.location.lat();
                let lng = result.geometry.location.lng();
                var href= "https://www.google.com/maps/search/?api=1&query="+lat+","+lng;
                document.getElementById(id).href=href;
            }
        });
    }
}


function getLocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onPosition);
    }

    return null;
}

function onPosition(position){
    var x = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
    alert(x);
}

