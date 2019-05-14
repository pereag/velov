/**On crée un object slideshow */
class slideshow {
    
    constructor(){
        this.id = document.getElementById('info-slideshow')
        this.leftButton = document.getElementById('slideshow-leftButton')
        this.rightButton = document.getElementById('slideshow-rightButton')
        this.stopButton = document.getElementById('slideshow-pausePlayButton')
        this.stopButtonPlay = document.getElementById('play')
        this.stopButtonPause = document.getElementById('pause')
        this.time = 5000
        this.image = 1

        this.auto = window.setInterval(() => {
            if(this.manualPlay){
            }
            if(this.image < 4 ) {
                this.image = this.image + 1
                this.changeImage()
            }
            else if (this.image == 4){
                this.image = 1
                this.changeImage()
            }
        }, this.time)
    }

    changeImage() {
        this.id.style.background = 'url(images/image-'+ this.image + '.jpg)'
    }

    Play() {
           this.auto
    }

    stop() {
        clearInterval(this.auto)
        this.auto = null
    }

    restart() {
        this.auto = this.auto = window.setInterval(() => {
            if(this.manualPlay){
            }
            if(this.image < 4 ) {
                this.image = this.image + 1
                this.changeImage()
            }
            else if (this.image = 4){
                this.image = 1
                this.changeImage()
            }
        }, this.time) 
    }

    manualPlay(button){
         button.addEventListener('click', () => {
            if(button ==  this.leftButton){
                if(this.image  > 1)
                {
                    this.stop()
                    this.image = this.image - 1
                    this.changeImage()
                    this.restart()
                }
            }
            else if(button == this.rightButton){
                if(this.image < 4){
                    this.stop()
                    this.image = this.image + 1
                    this.changeImage()
                    this.restart()
                }
            }
            else if(button == this.stopButton){
                if(this.auto != null){
                    console.log('pause')
                    this.stop()
                    this.stopButtonPause.classList.replace('pausePlay_active', 'pausePlay_desactive')
                    this.stopButtonPlay.classList.replace('pausePlay_desactive', 'pausePlay_active')
                }
                else {
                    console.log('restart')
                    this.restart()
                    this.stopButtonPause.classList.replace('pausePlay_desactive', 'pausePlay_active')
                    this.stopButtonPlay.classList.replace('pausePlay_active', 'pausePlay_desactive')
                }
            }
        })
    }
}

slideshow = new slideshow
slideshow.manualPlay(slideshow.leftButton)
slideshow.manualPlay(slideshow.rightButton)
slideshow.manualPlay(slideshow.stopButton)