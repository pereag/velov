class Maps {
  constructor(id, x, y, zoomMap, stationName, stationAddress, stationStatus, velovNumber){
      this.id = id
      this.location = {lat: x, lng: y }
      this.map = false
      this.zoomMap = zoomMap
      this.marker = []
      this.response = false
      this.stationName = stationName
      this.stationAddress = stationAddress
      this.stationStatus = stationStatus
      this.velovNumber = velovNumber
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

// Appel les fonctions pour l'initialisation des marqueurs et de la map
  play(){
      this.initMap()
      this.getMarker()
  }

// Initialise la Map
  initMap(){
      this.map = new google.maps.Map(
          this.id, {zoom: this.zoomMap, center: this.location, styles: this.mapStyle, mapTypeControl: false, fullscreenControl: false, streetViewControl: false }
      )
  }

//Crée les marqueurs de la map 
  getMarker(){
    var self = this
  // requête ajax pour afficher les informations sur les stations Velo'V de Lyon
    let request = new XMLHttpRequest()
    request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        self.response =  JSON.parse(this.responseText)
      //On crée une boucle pour crée les objets marqueurs
        for (var i = 0; i < self.response.length; i++) {
          self.marker[i] = new google.maps.Marker({position: self.response[i].position, map: self.map, icon:{url:"images/station.png"}, name: self.response[i].name, address: self.response[i].address, status: self.response[i].status, velov: self.response[i].available_bikes})
        //On crée un écouteur d'évenement qui une fois activé retourne les informations de la station selectionné
          self.marker[i].addListener('click', function() {
            self.stationName.innerHTML = this.name.toLowerCase()
            self.stationAddress.innerHTML = this.address.charAt(0).toUpperCase() + this.address.substring(1).toLowerCase()
            if (this.status == "OPEN"){
              self.stationStatus.innerHTML = "Ouverte"
            }
            else if(this.status == "CLOSED"){
              self.stationStatus.innerHTML = "Fermée"
            }
            else{
              self.stationStatus.innerHTML = this.status
            }
            self.velovNumber.innerHTML = this.velov
          })
        }
      }
    }
    request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=43f89aec196d8dc961aef4bfbde0b6a681dff5df")
    request.send()
  }
}