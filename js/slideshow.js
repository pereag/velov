// On crée un object slideshow
class Slideshow {
    constructor(id, leftButton, rightButton, stopButton, stopButtonPlay, stopButtonPause, valueButtonActive, valueButtonDesactive, time){
        this.id = id
        this.leftButton = leftButton
        this.rightButton = rightButton
        this.stopButton = stopButton
        this.stopButtonPlay = stopButtonPlay
        this.stopButtonPause = stopButtonPause
        this.valueButtonActive = valueButtonActive
        this.valueButtonDesactive = valueButtonDesactive
        this.arrowLeft = false
        this.arrowRight = false
        this.time = time
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

// Initialise les bouttons du diaporama
    init(){
        this.manualPlay(this.leftButton)
        this.manualPlay(this.rightButton)
        this.manualPlay(this.stopButton)
    }

// Change le background du diaporama 
    changeImage() {
        this.id.style.background = 'url(images/image-'+ this.image + '.jpg)'
    }

// Affiche l'image précedente 
    previous(){
        this.image = this.image - 1
        this.changeImage()
    }

// Affiche l'image suivante 
    next() {
        this.image = this.image + 1
        this.changeImage()
    }
    
// Arrete le diaporama 
    stop() {
        clearInterval(this.autoPlay)
        this.autoPlay = null
    }

// Affiche le premier
    goFirstImage(){
        this.image = 1
        this.changeImage()
    }

// Redémarre le diaporama 
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

// Affiche le bouton de lecture
    displayStopButton(){
        this.id.addEventListener("mouseover", () =>{
            document.getElementById("slideshow-pausePlayButton").classList.replace("mouseOut", "mouseOn")
        })
        this.id.addEventListener("mouseout", () => {
            document.getElementById("slideshow-pausePlayButton").classList.replace("mouseOn", "mouseOut")
        })
    }

// Vérifie et applique l'action correspondant aux commandes du clavier et du diaporama
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
                    this.stop()
                    this.stopButtonPause.classList.replace(this.valueButtonActive, this.valueButtonDesactive)
                    this.stopButtonPlay.classList.replace(this.valueButtonDesactive, this.valueButtonActive)
                }
                else {
                    this.restart()
                    this.stopButtonPause.classList.replace(this.valueButtonDesactive, this.valueButtonActive)
                    this.stopButtonPlay.classList.replace(this.valueButtonActive, this.valueButtonDesactive)
                }
            }
        })
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 37 && this.arrowLeft == false){
                this.arrowLeft = true
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
            else if(e.keyCode === 39 && this.arrowRight == false){
                this.arrowRight = true
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
            document.addEventListener('keyup',(e)=>{
                if(e.keyCode === 37 || e.keyCode === 39){
                    this.arrowLeft = false
                    this.arrowRight = false
                }
            })
        })
    }
}

export default Slideshow
