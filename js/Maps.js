class Maps {
    constructor(id, x, y, zoomMap){
        this.id = id
        this.location = {lat: x, lng: y }
        this.map = false
        this.zoomMap = zoomMap
    }
    
    initMap(){
        this.map = new google.maps.Map(
            this.id, {zoom: this.zoomMap, center: this.location}
        )
    }
}