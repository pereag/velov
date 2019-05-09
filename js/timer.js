class timer {

    constructor(minute, seconde){
        this.minute = minute
        this.seconde = seconde
    }

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

time = new timer(20, 0)

time.startTimer()