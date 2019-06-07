class Timer {

    constructor(minute, seconde){
        this.minute = minute
        this.seconde = seconde
    }
// Lance le décompte du minuteur
    startTimer(){
        let timerGo = setInterval(()=>{
            this.seconde = this.seconde - 1
            if(this.seconde == -1){
                this.seconde = 59
                this.minute = this.minute -1
            }

            if(this.minute < 0 ){
                console.log('Temps de réservation dépassé')
                window.clearInterval(timerGo)
            }
            else {
                console.log(this.minute + ' minute(s) ' + this.seconde + 'seconde(s)')
            }
        }, 1000)
    }
}