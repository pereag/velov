class Reservation {
    constructor(reservationButton, stationName, stationAddress, stationStatus, velovNumber ){
        this.reservationButton = reservationButton
        this.stationName = stationName
        this.stationAddress = stationAddress
        this.stationStatus = stationStatus
        this.velovNumber = velovNumber

    }
//Afficher le formulaire
    displayForm() {
        this.reservationButton.addEventListener("click", () => {

            if ( this.stationName.textContent == "" && this.stationAddress.textContent == "" && this.stationStatus.textContent == "" && this.velovNumber.textContent == "") {
                console.log("Pas de donnée pour le moment")
            }
            else if(this.velovNumber.textContent == "0" || this.stationStatus.textContent !== "Ouverte" ) {
                console.log("Pas de veloV disponible à la réservation.")
            }
            else {
                console.log("C'est cool")
            }
        })
    }
}