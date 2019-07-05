import Reservation from "./Reservation"
import Station from "./Station"
class Maps {
  constructor(id, x, y, zoomMap){
      this.id = id
      this.location = {lat: x, lng: y }
      this.map = false
      this.zoomMap = zoomMap
      this.marker = []
      this.response = false
      this.reservation = new Reservation(document.getElementById("reservation-button"), document.getElementById("station-name"), document.getElementById("station-address"), document.getElementById("station-status"), document.getElementById("velov-number"), document.getElementById("map-info-station"), document.getElementById("error-info-station"), document.getElementById("map-reservation"), document.getElementById("delete"), document.getElementById("send"), document.getElementById("reservation-firstName"), document.getElementById("reservation-name"), document.getElementById("error-reservation"), document.getElementById("signature"), document.getElementById("form-reservation"), document.getElementById("confirmation-message"), document.getElementById("reservation-box-text"), document.getElementById("reservation-box-timer"), document.getElementById("reservation-box"), 1200000)
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
      this.reservation.displayCurrentReservation()      
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

// Crée les marqueurs de la map 
  getMarker(){
    let self = this

  // Requête ajax pour afficher les informations sur les stations Velo'V de Lyon
    let request = new XMLHttpRequest()
    request.onreadystatechange = function() {
      if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
        self.response =  JSON.parse(this.responseText)
      // On initialise l'objet Reservation avant la boucle 
        self.reservation.play()
      // On crée une boucle pour crée les objets Marqueurs et Stations
        for (let i = 0; i < self.response.length; i++) {
          let station = new Station(self.response[i], document.getElementById("station-name"), document.getElementById("station-address"), document.getElementById("station-status"), document.getElementById("velov-number"))
          self.marker[i] = new google.maps.Marker({position: station.position, map: self.map, icon:{url:"images/station.png"}})
        // On crée un écouteur d'évenement qui une fois activé retourne les informations de la station selectionné
          self.marker[i].addListener('click', function() {
            if(self.reservation.errorReservationId.innerHTML !== "" ){
              self.reservation.errorReservationId.innerHTML = ""
          }
            self.reservation.displayDivStationInfos()
            self.displayInfoStation(station)
          })
        }
      }
    }
    request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=43f89aec196d8dc961aef4bfbde0b6a681dff5df")
    request.send()
  }

// Affiche les information de la station
  displayInfoStation(station){
    station.nameId.innerHTML = station.name.toLowerCase()
    station.addressId.innerHTML = station.address.charAt(0).toUpperCase() + station.address.substring(1).toLowerCase()
    if (station.status == "OPEN"){
      station.statusId.innerHTML = "Ouverte"
    }
    else if(station.status == "CLOSED"){
      station.statusId.innerHTML = "Fermée"
    }
    else{
      station.statusId.innerHTML = station.status
    }
    station.velovNumberId.innerHTML = station.velovNumber
  }
}

export default Maps