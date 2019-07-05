import Signature from "./Signature"
import Timer from "./Timer"
import { get } from "https";
class Reservation {
    constructor(reservationButton, stationNameId, stationAddressId, stationStatusId, velovNumberId, infoStationId, errorInfoStationId, reservationId, deleteId, sendId, reservationFirstNameId, reservationNameId, errorReservationId, signatureId, reservationFormId, confirmationMessageId, messageReservationId, messageReservationTimerId, reservationBoxId, reservationTime){
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
        this.reservationBoxId = reservationBoxId
        this.timerStatus = null
        this.reservationTime = reservationTime
    }
//Afficher le formulaire
    play() {
        if(sessionStorage.reservation != null){
            this.displayInfoMessage()
        }
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
                else{
                    this.signatureObject = new Signature(this.signatureId)
                    this.signatureObject.play()
                    this.displayCurrentName()
                    this.displayDivReservationForm()
                }
            }
        })
    // Verification de la signature
        this.signatureId.addEventListener("mousedown", () => {
            this.clientSignature = true
        })
        this.signatureId.addEventListener("touchstart", () => {
            this.clientSignature = true
        })
    // Ecoute le boutton Effacer
        this.deleteId.addEventListener("click", () => {
            this.signatureObject.clearCanvas()
            this.clientSignature = false
        })
    //Ecoute le boutton Réserver
        this.sendId.addEventListener("click", () => {
            if(this.reservationFirstNameId.value !== "" && this.reservationNameId.value !== "" ){
                if (this.clientSignature == true) {
                    this.saveReservation()
                    this.saveName()
                    this.displayInfoMessage()
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
    displayInfoMessage() {
        this.reservationFormId.style.display = "none"
        this.confirmationMessageId.innerHTML = "Votre réservation à bien était prise en compte."
    }

// Sauvegarde les données de la réservation sur le sessionStorage
    saveReservation(){
        let reservation = {
            name : this.reservationNameId.value.charAt(0).toUpperCase() + this.reservationNameId.value.substring(1).toLowerCase(),
            firstName: this.reservationFirstNameId.value.charAt(0).toUpperCase() + this.reservationFirstNameId.value.substring(1).toLowerCase(),
            stationName: this.stationNameId.textContent,
            stationAdress: this.stationAddressId.textContent,
            signature: this.signatureObject.saveSignature(),
            endDate: Date.now() + this.reservationTime
        }
        let reservation_json = JSON.stringify(reservation)
        sessionStorage.setItem("reservation", reservation_json)
    }
// Sauvegarder les le nom et prénom dans le localStorage
    saveName(){
        let name = {
            name: this.reservationNameId.value.charAt(0).toUpperCase() + this.reservationNameId.value.substring(1).toLowerCase(),
            firstName: this.reservationFirstNameId.value.charAt(0).toUpperCase() + this.reservationFirstNameId.value.substring(1).toLowerCase()
        }
        let name_json = JSON.stringify(name)
        localStorage.setItem("name", name_json)
    }

//Recuperer les données dans le sessionStorage
    getReservation(){
        let sessionStorageReservation = sessionStorage.getItem("reservation")
        this.reservationObject = JSON.parse(sessionStorageReservation)
    }
// Recupérer les donnée dans le localStorage
    getName() {
        let localStorageName = localStorage.getItem("name")
        this.nameObject = JSON.parse(localStorageName)
    }
// Affiche la réservation si elle est disponible 
    displayCurrentReservation(){
        this.getReservation()
        if(this.reservationObject != null) {
            this.displayMessageReservation()
        }
    }
// affiche la nom et le prénom si ils sont disponible 
    displayCurrentName(){
        this.getName()
        if(this.nameObject != null) {
            this.displayNameInputValue()
        }
    }
// Affiche le message de reservation dans la partie "Detaille de votre réservation"
    displayMessageReservation(){
        this.messageReservationId.innerHTML = "Vous venez de passer une réservation au nom de " + this.reservationObject.name + " " + this.reservationObject.firstName + ", localisé à la station " + this.reservationObject.stationName + " prêt de " + this.reservationObject.stationAdress + "."
    // Crée un Element p pour le timer
        let newElementTimer = document.createElement("p")
            newElementTimer.id = "reservation-box-timer"
        this.reservationBoxId.appendChild(newElementTimer)
        let timer = new Timer(this.reservationObject.endDate)
        this.timerStatus = true
        timer.startTimer(newElementTimer)
    // Crée un élement imag pour la signature
        let newElementImg = document.createElement("img")
        newElementImg.id = "img-signature"
        newElementImg.alt = "Signature"
        newElementImg.src = this.reservationObject.signature
        this.reservationBoxId.appendChild(newElementImg)
    }
//affiche le nom est prénom dans les input correspondants du formulaire de Réservation
    displayNameInputValue(){
        this.reservationFirstNameId.value = this.nameObject.firstName
        this.reservationNameId.value = this.nameObject.name
    }
}

export default Reservation
