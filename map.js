var map = L.map('map', { zoomControl: false }).fitWorld();

var currentlocation = {
    "lat": 0,
    "long": 0
};
var selectedpos;
var cmd;

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '',
    maxZoom: 18,
    id: 'mapbox/light-v10',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYWV2dW0iLCJhIjoiY2thanI0c2FlMDkxaDJ0bHM4Z2pwNGllcyJ9.Od2H02EIte0aVMCRR5IuvQ'
}).addTo(map);

map.locate({ setView: true, maxZoom: 18 });
$('.leaflet-control-attribution').toggle();

//get marker location and images
$.getJSON('https://raw.githubusercontent.com/sda782/zenze/master/imageindex.json', (Iindex) => {
    Object.keys(Iindex).forEach(function(k) {
        var item = Iindex[k];
        var marker = L.marker([item.coord.latitude, item.coord.longitude], { icon: UI_locationmarker }).addTo(map);
        var photoImg = '<img src="' + item.images[0] + '" height="150px" width="150px"/>';
        marker.bindPopup(photoImg + "<br><h3>" + item.title + "</h3><p>" + item.author + "</p>").on('click', () => {
            map.setView([item.coord.latitude, item.coord.longitude], 16);
        });
    });
});

L.Control.geocoder().addTo(map);

//create marker at clicked location
map.on('click', selectpos);

//finds you
map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);



//functions
function onLocationFound(e) {
    L.marker(e.latlng, { icon: UI_currentlocation }).addTo(map);
    currentlocation.lat = e.latlng.lat;
    currentlocation.long = e.latlng.lng;
}

function onLocationError(e) {
    alert(e.message);
}

//Set view to selected marker
function curpos() {
    map.setView([currentlocation.lat, currentlocation.long], 16);
}

//create maker on click with location
function selectpos(e) {
    if (selectedpos != undefined) {
        map.removeLayer(selectedpos);
    };
    selectedpos = L.marker(e.latlng).addTo(map);
    cmd = '>zenze ' + e.latlng.lat + ' ' + e.latlng.lng + '[name] [title]';
    selectedpos.bindPopup('<p>Add your image using the discord command</p><button onclick="copytoclipboard()">copy command</button>').openPopup();

}

function copytoclipboard() {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = cmd;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
}