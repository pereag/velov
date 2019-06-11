class Reservation {
    constructor(reservationButton, stationNameId, stationAddressId, stationStatusId, velovNumberId, infoStationId, errorInfoStationId, reservationId, deleteId, sendId, reservationFirstNameId, reservationNameId, errorReservationId, signatureId, reservationFormId, confirmationMessageId){
        this.reservationButton = reservationButton
        this.stationNameId = stationNameId
        this.stationAddressId = stationAddressId
        this.stationStatusId = stationStatusId
        this.velovNumberId = velovNumberId
        this.infoStationId = infoStationId
        this.errorInfoStationId = errorInfoStationId
        this.reservationId = reservationId
        this.deleteId = deleteId
        this.sendId = sendId
        this.reservationFirstNameId = reservationFirstNameId
        this.reservationNameId = reservationNameId
        this.errorReservationId = errorReservationId
        this.signatureId = signatureId
        this.reservationFormId = reservationFormId
        this.confirmationMessageId = confirmationMessageId
        this.clientSignature = false
    }

    //Afficher le formulaire
    play() {
        this.reservationButton.addEventListener("click", () => {
            if (this.stationNameId.textContent == "" && this.stationAddressId.textContent == "" && this.stationStatusId.textContent == "" && this.velovNumberId.textContent == "") {
                this.errorInfoStationId.innerHTML = "Aucune station sélectionné."
            }
            else if(this.velovNumberId.textContent == "0" || this.stationStatusId.textContent !== "Ouverte") {
                this.errorInfoStationId.innerHTML = "Aucun Vélo'V disponnible, veuillez sélectionné une autre station."
            }
            else {
                if(this.errorInfoStationId.innerHTML !== "" ){
                    this.errorInfoStationId.innerHTML = ""
                }
                signature = new Signature(this.signatureId)
                signature.play()
                this.displayDivReservationForm()
            }
        })
        this.signatureId.addEventListener("click", () => {
            this.clientSignature = true
        })
        this.deleteId.addEventListener("click", () => {
            signature.clearCanvas()
            this.clientSignature = false
        })
        this.sendId.addEventListener("click", () => {
            if(this.reservationFirstNameId.value !== "" && this.reservationNameId.value !== "" ){
                if (this.clientSignature == true) {
                    this.saveReservation()
                this.reservationFormId.style.display = "none"
                this.confirmationMessageId.innerHTML = "Votre réservation à bien était prise en compte."
                }
                else {
                    this.errorReservationId.innerHTML = "Signature invalide."
                }
            }
            else {
                this.errorReservationId.innerHTML = "Nom ou prénom invalide."
            }
        })
    }

// Affiche les informations de la station et cache le formulaire de la reservation
    displayDivStationInfos(){
        this.reservationId.style.display = "none"
        this.infoStationId.style.display = "block"
    }

// Affiche le formulaire de réservation et cache les informations de la station
    displayDivReservationForm(){
        this.infoStationId.style.display = "none"
        this.reservationId.style.display = "block"
    }

// Sauvegarde les données de la réservation sur le sessionStorage
    saveReservation(){
        let reservation = {
            name : this.reservationNameId.value.charAt(0).toUpperCase() + this.reservationNameId.value.substring(1).toLowerCase(),
            firstName: this.reservationFirstNameId.value.charAt(0).toUpperCase() + this.reservationFirstNameId.value.substring(1).toLowerCase(),
            stationName: this.stationNameId.textContent,
            stationAdress: this.stationAddressId.textContent,
            signature: signature.saveSignature()
        }

        let reservation_json = JSON.stringify(reservation)
        sessionStorage.setItem("reservation", reservation_json)
    }
}