class Timer {

    constructor(endDate){
        this.endDate = endDate
    }
    secondeConverter() {
        window.setInterval(() => {
            this.endTime = this.endDate - Date.now()
            this.endTimeSeconde = this.endTime / 1000
        }, 1000);
    }
// Lance le décompte du minuteur
    startTimer(messageReservationTimer){
        this.secondeConverter()
        let timerGo = setInterval(()=>{
            this.hours   = Math.floor(Math.floor(this.endTimeSeconde) / 3600);
            this.minutes = Math.floor((Math.floor(this.endTimeSeconde) - (this.hours * 3600)) / 60);
            this.seconds = Math.floor(this.endTimeSeconde) - (this.hours * 3600) - (this.minutes * 60);

            if(this.hours < 10) { this.hours = "0" + this.hours;}
            if (this.minutes < 10) {this.minutes = "0" + this.minutes;}
            if (this.seconds < 10) {this.seconds = "0" + this.seconds;}
            if(Date.now() >= this.endDate){
                window.clearInterval(timerGo)
                sessionStorage.clear()
                messageReservationTimer.innerHTML = "La réservation n'est plus disponnible."
            }
            else {
                messageReservationTimer.innerHTML = "La réservation expire dans " + this.hours + " heur(s), "  + this.minutes + " minute(s) et " + this.seconds + " seconde(s)."
            }
        }, 1000)
    }
}

export default Timer