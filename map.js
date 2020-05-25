var map = L.map('map').fitWorld();

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 16,
    id: 'mapbox/dark-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWV2dW0iLCJhIjoiY2thanI0c2FlMDkxaDJ0bHM4Z2pwNGllcyJ9.Od2H02EIte0aVMCRR5IuvQ'
}).addTo(map);

map.locate({ setView: true, maxZoom: 16 });

function onLocationFound(e) {
    L.marker(e.latlng).addTo(map)
        .bindPopup("You are within " + radius + " meters from this point").openPopup();
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);