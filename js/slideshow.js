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
        this.mobileVersion
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
    };

// Initialise les bouttons du diaporama
    init(){
        this.manualPlay(this.leftButton);
        this.manualPlay(this.rightButton);
        this.manualPlay(this.stopButton);
    };
// Change le background du diaporama à chaque changement de diapo
    changeImage() {
        if(this.mobileVersion == false) {
            this.id.style.background = 'url(images/image-'+ this.image + '.jpg) no-repeat center center';
            this.id.style.backgroundSize = '100%';
        }
        else if(this.mobileVersion == true) {
            this.id.style.background = 'url(images/image-'+ this.image + '-mobile.jpg) no-repeat center center';
            this.id.style.backgroundSize = '100%';
        };
    };
// Affiche l'image précedente 
    previous(){
        this.image = this.image - 1;
        this.changeImage();
    };

// Affiche l'image suivante 
    next() {
        this.image = this.image + 1;
        this.changeImage();
    };
    
// Arrete le diaporama 
    stop() {
        clearInterval(this.autoPlay);
        this.autoPlay = null;
    };

// Redémarre le diaporama 
    restart() {
        this.autoPlay = window.setInterval(() => {
            if(this.manualPlay){
            };
            if(this.image < 4 ) {
                this.next();
            }
            else{
                this.goFirstImage();
            };
        }, this.time);
    };

// Affiche le premier diapo
    goFirstImage(){
        this.image = 1;
        this.changeImage();
    };

// Affiche le bouton de lecture
    displayStopButton(){
        this.stopButton.addEventListener("mouseover", () =>{
            document.getElementById("slideshow-pausePlayButton").classList.replace("mouseOut", "mouseOn");
        });
        this.stopButton.addEventListener("mouseout", () => {
            document.getElementById("slideshow-pausePlayButton").classList.replace("mouseOn", "mouseOut");
        });
    };

// Change la taille de la hauteur en temps réel du diaporama
    listenWidthEvent() {
        window.setInterval(() => {
            if(window.innerWidth > 900) {
                this.mobileVersion = false;
                this.id.style.height =  this.id.offsetWidth * 0.33 + "px";
                this.stopButton.style.height = this.stopButton.offsetWidth * 0.65 + "px";

            }
            else {
                this.mobileVersion = true;
                this.id.style.height = this.id.offsetWidth * 0.78 + "px";
                this.stopButton.style.height = this.stopButton.offsetWidth * 0.8 + "px";
            };
            this.changeImage();
        }, 100);
    };

// Vérifie un bouton ou une touche du clavier et applique l'action correspondant
    manualPlay(button){
        this.listenWidthEvent();
         button.addEventListener('click', () => {
            if(button ==  this.leftButton ){
                if(this.image  > 1){
                    if(this.autoPlay !== null){
                        this.stop();
                        this.image = this.image - 1
                        this.changeImage();
                        this.restart();
                    }
                    else{
                        this.previous();
                    };
                };
            }
            else if(button == this.rightButton){
                if(this.image < 4){
                    if(this.autoPlay !== null){
                        this.stop();
                        this.next();
                        this.restart();
                    }
                    else{
                        this.next();
                    };
                };
            }
            else if(button == this.stopButton){
                if(this.autoPlay !== null){
                    this.stop();
                    this.stopButtonPause.classList.replace(this.valueButtonActive, this.valueButtonDesactive);
                    this.stopButtonPlay.classList.replace(this.valueButtonDesactive, this.valueButtonActive);
                }
                else {
                    this.restart();
                    this.stopButtonPause.classList.replace(this.valueButtonDesactive, this.valueButtonActive);
                    this.stopButtonPlay.classList.replace(this.valueButtonActive, this.valueButtonDesactive);
                };
            }
        });
        document.addEventListener('keydown', (e)=>{
            if(e.keyCode === 37 && this.arrowLeft == false){
                this.arrowLeft = true;
                if(this.image  > 1){
                    if(this.autoPlay !== null){
                        this.stop();
                        this.image = this.image - 1
                        this.changeImage();
                        this.restart();
                    }
                    else{
                        this.previous();
                    };
                };
            }
            else if(e.keyCode === 39 && this.arrowRight == false){
                this.arrowRight = true;
                if(this.image < 4){
                    if(this.autoPlay !== null){
                        this.stop();
                        this.next();
                        this.restart();
                    }
                    else{
                        this.next();
                    };
                };
            };
            document.addEventListener('keyup',(e)=>{
                if(e.keyCode === 37 || e.keyCode === 39){
                    this.arrowLeft = false;
                    this.arrowRight = false;
                };
            });
        });
    };
};

export default Slideshow;
