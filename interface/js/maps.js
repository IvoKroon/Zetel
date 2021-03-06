let map;
let userMarker = {};
let iconBase = 'img/';
let icons = {
    user: {
        icon: iconBase + 'user.png'
    }
};

function initMap() {
    let myLatLng = {lat: 52.310480, lng: 4.760635};
    let mapStyle = 'mapStyle.json';
    let content = 'Je bent hier';

    map = new google.maps.Map(document.getElementById('googleMaps'), {
        zoom: 16,
        styles: mapStyle,
        center: myLatLng,
        zoomControl: false,
        streetViewControl: false,
        mapTypeControl: false,
        fullscreenControl: false,
        disableDefaultUI: true
    });

    var infowindow = new google.maps.InfoWindow({
        content: content
    });


    navigator.geolocation.getCurrentPosition(function (position) {
        let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };

        let center = {
            lat: position.coords.latitude - 0.001,
            lng: position.coords.longitude + 0.002
        };

        userMarker = new google.maps.Marker({
            position: pos,
            map: map,
            icon: icons['user'].icon,
            title: 'You',
            animation: google.maps.Animation.DROP
        });
        map.setCenter(pos);

        userMarker.addListener('click', function() {
            infowindow.open(map, userMarker);
        });
        infowindow.open(map, userMarker);
    })
}


google.maps.event.addDomListener(window, 'load', initMap);

