class map {
    constructor(id, x, y, zoomMap){
        this.id = id
        this.location = {lat: x, lng: y }
        this.map = false
        this.zoomMap = zoomMap
    }
    
    initMap(){
        this.map = new google.maps.map(
            this.id, {zoom: this.zoomMap, center: this.location}
        )
    }
}

map = new map(document.getElementById("map"), 45.75, 4.85, 13.5)
map.initMap()