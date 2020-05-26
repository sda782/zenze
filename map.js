var map = L.map('map', { zoomControl: false }).fitWorld();
var imageindex;

// When ready...
window.addEventListener("load", function() {
    // Set a timeout...
    setTimeout(function() {
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
    Object.keys(Iindex).forEach(function(k) {
        var item = Iindex[k];
        var marker = L.marker([item.coord.latitude, item.coord.longitude]).addTo(map);
        var photoImg = '<img src="' + item.images[0] + '" height="150px" width="150px"/>';
        marker.bindPopup("<b>" + item.title + "</b><br><p>" + item.description + "</p>" + photoImg).on('click', () => { map.setView([item.coord.latitude, item.coord.longitude]) });
    });
});


//find you
function onLocationFound(e) {
    L.marker(e.latlng).addTo(map);
}

map.on('locationfound', onLocationFound);

function onLocationError(e) {
    alert(e.message);
}

map.on('locationerror', onLocationError);