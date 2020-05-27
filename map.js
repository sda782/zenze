var map = L.map('map', { zoomControl: false }).fitWorld();
var currentlocation = {
    "lat": 0,
    "long": 0
};
var selectedlocation = {
    "lat": 0,
    "long": 0
};

//  Creates icons
var UI_currentlocation = L.icon({
    iconUrl: 'UI/currentlocation.png',
    iconSize: [16, 16], // size of the icon
    iconAnchor: [8, 8], // point of the icon which will correspond to marker's location
});

var UI_locationmarker = L.icon({
    iconUrl: 'UI/locationmarker.png',
    iconSize: [48, 48], // size of the icon
    iconAnchor: [24, 24], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -24] // point from which the popup should open relative to the iconAnchor
});


// When ready...
window.addEventListener("load", function () {
    // Set a timeout...
    setTimeout(function () {
        // Hide the address bar!
        window.scrollTo(0, 1);
    }, 0);
});

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWV2dW0iLCJhIjoiY2thanI0c2FlMDkxaDJ0bHM4Z2pwNGllcyJ9.Od2H02EIte0aVMCRR5IuvQ'
}).addTo(map);

$('.leaflet-control-attribution').toggle();

map.locate({ setView: true, maxZoom: 18 });

$.getJSON('https://raw.githubusercontent.com/sda782/zenze/master/imageindex.json', (Iindex) => {
    Object.keys(Iindex).forEach(function (k) {
        var item = Iindex[k];
        var marker = L.marker([item.coord.latitude, item.coord.longitude], { icon: UI_locationmarker }).addTo(map);
        var photoImg = '<img src="' + item.images[0] + '" height="150px" width="150px"/>';
        marker.bindPopup(photoImg+"<br><h3>" + item.title + "</h3><p>" + item.description + "</p>").on('click', () => {
            map.setView([item.coord.latitude, item.coord.longitude], 16);
        });
    });
});


//finds you
function onLocationFound(e) {
    L.marker(e.latlng, { icon: UI_currentlocation }).addTo(map);
    currentlocation.lat = e.latlng.lat;
    currentlocation.long = e.latlng.lng;
    console.log(currentlocation);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);

function curpos(){
    map.setView([currentlocation.lat, currentlocation.long], 16);
}