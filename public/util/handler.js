/**
 * Display Google Maps
 */
function googleMaps(lat, lng) {
    let mapOptions = {
        center: new google.maps.LatLng(lat, lng),
        zoom: 10,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);

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