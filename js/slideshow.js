/**On crée un object slideshow */
class slideshow {
    
    constructor(id, leftButton, rightButton, stopButton, stopButtonPlay, stopButtonPause){
        this.id = id
        this.leftButton = leftButton
        this.rightButton = rightButton
        this.stopButton = stopButton
        this.stopButtonPlay = stopButtonPlay
        this.stopButtonPause = stopButtonPause
        this.time = 5000
        this.image = 1
        this.autoPlay = window.setInterval(() => {
            if(this.manualPlay){
            }
            if(this.image < 4 ) {
                this.next()
            }
            else if (this.image == 4){
                this.goFirstImage()
            }
        }, this.time)
    }
    

    init(){
        this.manualPlay(this.leftButton)
        this.manualPlay(this.rightButton)
        this.manualPlay(this.stopButton)
    }

    changeImage() {
        this.id.style.background = 'url(images/image-'+ this.image + '.jpg)'
    }

    previous(){
        this.image = this.image - 1
        this.changeImage()
    }

    next() {
        this.image = this.image + 1
        this.changeImage()
    }

    stop() {
        clearInterval(this.autoPlay)
        this.autoPlay = null
    }
    goFirstImage(){
        this.image = 1
        this.changeImage()
    }

    restart() {
        this.autoPlay = window.setInterval(() => {
            if(this.manualPlay){
            }
            if(this.image < 4 ) {
                this.next()
            }
            else{
                this.goFirstImage()
            }
        }, this.time) 
    }

    manualPlay(button){
         button.addEventListener('click', () => {
            if(button ==  this.leftButton ){
                if(this.image  > 1){
                    if(this.autoPlay !== null){
                        this.stop()
                        this.image = this.image - 1
                        this.changeImage()
                        this.restart()
                    }
                    else{
                        this.previous()
                    }
                }
            }
            else if(button == this.rightButton){
                if(this.image < 4){
                    if(this.autoPlay !== null){
                        this.stop()
                        this.next()
                        this.restart()
                    }
                    else{
                        this.next()
                    }
                }
            }
            else if(button == this.stopButton){
                if(this.autoPlay !== null){
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

slideshow = new slideshow(document.getElementById('info-slideshow'),  document.getElementById('slideshow-leftButton'), document.getElementById('slideshow-rightButton'), document.getElementById('slideshow-pausePlayButton'), document.getElementById('play'), document.getElementById('pause') )
slideshow.init()