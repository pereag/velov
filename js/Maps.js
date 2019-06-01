class Maps {
    constructor(id, x, y, zoomMap){
        this.id = id
        this.location = {lat: x, lng: y }
        this.map = false
        this.zoomMap = zoomMap
        this.marker = []
        this.response = false
        this.mapStyle = [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.country",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ff0000"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "landscape",
              "stylers": [
                {
                  "color": "#e9e9e9"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "stylers": [
                {
                  "color": "#f0f0f0"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "stylers": [
                {
                  "color": "#c2e9da"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#8db8c5"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
        ]        
    }
    play(){
        this.initMap()
        this.getMarker()
    }
    initMap(){
        this.map = new google.maps.Map(
            this.id, {zoom: this.zoomMap, center: this.location, styles: this.mapStyle, mapTypeControl: false, fullscreenControl: false, streetViewControl: false }
        )
    }

    getMarker(){
        self = this
        let request = new XMLHttpRequest()
        request.onreadystatechange = function() {
            if(this.readyState == XMLHttpRequest.DONE && this.status == 200){
                self.response =  JSON.parse(this.responseText)
                for(var i = 0; i < self.response.length; i++){
                    self.marker[i] = new google.maps.Marker({position: self.response[i].position, map: self.map, Title: "STATION : " + self.response[i].name, icon:{url:"images/station.png"}})
                }
            }
        }
        request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=43f89aec196d8dc961aef4bfbde0b6a681dff5df")
        request.send()
    }
}