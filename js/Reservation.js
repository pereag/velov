class Reservation {
    constructor(reservationButton, stationNameId, stationAddressId, stationStatusId, velovNumberId, infoStationId, errorInfoStationId, reservationId, deleteId, sendId, reservationFirstNameId, reservationNameId, errorReservationId, signatureId, reservationFormId, confirmationMessageId, messageReservationId, messageReservationTimerId){
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
        this.messageReservationId = messageReservationId
        this.messageReservationTimerId = messageReservationTimerId
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
    // Verification de la signature
        this.signatureId.addEventListener("click", () => {
            this.clientSignature = true
        })
    // Ecoute le boutton Effacer
        this.deleteId.addEventListener("click", () => {
            signature.clearCanvas()
            this.clientSignature = false
        })
    //Ecoute le boutton Réserver
        this.sendId.addEventListener("click", () => {
            if(this.reservationFirstNameId.value !== "" && this.reservationNameId.value !== "" ){
                if (this.clientSignature == true) {
                    this.saveReservation()
                    this.reservationFormId.style.display = "none"
                    this.confirmationMessageId.innerHTML = "Votre réservation à bien était prise en compte."
                    this.getReservation()
                    this.displayMessageReservation()
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

//Recuperer les données dans le sessionStorage
    getReservation(){
        let sessionStorageReservation = sessionStorage.getItem("reservation")
        this.reservationObject = JSON.parse(sessionStorageReservation)
    }

// Affiche le message de reservation dans la partie "Detaille de votre réservation"
    displayMessageReservation(){
        let timer = new Timer(1, 0)
        console.log(this.reservationObject)
        this.messageReservationId.innerHTML = "Votre réservation au nom de " + this.reservationObject.name + " " + this.reservationObject.firstName + ", localisé à la station " + this.reservationObject.stationName + " pret de " + this.reservationObject.stationAdress + " est disponible."
    // Crée un Element p pour le timer et un élement Img pour l'image de la signature  
    }

// À la fin du timer on Efface le session storage et on informe l'expiration de la réservation 

}
