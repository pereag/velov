class Timer {

    constructor(minute, seconde){
        this.minute = minute
        this.seconde = seconde
    }
// Lance le décompte du minuteur
    startTimer(messageReservationTimer){
        let timerGo = setInterval(()=>{
            this.seconde = this.seconde - 1
            if(this.seconde == -1){
                this.seconde = 59
                this.minute = this.minute -1
            }
            if(this.minute < 0 ){
                window.clearInterval(timerGo)
                messageReservationTimer.innerHTML = "La réservation n'est plus disponnible."
            }
            else {
                messageReservationTimer.innerHTML = "La réservation expire dans " + this.minute + ' minute(s) et ' + this.seconde + ' seconde(s).'
            }
        }, 1000)
    }
}

export default Timer