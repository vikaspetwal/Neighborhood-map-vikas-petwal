var map;

//Details of Locations
var markers = [
    {
        id: "loc1",
        name: "Indian Military Academy South Campus",
        lat: 30.324730,
        lng: 77.976665,
        visible: ko.observable(true),
        test: true
    },
    {
        id: "loc2",
        name: "Robber's Cave",
        lat: 30.376133,
        lng: 78.060265,
        visible: ko.observable(true),
        test: true
    },
    {
        id: "loc3",
        name: "Malsi Deer Park",
        lat: 30.389665,
        lng: 78.074641,
        visible: ko.observable(true),
        test: true
    },
    {
        id: "loc4",
        name: "Shikhar Falls",
        lat: 30.413002,
        lng: 78.098717,
        visible: ko.observable(true),
        test: true
    },
    {
        id: "loc5",
        name: "Forest Research Institute",
        lat: 30.344436,
        lng: 77.998295,
        visible: ko.observable(true),
        test: true
    },
];


//Initializing the map
function initialize() {

    var mapInitialize = {
        center: new google.maps.LatLng(30.3165, 78.0322),
        zoom: 11,
    };
    map = new google.maps.Map(document.getElementById("map-main"), mapInitialize);
    var infowindow = new google.maps.InfoWindow;

    intializeMarkers();

    markerClick();

    placeMarkers();

    navSearch()

}

//Function runs when map fails to load
function mapFail() {
    alert("Google Maps has failed to load. Please check your internet connection and try again.");
}



//function to initialize markers for the given locations
function intializeMarkers() {
    for (i = 0; i < markers.length; i++) {
        markers[i].marker = new google.maps.Marker({
            position: new google.maps.LatLng(markers[i].lat, markers[i].lng),
            map: map,
            title: markers[i].name
        });
    }
}


//function to check which markers to place
function placeMarkers() {
    for (var i = 0; i < markers.length; i++) {

        if (markers[i].test === true) {
            markers[i].marker.setMap(map);
        } else {
            markers[i].marker.setMap(null);
        }
    }
}


//function to open infowindow and change marker color on marker click
function markerClick() {
    for (var i = 0; i < markers.length; i++) {
        var infowindow = new google.maps.InfoWindow({
            content: markers[i].name
        });
        new google.maps.event.addListener(markers[i].marker, 'click', (function (marker, i) {
            return function () {
                markers[i].marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
                infowindow.setContent(markers[i].name);
                infowindow.open(map, this);
            };
        })(markers[i].marker, i));
    }
}

//Using knockout JS for searching and filtering markers
var searchModel = {
    searchItem: ko.observable(''),
};

searchModel.markers = ko.dependentObservable(function () {
    var self = this;
    var search = self.searchItem().toLowerCase();
    return ko.utils.arrayFilter(markers, function (marker) {
        if (marker.name.toLowerCase().indexOf(search) >= 0) {
            marker.test = true;
            return marker.visible(true);
        } else {
            marker.test = false;
            placeMarkers();
            return marker.visible(false);
        }
    });
}, searchModel);

ko.applyBindings(searchModel);

//function to search locations from side-nav
function navSearch() {
    for (var i = 0; i < markers.length; i++) {
        var infowindow = new google.maps.InfoWindow({
            content: markers[i].name
        });
        var j=i+1;
        var loc = $('#loc' + j);
        loc.click((function (marker, i) {
            return function () {
                markers[i].marker.setIcon('https://www.google.com/mapfiles/marker_green.png');
                infowindow.setContent(markers[i].name);
                infowindow.open(map, marker);

            };
        })(markers[i].marker, i));
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "26%";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}


//show markers according to search
$("#search").keyup(function () {
    placeMarkers();
});

//event handler for Reloading map on click   
$("#reloadM").click(function () {
    initialize();
});

